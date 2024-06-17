import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  // Get the Clerk Webhook Secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  // Ensure the webhook secret is set
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers from the incoming request to verify access permissions
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If any required headers are missing, return an error response
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  // Parse the request body to get the payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    // Log the error and return an error response if verification fails
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', { status: 400 });
  }

  // Get the event type from the verified event
  const eventType = evt.type;

  // Handle user creation event
  if (eventType === "user.created") {
    // Insert a new user into the database
    await db.insert(users).values({ 
      username: payload.data.username,
      imageUrl: payload.data.image_url,
      externalUserId: payload.data.id, 
    });

    // Return a success response
    return new Response('User created successfully', { status: 200 });
  }

  // Handle user update event
  if (eventType === "user.updated") {
    // Find the current user in the database by externalUserId
    const currentUser = await db
      .select()
      .from(users)
      .where(eq(users.externalUserId, payload.data.id))
      .then(results => results[0]); // Get the first result (if any)

    // If the user is not found, return a 404 response
    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }

    // Update the user data in the database
    await db.update(users).set({
      username: payload.data.username,
      imageUrl: payload.data.image_url, 
    }).where(eq(users.externalUserId, payload.data.id));

    // Return a success response
    return new Response('User updated successfully', { status: 200 });
  }

  // Handle user deletion event
  if (eventType === "user.deleted") {
    // Delete the user from the database by externalUserId
    await db.delete(users).where(eq(users.externalUserId, payload.data.id));

    // Return a success response
    return new Response('User deleted successfully', { status: 200 });
  }

  // If the event type is unhandled, return an error response
  return new Response('Unhandled event type', { status: 400 });
}
