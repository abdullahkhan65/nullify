import Stripe from "stripe";

let _stripe: Stripe | null = null;

/** Lazy so the module can be imported (e.g. during build) without env vars set. */
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export const TRIAL_DAYS = 14;
