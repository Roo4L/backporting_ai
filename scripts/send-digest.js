#!/usr/bin/env node

/**
 * Send Digest Script
 * 
 * Usage: node scripts/send-digest.js <digest-slug>
 * Example: node scripts/send-digest.js weekly-001
 * 
 * This script:
 * 1. Reads the specified digest from markdown files
 * 2. Formats it as a markdown email
 * 3. Sends it to all subscribers via Buttondown API
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { loadDigests } from '../src/data/load-digests.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
function loadEnv() {
  try {
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  } catch (error) {
    console.error('Error loading .env file:', error.message);
  }
}

loadEnv();

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

if (!BUTTONDOWN_API_KEY) {
  console.error('❌ Error: BUTTONDOWN_API_KEY not found in environment variables.');
  console.error('Please add it to your .env file.');
  process.exit(1);
}

// Get digest slug from command line arguments
const digestSlug = process.argv[2];

if (!digestSlug) {
  console.error('❌ Error: Please provide a digest slug.');
  console.error('Usage: node scripts/send-digest.js <digest-slug>');
  console.error('Example: node scripts/send-digest.js weekly-001');
  process.exit(1);
}

// Load digests data
let digests;
let digest;

try {
  digests = await loadDigests();
  digest = digests.find(d => d.slug === digestSlug);
  
  if (!digest) {
    console.error(`❌ Error: Digest with slug "${digestSlug}" not found.`);
    console.error('Available digests:');
    digests.forEach(d => console.error(`  - ${d.slug}: ${d.title}`));
    process.exit(1);
  }
  
  console.log(`\n📧 Preparing to send digest: ${digest.title}\n`);
} catch (error) {
  console.error('❌ Error loading digests:', error.message);
  process.exit(1);
}

// Format digest as markdown email
function formatDigestEmail(digest) {
  let markdown = `# ${digest.title}\n\n`;
  markdown += `**Date:** ${digest.date} | **Issue #${digest.number}**\n\n`;
  markdown += `---\n\n`;
  
  if (digest.summary) {
    markdown += `${digest.summary}\n\n`;
  }
  
  if (digest.content) {
    markdown += `${digest.content}\n\n`;
  }
  
  if (digest.entries && digest.entries.length > 0) {
    markdown += `## Featured in this digest\n\n`;
    
    digest.entries.forEach((entry, index) => {
      markdown += `### ${index + 1}. ${entry.title}\n\n`;
      
      if (entry.summary) {
        markdown += `${entry.summary}\n\n`;
      }
      
      if (entry.url) {
        markdown += `🔗 [Read more](${entry.url})\n\n`;
      }
      
      if (entry.tags && entry.tags.length > 0) {
        markdown += `*Tags: ${entry.tags.join(', ')}*\n\n`;
      }
      
      markdown += `---\n\n`;
    });
  }
  
  markdown += `\n---\n\n`;
  markdown += `You're receiving this because you subscribed to Backporting.ai digests.\n\n`;
  markdown += `Visit [backporting.ai](https://backporting.ai) for more updates.\n`;
  
  return markdown;
}

const emailBody = formatDigestEmail(digest);

// Send email via Buttondown API
async function sendEmail() {
  try {
    console.log('Sending email to subscribers via Buttondown...\n');
    
    const response = await fetch('https://api.buttondown.email/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: digest.title,
        body: emailBody,
        email_type: 'public',
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Buttondown API error:', response.status);
      console.error('Error details:', JSON.stringify(errorData, null, 2));
      process.exit(1);
    }
    
    const result = await response.json();
    
    console.log('✅ Email sent successfully!');
    console.log('\nEmail details:');
    console.log(`  Subject: ${digest.title}`);
    console.log(`  Status: ${result.status || 'sent'}`);
    console.log(`  Created: ${result.creation_date || 'N/A'}`);
    
    if (result.id) {
      console.log(`  Email ID: ${result.id}`);
    }
    
    console.log('\n📊 Check your Buttondown dashboard for delivery stats.');
    console.log('   https://buttondown.email/emails\n');
    
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    process.exit(1);
  }
}

// Preview mode (optional)
if (process.argv.includes('--preview')) {
  console.log('📄 Email Preview:\n');
  console.log('='.repeat(80));
  console.log(emailBody);
  console.log('='.repeat(80));
  console.log('\n✅ Preview complete. Remove --preview flag to send.\n');
  process.exit(0);
}

// Send the email
await sendEmail();







