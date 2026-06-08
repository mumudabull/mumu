import { Link } from "wouter";
import React from "react";
import { SOCIAL_LINKS } from "@/components/Navbar";

function FooterSection() {
  return (
    <footer className="w-full bg-[#111111] relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 md:px-0 pt-20 pb-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 relative z-10">
        <div className="md:col-span-4 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/logo.svg"
              width={162}
              height={57}
              alt="Mumu Logo"
              style={{ height: "auto" }}
            />
          </div>
          <p className="text-white/60 font-sf-pro-display text-sm md:text-base max-w-[300px] mb-8 leading-relaxed">
            Mumu is a backed by number goes up technology and OG Solana
            developers.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.disabled ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={social.name}
                onClick={
                  social.disabled ? (e) => e.preventDefault() : undefined
                }
                aria-disabled={social.disabled || undefined}
                className={`w-9 h-9 rounded-full bg-black flex items-center justify-center transition-transform ${
                  social.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110 hover:-rotate-6"
                }`}
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  width={18}
                  height={18}
                  className={
                    "keepColor" in social && social.keepColor
                      ? ""
                      : "brightness-0 invert"
                  }
                />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-6">
          <h4 className="text-white font-nerko text-xl mb-6 uppercase">
            Sitemap
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="#lore" className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors">
                Lore
              </a>
            </li>
            <li>
              <a href="#community" className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors">
                Community
              </a>
            </li>
            <li>
              <a href="#how-to-buy" className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors">
                How to Buy
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors">
                Gallery
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white font-nerko text-xl mb-6 uppercase">
            Legal
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/privacy"
                className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 md:text-right flex flex-col md:items-end justify-start">
          <div className="flex items-center gap-2 mb-4 md:justify-end">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Email icon</title>
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="white" />
            </svg>
            <a
              href="mailto:hello@mumu.ing"
              className="text-white font-sf-pro-display text-sm md:text-base hover:underline"
            >
              hello@mumu.ing
            </a>
          </div>
          <p className="text-white/60 font-sf-pro-display text-sm">
            © 2026 Mumu The Bull
          </p>
        </div>
      </div>

      <div className="w-full relative h-[400px] md:h-[600px] mt-[-100px] md:mt-[-150px] pointer-events-none">
        <img
          src="/images/footer.png"
          className="absolute inset-0 w-full h-full object-cover object-top"
          alt="Mumu on the moon"
        />
      </div>
    </footer>
  );
}

export default FooterSection;
