import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line py-22 pb-18">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,15,34,0.55) 0%, rgba(20,15,34,0.88) 55%, var(--ink-black) 100%)",
          }}
        />
      </div>
      <div
        className="absolute -inset-[20%] -z-10 blur-[60px] pointer-events-none"
        style={{
          background:
            "radial-gradient(38% 45% at 78% 15%, rgba(255,107,53,0.30), transparent 70%), radial-gradient(40% 45% at 10% 75%, rgba(47,216,201,0.22), transparent 70%), radial-gradient(35% 40% at 60% 95%, rgba(183,92,255,0.24), transparent 70%)",
        }}
      />

      <div className="max-w-[1180px] mx-auto px-6 grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <span className="block mono text-[13px] text-flame mb-4.5">
            MILFORD, MA / ENGINEERED &amp; BUILT IN-HOUSE
          </span>
          <h1 className="text-[38px] md:text-[68px] leading-[0.98]">
            We build the machine.
            <br />
            Ink runs <span className="text-flame">the show.</span>
          </h1>
          <p className="text-steel text-[17px] leading-relaxed mt-5.5 max-w-[48ch]">
            VTS is the engineering shop behind the INKd 360 — the motorized rotary tattoo ink
            display and mixer that&rsquo;s known worldwide as the true originator of the ink
            wheel. We also build the accessories artists actually reach for: magnetic pool chalk
            holders, quick-swap machine clips, and aftercare that lives on your keychain.
          </p>
          <div className="flex gap-3.5 mt-8.5 flex-wrap">
            <a
              href="#wheel"
              className="font-mono text-[13px] uppercase tracking-wide px-6.5 py-3.5 rounded-sm bg-gradient-to-r from-flame to-violet text-ink-black font-bold no-underline inline-block hover:-translate-y-0.5 transition-transform"
            >
              Shop the INKd 360 — from $549.99
            </a>
            <a
              href="#clips"
              className="font-mono text-[13px] uppercase tracking-wide px-6.5 py-3.5 rounded-sm border border-line text-paper bg-[rgba(20,15,34,0.4)] no-underline inline-block hover:border-blue transition-colors"
            >
              Shop Quick Clips — $20
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center relative order-first md:order-last mb-3 md:mb-0">
          <div className="relative w-full max-w-[200px] md:max-w-[340px] aspect-square rounded-full shadow-[0_0_0_1px_var(--line),0_30px_80px_rgba(0,0,0,0.5)] animate-spin-slow overflow-hidden">
            <Image
              src="/images/vts-logo.jpg"
              alt="INKd 360 logo, motorized rotary tattoo ink display and mixer, by VTS"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
