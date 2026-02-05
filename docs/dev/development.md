# Development Guide

This guide is for developers who want to contribute to the Backporting.ai website.

## Prerequisites

- Node.js >= 18.14
- npm

## Install & run locally

```bash
npm install
npm run dev
```

This starts the dev server at the URL printed in the terminal (typically http://localhost:4321).

## Build & preview

```bash
npm run build
npm run preview
```

## Project structure

- `src/pages/` – site pages (`/`, `/articles`, `/digests`)
- `src/pages/api/` – API endpoints (subscription handler)
- `src/components/` – reusable components (newsletter signup form)
- `src/layouts/` – base layout and shared styles
- `src/content/digests/` – Digest markdown files with frontmatter
- `src/data/` – Data utilities and resources
- `scripts/` – utility scripts (send digest emails)
- `public/` – static assets (e.g., `favicon.svg`)
- `astro.config.mjs` – Astro configuration
- `tailwind.config.mjs` / `postcss.config.cjs` – Tailwind setup

## VS Code debug

A launch configuration is provided under `.vscode/launch.json` to run the Astro dev server.

## Mailing List Setup

The site includes a newsletter subscription feature powered by [Buttondown](https://buttondown.email), allowing users to subscribe to digest updates.

### Prerequisites

1. Sign up for a Buttondown account at https://buttondown.email
2. Get your API key from https://buttondown.email/settings

### Configuration

1. Create a `.env` file in the project root:

```bash
BUTTONDOWN_API_KEY=your_api_key_here
```

2. Configure your Buttondown settings:
   - Set your newsletter name and description
   - Configure your sender email (can use your Hostinger email as reply-to address)
   - Customize the confirmation email template

### How It Works

**Subscription Flow:**
- Users enter their email on the homepage or digests page
- The form submits to `/api/subscribe` endpoint
- The API validates and adds the subscriber via Buttondown
- Buttondown sends a confirmation email to the subscriber
- Users must confirm their subscription by clicking the link

**Subscriber Management:**
- View all subscribers in your Buttondown dashboard
- Export subscriber lists
- Manage unsubscribes automatically
- Track engagement metrics

### Sending Digest Emails

To send a digest to all subscribers:

```bash
node scripts/send-digest.js <digest-slug>
```

**Example:**

```bash
# Preview the email before sending
node scripts/send-digest.js weekly-001 --preview

# Send the email
node scripts/send-digest.js weekly-001
```

The script will:
1. Load the digest from `src/content/digests/` by slug
2. Format it as a markdown email with proper structure
3. Send it to all confirmed subscribers via Buttondown API
4. Display confirmation and provide a link to track delivery

**Email Format:**
- Subject: Digest title
- Body: Formatted markdown with digest content and entries
- Each entry includes title, summary, link, and tags
- Footer with unsubscribe link (added automatically by Buttondown)

### Buttondown Dashboard

Access your dashboard at https://buttondown.email to:
- View subscriber count and growth
- Check email delivery stats (opens, clicks)
- Manage subscribers manually if needed
- View sent email archive
- Configure email templates and settings

### Hostinger Email Integration

Your Hostinger email can be configured in Buttondown's settings as:
- **Reply-to address**: Subscribers' replies go to your domain email
- **Sender name**: Display name for your emails
- **Custom domain**: Advanced users can set up DKIM/SPF for better deliverability

Note: Buttondown handles all email sending infrastructure, so you don't need to configure SMTP settings.

### Testing

1. Subscribe with a test email address
2. Confirm the subscription via email
3. Run the send script with the `--preview` flag to see formatted output
4. Send a test digest to verify email delivery
5. Check spam folder if emails don't arrive

### Troubleshooting

**"Newsletter service not configured" error:**
- Ensure `BUTTONDOWN_API_KEY` is set in `.env`
- Restart the dev server after adding environment variables

**Subscription fails:**
- Check that API key is valid in Buttondown settings
- Verify email format is correct
- Check browser console for detailed error messages

**Emails not sending:**
- Verify digest markdown file exists in `src/content/digests/`
- Check Buttondown dashboard for account status
- Ensure you're on a plan that allows sending emails

## Technology Stack

For detailed information about the technology choices and architecture, see [TECHNOLOGY.md](../../TECHNOLOGY.md).

## Design Goals

For information about the website's goals and roadmap, see [DESIGN.md](../../DESIGN.md).

## Next steps

- Add search (Pagefind) and Giscus for comments on digests
- Add submission flow via GitHub Issues or a simple form
