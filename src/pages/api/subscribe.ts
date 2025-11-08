import type { APIRoute } from 'astro';

// Mark this endpoint as server-rendered (not static)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get Buttondown API key from environment
    // In Astro, server-side env vars are accessed via import.meta.env
    const apiKey = import.meta.env.BUTTONDOWN_API_KEY;
    
    // Debug logging (remove in production)
    console.log('API Key present:', !!apiKey);
    console.log('API Key length:', apiKey?.length || 0);
    
    if (!apiKey) {
      console.error('BUTTONDOWN_API_KEY not configured in environment');
      console.error('Available env keys:', Object.keys(import.meta.env));
      return new Response(
        JSON.stringify({ error: 'Newsletter service not configured. Please contact the administrator.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Subscribe via Buttondown API
    console.log('Making request to Buttondown API...');
    const buttondownResponse = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email.toLowerCase().trim(),
        tags: ['website-signup'],
      }),
    });

    console.log('Buttondown response status:', buttondownResponse.status);
    console.log('Buttondown response headers:', Object.fromEntries(buttondownResponse.headers.entries()));

    // Try to get response text first
    const responseText = await buttondownResponse.text();
    console.log('Buttondown response body (raw):', responseText);

    if (!buttondownResponse.ok) {
      let errorData: any = {};
      
      // Try to parse as JSON if there's content
      if (responseText) {
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          console.error('Failed to parse Buttondown error response as JSON:', e);
          errorData = { raw: responseText };
        }
      }
      
      console.error('Buttondown API error response:', errorData);
      
      // Handle specific error cases
      if (buttondownResponse.status === 400 && errorData.email) {
        // Email already exists or similar validation error
        return new Response(
          JSON.stringify({ error: errorData.email[0] || 'This email is already subscribed or invalid.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Check for authentication errors
      if (buttondownResponse.status === 401) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid API key. Please check your Buttondown API configuration.',
            details: errorData 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      console.error('Buttondown API error:', buttondownResponse.status, errorData);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to subscribe. Please try again later.',
          status: buttondownResponse.status,
          details: errorData 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse successful response
    let successData: any = {};
    if (responseText) {
      try {
        successData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse success response:', e);
      }
    }

    console.log('Successfully subscribed to Buttondown');

    return new Response(
      JSON.stringify({ 
        message: 'Successfully subscribed! Please check your email to confirm your subscription.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again.',
        message: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};







