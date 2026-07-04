import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

const createdAt = () => timestamp("created_at").defaultNow().notNull();
const updatedAt = () =>
  timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull();

/** Weekly schedule: { mon: [["08:00", "17:00"]], ... } — outside these windows
 * every call is treated as missed even if forwarding didn't trigger. */
export type BusinessHours = Partial<
  Record<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun", [string, string][]>
>;

export const businesses = pgTable("businesses", {
  id: id(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  vertical: text("vertical"),
  timezone: text("timezone").notNull().default("America/New_York"),
  greetingText: text("greeting_text")
    .notNull()
    .default(
      "Thanks for calling! We're helping another customer right now. Please leave a message after the tone — we're also texting you right now so you can reach us faster.",
    ),
  textbackTemplate: text("textback_template")
    .notNull()
    .default(
      "Hi, this is {{business_name}} — sorry we missed your call! We're with a customer. Reply here and we'll get right back to you.",
    ),
  followUpTemplate: text("follow_up_template")
    .notNull()
    .default(
      "Hi again from {{business_name}} — still happy to help if you need us. Just reply here.",
    ),
  followUpDelayHours: integer("follow_up_delay_hours").notNull().default(3),
  bookingLink: text("booking_link"),
  // Used for the estimated-recovered-revenue metric.
  avgTicketCents: integer("avg_ticket_cents").notNull().default(25_000),
  closeRatePct: integer("close_rate_pct").notNull().default(30),
  businessHours: jsonb("business_hours").$type<BusinessHours>(),
  ownerNotifyPhone: text("owner_notify_phone"),
  notifyByEmail: boolean("notify_by_email").notNull().default(true),
  notifyBySms: boolean("notify_by_sms").notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const phoneNumbers = pgTable(
  "phone_numbers",
  {
    id: id(),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    e164: text("e164").notNull().unique(),
    twilioNumberSid: text("twilio_number_sid").notNull(),
    twilioSubaccountSid: text("twilio_subaccount_sid").notNull(),
    status: text("status").$type<"active" | "released">().notNull().default("active"),
    createdAt: createdAt(),
  },
  (t) => [index("phone_numbers_business_idx").on(t.businessId)],
);

export const complianceRegistrations = pgTable("compliance_registrations", {
  id: id(),
  businessId: text("business_id")
    .notNull()
    .unique()
    .references(() => businesses.id, { onDelete: "cascade" }),
  customerProfileSid: text("customer_profile_sid"),
  brandSid: text("brand_sid"),
  campaignSid: text("campaign_sid"),
  messagingServiceSid: text("messaging_service_sid"),
  brandType: text("brand_type").$type<"sole_prop" | "low_volume" | "standard">(),
  status: text("status")
    .$type<"not_started" | "in_progress" | "pending_review" | "approved" | "rejected">()
    .notNull()
    .default("not_started"),
  failureReason: text("failure_reason"),
  submittedAt: timestamp("submitted_at"),
  approvedAt: timestamp("approved_at"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const calls = pgTable(
  "calls",
  {
    id: id(),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    twilioCallSid: text("twilio_call_sid").notNull().unique(),
    callerE164: text("caller_e164").notNull(),
    outcome: text("outcome").$type<"missed" | "voicemail">().notNull().default("missed"),
    recordingUrl: text("recording_url"),
    voicemailDurationSec: integer("voicemail_duration_sec"),
    textbackSent: boolean("textback_sent").notNull().default(false),
    occurredAt: timestamp("occurred_at").defaultNow().notNull(),
  },
  (t) => [index("calls_business_occurred_idx").on(t.businessId, t.occurredAt)],
);

export const conversations = pgTable(
  "conversations",
  {
    id: id(),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    callerE164: text("caller_e164").notNull(),
    status: text("status").$type<"open" | "closed">().notNull().default("open"),
    lastMessageAt: timestamp("last_message_at"),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("conversations_business_caller_idx").on(t.businessId, t.callerE164),
  ],
);

export const messages = pgTable(
  "messages",
  {
    id: id(),
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    direction: text("direction").$type<"inbound" | "outbound">().notNull(),
    /** Outbound only: what produced this message. Inbound messages have kind = null. */
    kind: text("kind").$type<"textback" | "followup" | "manual">(),
    body: text("body").notNull(),
    twilioMessageSid: text("twilio_message_sid"),
    deliveryStatus: text("delivery_status").$type<
      "queued" | "sent" | "delivered" | "failed"
    >(),
    createdAt: createdAt(),
  },
  (t) => [index("messages_conversation_idx").on(t.conversationId, t.createdAt)],
);

export const followUpJobs = pgTable(
  "follow_up_jobs",
  {
    id: id(),
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    scheduledFor: timestamp("scheduled_for").notNull(),
    status: text("status")
      .$type<"scheduled" | "sent" | "canceled">()
      .notNull()
      .default("scheduled"),
    createdAt: createdAt(),
  },
  (t) => [index("follow_up_jobs_due_idx").on(t.status, t.scheduledFor)],
);

export const subscriptions = pgTable("subscriptions", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  // Mirrors Stripe's subscription status values.
  status: text("status").notNull().default("incomplete"),
  priceId: text("price_id"),
  currentPeriodEnd: timestamp("current_period_end"),
  trialEndsAt: timestamp("trial_ends_at"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
