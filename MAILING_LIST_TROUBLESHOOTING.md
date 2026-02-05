# Mailing List Troubleshooting Guide

## Overview

This guide covers common issues with the Buttondown-powered mailing list. The subscription form submits directly to Buttondown's embed endpoint; the `.env` API key is only used by the `send-digest.js` script.

## Verification Steps

### 1. Check Your Buttondown API Key

Visit https://buttondown.email/settings and verify:
- You have an active Buttondown account
- You can see your API key
- Copy the API key (it should look like a long string of random characters)

### 2. Verify `.env` File

Your `.env` file should be in the project root and contain:

```bash
BUTTONDOWN_API_KEY=your_actual_api_key_here
```

**Important checks:**
- No spaces around the `=` sign
- No quotes around the API key (unless they're part of the actual key)
- The file is named exactly `.env` (not `.env.txt` or anything else)
- The file is in the project root directory

### 3. Restart the Dev Server

After adding or modifying the `.env` file, you MUST restart the Astro dev server:

```bash
# Stop the current server (Ctrl+C)
# Then start it again:
npm run dev
```

Astro only loads environment variables when the server starts.

### 4. Test the API Key Directly

You can test if your API key works by running this command in your terminal:

```bash
curl -H "Authorization: Token YOUR_API_KEY_HERE" \
  https://api.buttondown.email/v1/subscribers
```

Replace `YOUR_API_KEY_HERE` with your actual API key.

**Expected responses:**
- **Success (200)**: Returns a JSON list of subscribers (or empty array `[]`)
- **401 Unauthorized**: Your API key is invalid
- **Other errors**: Check the Buttondown status page

## Common Issues and Solutions

### Issue: "API Key present: false"

**Solution:** The environment variable isn't being loaded.

1. Confirm `.env` exists in the project root
2. Confirm it has `BUTTONDOWN_API_KEY=...`
3. Restart the dev server
4. Check for typos in the variable name

### Issue: Status 401 (Unauthorized)

**Solution:** Your API key is invalid.

1. Log in to https://buttondown.email/settings
2. Copy your API key again (it may have changed)
3. Update `.env` with the new key
4. Restart the dev server

### Issue: Status 400 (Bad Request)

**Solution:** The request format is incorrect.

- Check the server logs for the error message
- The email format might be invalid
- Or the subscriber might already exist

### Issue: Empty response body

**Solution:** This often indicates authentication failure.

1. Verify your Buttondown account is active (not suspended/expired)
2. Check if you're on a paid plan if required for API access
3. Verify the API key has the correct permissions

## Still Not Working?

If you've tried all the above and it's still not working:

1. **Share the server logs:** Copy the console output when you try to subscribe
2. **Verify Buttondown account:** Log in to your Buttondown dashboard to ensure your account is in good standing
3. **Check Buttondown status:** Visit https://buttondown.email/status to see if there are any service issues
4. **API documentation:** Review the authentication docs at https://docs.buttondown.com/api-authentication

## Next Steps After Fixing

Once the API key issue is resolved:

1. Test the subscription form on both homepage and digests page
2. Confirm you receive the confirmation email
3. Try sending a test digest: `npm run send-digest monthly-2025-10 -- --preview`
4. Remove the debug logging from the code for production

