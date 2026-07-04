import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const customerId =
        typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      const item = sub.items.data[0];

      await db
        .update(subscriptions)
        .set({
          stripeSubscriptionId: sub.id,
          status: sub.status,
          priceId: item?.price.id ?? null,
          currentPeriodEnd: item?.current_period_end
            ? new Date(item.current_period_end * 1000)
            : null,
          trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        })
        .where(eq(subscriptions.stripeCustomerId, customerId));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
