import Image from "next/image";

export default function MakerSection() {
  return (
    <section className="py-20 border-b border-line">
      <div className="max-w-[1180px] mx-auto px-6 grid md:grid-cols-[0.7fr_1.3fr] gap-14 items-center">
        <div className="relative w-full aspect-square rounded-sm border border-line overflow-hidden">
          <Image src="/images/vts-logo.jpg" alt="INKd 360 logo" fill className="object-cover" />
        </div>
        <div>
          <span className="block mono text-[13px] text-violet mb-2.5">THE COMPANY</span>
          <h2 className="text-[26px] md:text-[40px] mb-3.5">Vachon Technical Systems, LLC</h2>
          <p className="text-paper/85 leading-[1.75] text-[15.5px] max-w-[60ch] mb-3.5">
            Based in Milford, Massachusetts, Steven J. Palumbo and Benjamin R. Vachon co-own VTS
            and partnered together to build the INKd 360 — a motorized rotary display and mixer
            that&rsquo;s changing how tattoo artists store and display their ink. Ben works the
            needle himself, so every part of this build started with a real problem in a real
            studio.
          </p>
          <p className="text-paper/85 leading-[1.75] text-[15.5px] max-w-[60ch] mb-3.5">
            Their first production run was a 35-unit pilot. It sold out, with customers picking it
            up from Hawaii to California, the Midwest, Southern Florida, and across the Northeast
            — with no complaints and nothing but strong feedback along the way.
          </p>
          <div className="font-display font-bold normal-case tracking-normal text-xl text-paper border-l-[3px] border-flame pl-4 my-5 leading-tight">
            &ldquo;Building a brand doesn&rsquo;t happen overnight. It takes a lot of hard work, a
            lot of dedication, and a ton of patience.&rdquo;
          </div>
          <p className="text-paper/85 leading-[1.75] text-[15.5px] max-w-[60ch]">
            VTS is determined to make the INKd 360 known worldwide as the true originator of
            tattoo ink wheels — and to keep building the accessories that make studio life easier
            along the way.
          </p>
        </div>
      </div>
    </section>
  );
}
