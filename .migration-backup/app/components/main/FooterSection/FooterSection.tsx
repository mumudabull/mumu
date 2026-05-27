import Image from "next/image";
import Link from "next/link";
import React from "react";

function FooterSection() {
  return (
    <footer className="w-full bg-[#111111] relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 md:px-0 pt-20 pb-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 relative z-10">
        {/* Left column: Logo, Description, Socials */}
        <div className="md:col-span-4 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/images/logo.svg"
              width={162}
              height={57}
              alt="Mumu Logo"
              style={{ height: "auto" }}
            />
          </div>
          <p className="text-white/60 font-sf-pro-display text-sm md:text-base max-w-[300px] mb-8 leading-relaxed">
            A community of anons came together to give the bull market its
            official meme. They iterated in real time, debating horns, colors,
            expressions until Mumu emerged.
          </p>
          <div className="flex items-center gap-4">
            {/*<a*/}
            {/*  href="https://discord.gg/mumuthebull"*/}
            {/*  className="hover:opacity-80 transition-opacity"*/}
            {/*  aria-label="Discord"*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    src="/icons/discord.svg"*/}
            {/*    width={24}*/}
            {/*    height={24}*/}
            {/*    alt="Discord"*/}
            {/*  />*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="https://t.me/mumuthebull"*/}
            {/*  className="hover:opacity-80 transition-opacity"*/}
            {/*  aria-label="Telegram"*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    src="/icons/telegram.svg"*/}
            {/*    width={24}*/}
            {/*    height={24}*/}
            {/*    alt="Telegram"*/}
            {/*  />*/}
            {/*</a>*/}
            <a
              href="https://x.com/mumu_bull"
              className="hover:opacity-80 transition-opacity"
              aria-label="X"
            >
              <Image src="/icons/twitter.svg" width={24} height={24} alt="X" />
            </a>
            {/*<a*/}
            {/*  href="https://tiktok.com/@mumuthebull"*/}
            {/*  className="hover:opacity-80 transition-opacity"*/}
            {/*  aria-label="TikTok"*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    src="/icons/tiktok.svg"*/}
            {/*    width={24}*/}
            {/*    height={24}*/}
            {/*    alt="TikTok"*/}
            {/*  />*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="https://instagram.com/mumuthebull"*/}
            {/*  className="hover:opacity-80 transition-opacity"*/}
            {/*  aria-label="Instagram"*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    src="/icons/instagram.svg"*/}
            {/*    width={24}*/}
            {/*    height={24}*/}
            {/*    alt="Instagram"*/}
            {/*  />*/}
            {/*</a>*/}
          </div>
        </div>

        {/* Sitemap */}
        <div className="md:col-span-2 md:col-start-6">
          <h4 className="text-white font-nerko text-xl mb-6 uppercase">
            Sitemap
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="#"
                className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors"
              >
                Lore
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors"
              >
                How to Buy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/60 font-sf-pro-display text-sm md:text-base hover:text-white transition-colors"
              >
                Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
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

        {/* Contact & Copyright */}
        <div className="md:col-span-3 md:text-right flex flex-col md:items-end justify-start">
          <div className="flex items-center gap-2 mb-4 md:justify-end">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Email icon</title>
              <path
                d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                fill="white"
              />
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

      {/* Footer Image (Moon Background) */}
      <div className="w-full relative h-[400px] md:h-[600px] mt-[-100px] md:mt-[-150px] pointer-events-none">
        <Image
          src="/images/footer.png"
          fill
          className="object-cover object-top"
          alt="Mumu on the moon"
          priority
          sizes="100vw"
        />
      </div>
    </footer>
  );
}

export default FooterSection;
