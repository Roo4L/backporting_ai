<!-- 03f0199b-7e80-43ac-9d60-cdd9594894e6 ccf8f413-abff-495e-82ec-0f690ca4d682 -->
# Mailing List Implementation Plan

## Service Choice: Buttondown

We'll use Buttondown (https://buttondown.email) because:

- Simple API and developer-friendly
- Markdown-based email composition (perfect for technical digests)
- Free tier supports up to 100 subscribers
- Easy integration with static sites
- Built-in subscriber management

## Implementation Steps

### 1. Buttondown Account Setup

- Sign up for a Buttondown account
- Get API key from settings
- Configure email sender name and reply-to address
- Note down the Buttondown email subscription form URL

### 2. Environment Configuration

- Add Buttondown API key to environment variables
- Create `.env` file with `BUTTONDOWN_API_KEY`
- Update `.gitignore` to exclude `.env`

### 3. Subscription Form Component

Create a reusable subscription form component at `src/components/NewsletterSignup.astro`:

- Email input field with validation
- Clear call-to-action copy ("Get digest updates")
- Submit button with loading state
- Success/error message display
- Integrates with Buttondown's API

### 4. API Endpoint for Subscriptions

Create Astro API endpoint at `src/pages/api/subscribe.ts`:

- Accepts POST requests with email
- Validates email format
- Calls Buttondown API to add subscriber
- Returns success/error response
- Handles rate limiting

### 5. Add Form to Pages

- Add `NewsletterSignup` component to `src/pages/index.astro` (below Website Goals section)
- Add `NewsletterSignup` component to `src/pages/digests.astro` (at the top or bottom)

### 6. Email Sending Script

Create a Node.js script `scripts/send-digest.js`:

- Takes digest slug as parameter
- Fetches digest content from `digests.json`
- Formats content as markdown email
- Sends via Buttondown API to all subscribers
- Usage: `node scripts/send-digest.js weekly-001`

### 7. Documentation

Add section to `README.md`:

- How to subscribe users
- How to send digest emails
- Environment variables needed
- Buttondown dashboard overview

## Key Files

- `src/components/NewsletterSignup.astro` - subscription form
- `src/pages/api/subscribe.ts` - subscription API endpoint  
- `scripts/send-digest.js` - email sending script
- `.env` - API key storage
- `README.md` - usage documentation

## Notes

Your Hostinger email can be configured as the "reply-to" address in Buttondown settings, so subscribers can reply to your domain email (e.g., hello@backporting.ai) even though emails are sent through Buttondown's infrastructure.

### To-dos

- [x] Create .env file and add to .gitignore
- [ ] Create NewsletterSignup.astro component with email validation
- [ ] Create API endpoint at src/pages/api/subscribe.ts
- [ ] Add NewsletterSignup to homepage (index.astro)
- [ ] Add NewsletterSignup to digests page
- [ ] Create scripts/send-digest.js for sending emails
- [ ] Document mailing list setup and usage in README.md