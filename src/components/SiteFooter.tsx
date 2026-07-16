import VtsBadge from "./VtsBadge";

export default function SiteFooter() {
  return (
    <footer id="contact" className="pt-14 pb-10 border-t border-line">
      <div className="max-w-[1180px] mx-auto px-6 flex justify-between items-start flex-wrap gap-6">
        <div>
          <a href="#top" className="flex items-center gap-4 font-display font-black text-[28px] no-underline text-paper mb-3">
            <VtsBadge size={36} />
            <span>
              VTS
              <span className="block mt-[3px] font-mono font-semibold text-xs tracking-[0.16em] text-steel uppercase">
                Vachon Technical Systems
              </span>
            </span>
          </a>
          <p className="text-steel text-[13px] max-w-[44ch] leading-relaxed">
            Custom INKd 360 builds are made to spec — reach out before ordering with questions
            about graphics, clip colors, or bottle-holder counts. Standard orders typically ship
            in 5–7 business days.
          </p>
        </div>
        <div className="mono text-[13px] text-paper leading-loose">
          <a href="mailto:INKd360@gmail.com" className="text-blue no-underline">
            INKd360@gmail.com
          </a>
          <br />
          <span className="text-steel">Custom orders &amp; custom ink wheels:</span>
          <br />
          <a href="mailto:VTSmade@gmail.com" className="text-blue no-underline">
            VTSmade@gmail.com
          </a>
          <br />
          Instagram &amp; Facebook: <a href="#" className="no-underline">@INKd360</a>
          <br />
          Milford, Massachusetts
          <br />
          Vachon Technical Systems, LLC
        </div>
      </div>
    </footer>
  );
}
