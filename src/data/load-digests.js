import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadDigests() {
  const digestsDir = join(__dirname, '../content/digests');
  const files = await readdir(digestsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const digests = [];

  for (const file of mdFiles) {
    const filePath = join(digestsDir, file);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    digests.push({
      id: data.id,
      slug: data.slug,
      number: data.number,
      title: data.title,
      date: data.date,
      summary: data.summary,
      content: content.trim(),
      entries: data.entries || [],
    });
  }

  return digests;
}

