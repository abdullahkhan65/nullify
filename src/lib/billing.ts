import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { getStripe } from "@/lib/stripe";

export async function getSubscriptionForUser(userId: string) {
  return db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
}

export function isSubscriptionUsable(status: string | undefined | null) {
  return status === "trialing" || status === "active";
}

/** Find or create the Stripe customer for a user, persisting the mapping. */
export async function getOrCreateStripeCustomer(user: {
  id: string;
  email: string;
  name: string;
}) {
  const existing = await getSubscriptionForUser(user.id);
  if (existing) return existing.stripeCustomerId;

  const customer = await getStripe().customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user.id },
  });

  await db.insert(subscriptions).values({
    userId: user.id,
    stripeCustomerId: customer.id,
  });

  return customer.id;
}
