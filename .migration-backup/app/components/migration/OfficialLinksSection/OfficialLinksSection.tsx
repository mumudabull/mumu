import { ExternalLink, Globe, Send, Twitter } from "lucide-react";
import React from "react";

const OfficialLinksSection = () => {
  const links = [
    {
      name: "Official Website",
      url: "https://mumu.so",
      icon: <Globe className="w-6 h-6" />,
      description: "Primary hub for the MUMU ecosystem.",
    },
    {
      name: "Migration Portal",
      url: "https://migrate.fun",
      icon: <ExternalLink className="w-6 h-6" />,
      description: "Official portal to claim and migrate tokens.",
    },
    {
      name: "Twitter (X)",
      url: "https://x.com/mumuthebull",
      icon: <Twitter className="w-6 h-6" />,
      description: "Get the latest updates and announcements.",
    },
    {
      name: "Telegram",
      url: "https://t.me/mumuthebull",
      icon: <Send className="w-6 h-6" />,
      description: "Join our official community chat.",
    },
  ];

  return (
    <section id="official-links" className="w-full py-20 px-4 md:px-8 bg-black-9 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-nerko mb-12 text-center uppercase">
          Official Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 hover:bg-white/10 p-8 rounded-3xl border border-white/10 transition-all duration-300"
            >
              <div className="mb-4 text-orange-500 group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                {link.name}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm opacity-60 leading-relaxed">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficialLinksSection;
