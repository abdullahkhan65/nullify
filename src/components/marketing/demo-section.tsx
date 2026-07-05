import { existsSync } from "node:fs";
import { join } from "node:path";
import { Reveal } from "@/components/marketing/reveal";
import { RescueCinematic } from "@/components/marketing/rescue-cinematic";

/**
 * Demo section: plays the code-driven motion graphic by default, and swaps to
 * a produced video if one ships at public/videos/nullify-demo.mp4. The file
 * check runs at build/render time, so adding the video means dropping the
 * file in and redeploying.
 */

const VIDEO_SRC = "/videos/nullify-demo.mp4";

export function DemoSection() {
  const hasVideo = existsSync(join(process.cwd(), "public", VIDEO_SRC));

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
          The 20-second demo
        </p>
        <h2 className="mt-2 text-center text-3xl font-black tracking-tight sm:text-4xl">
          Watch a missed call get rescued
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
          From ring-out to booked job — the whole rescue, exactly as it runs.
        </p>
      </Reveal>
      <Reveal delayMs={120}>
        <div className="mx-auto mt-10 max-w-3xl">
          {hasVideo ? (
            <div className="overflow-hidden rounded-xl border border-[#2a3038] bg-[#0c0f14] shadow-[0_0_60px_-16px_rgba(249,115,22,0.5)]">
              <video
                controls
                preload="metadata"
                playsInline
                aria-label="Nullify demo: a missed call gets an instant text back and turns into a booked job"
                className="aspect-video w-full"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <RescueCinematic />
          )}
        </div>
      </Reveal>
    </section>
  );
}
