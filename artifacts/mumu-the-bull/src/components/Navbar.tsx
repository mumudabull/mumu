import { X } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { name: "Lore", href: "#lore" },
  { name: "Community", href: "#community" },
  { name: "How to Buy", href: "#how-to-buy" },
  { name: "Gallery", href: "#gallery" },
];

const SOCIAL_LINKS = [
  {
    name: "telegram",
    icon: "/icons/telegram.svg",
    href: "#",
    disabled: true,
  },
  {
    name: "twitter",
    icon: "/icons/twitter.svg",
    href: "#",
    disabled: true,
  },
  {
    name: "pumpfun",
    icon: "/icons/pumpfun.svg",
    href: "#",
    disabled: true,
  },
  {
    name: "instagram",
    icon: "/icons/instagram.svg",
    href: "https://instagram.com/",
    disabled: false,
  },
  {
    name: "tiktok",
    icon: "/icons/tiktok.svg",
    href: "https://tiktok.com/",
    disabled: false,
  },
];

export default function Navbar({
  alwaysBlack = false,
}: {
  alwaysBlack?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || alwaysBlack
          ? "bg-black/60 backdrop-blur-md py-3"
          : "bg-linear-to-b from-black to-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Desktop Left: Social Icons */}
        <div className="hidden lg:flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.disabled ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={social.name}
              onClick={social.disabled ? (e) => e.preventDefault() : undefined}
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
                className="brightness-0 invert"
              />
            </a>
          ))}
        </div>

        {/* Desktop Center: Nav Links + Logo */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-nerko text-white text-xl hover:text-orange-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo.svg"
              alt="MUMU THE BULL"
              width={180}
              height={50}
              className="h-12 w-auto"
              style={{ height: "auto" }}
            />
          </Link>

          <div className="flex items-center gap-8">
            {NAV_LINKS.slice(2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-nerko text-white text-xl hover:text-orange-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop Right: Buy Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/migration"
            className="bg-white hover:bg-gray-100 text-black font-nerko text-xl px-8 py-2 rounded-buttons shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all active:translate-y-1 active:shadow-none hover:-rotate-3"
          >
            MIGRATE
          </Link>
          <span className="w-px bg-white/20 h-10"></span>
          <a
            href="#buy"
            className="bg-mumu-orange-6 hover:bg-mumu-orange-7 text-white font-nerko text-xl px-8 py-2 rounded-buttons shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all active:translate-y-1 active:shadow-none hover:-rotate-3"
          >
            BUY $MUMU
          </a>
        </div>

        {/* Mobile: Logo + Menu Toggle */}
        <div className="lg:hidden flex items-center justify-between w-full relative z-[70]">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="MUMU THE BULL"
              width={140}
              height={40}
              className="h-10 w-auto"
              style={{ height: "auto" }}
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? (
              <X size={32} />
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Open Menu</title>
                <path
                  d="M4 6.6665H28V9.33317H4V6.6665ZM10.6667 14.6665H28V17.3332H10.6667V14.6665ZM17.3333 22.6665H28V25.3332H17.3333V22.6665Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-mumu-orange-6 flex flex-col items-center justify-start overflow-y-auto px-8 pt-24 pb-12 text-center animate-slide-in-right">
          <div className="flex flex-col gap-6 mb-10">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-nerko text-white text-4xl hover:scale-110 hover:rotate-2 transition-transform opacity-0 animate-pop-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-10 flex-wrap justify-center">
            {SOCIAL_LINKS.map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target={social.disabled ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={social.name}
                onClick={
                  social.disabled
                    ? (e) => e.preventDefault()
                    : () => setIsMobileMenuOpen(false)
                }
                aria-disabled={social.disabled || undefined}
                className={`w-12 h-12 rounded-full bg-black flex items-center justify-center transition-transform opacity-0 animate-pop-in ${
                  social.disabled
                    ? "!opacity-50 cursor-not-allowed"
                    : "hover:scale-110 hover:-rotate-6"
                }`}
                style={{
                  animationDelay: `${0.1 + (NAV_LINKS.length + index) * 0.1}s`,
                }}
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  width={22}
                  height={22}
                  className="brightness-0 invert"
                />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Link
              href="/migration"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-white text-mumu-orange-6 font-nerko text-2xl py-4 rounded-buttons shadow-lg uppercase opacity-0 animate-pop-in hover:rotate-3 transition-all duration-300"
              style={{
                animationDelay: `${
                  0.1 + (NAV_LINKS.length + SOCIAL_LINKS.length) * 0.1
                }s`,
              }}
            >
              MIGRATE
            </Link>
            <a
              href="#buy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-white text-mumu-orange-6 font-nerko text-2xl py-4 rounded-buttons shadow-lg uppercase opacity-0 animate-pop-in hover:rotate-3 transition-all duration-300"
              style={{
                animationDelay: `${
                  0.15 + (NAV_LINKS.length + SOCIAL_LINKS.length) * 0.1
                }s`,
              }}
            >
              BUY MUMU
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
