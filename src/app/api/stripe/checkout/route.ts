import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getOrCreateStripeCustomer } from "@/lib/billing";
import { getStripe, TRIAL_DAYS } from "@/lib/stripe";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  if (!priceId) {
    return NextResponse.json({ error: "Billing not configured" }, { status: 500 });
  }

  const customerId = await getOrCreateStripeCustomer(session.user);

  const checkout = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      metadata: { userId: session.user.id },
    },
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/dashboard?checkout=canceled`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: checkout.url });
}
