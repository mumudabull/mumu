import React from "react";

const ROLES = [
  {
    title: "Partnerships Lead",
    description:
      "Drive strategic partnerships with exchanges, projects, launchpads, and crypto-native brands. You know the Solana ecosystem and know how to get deals done.",
    tags: ["Partnerships", "BD", "DeFi"],
    icon: "🤝",
  },
  {
    title: "TikTok / IG Social Lead",
    description:
      "Own Mumu's short-form video presence. Create and post content that converts — memes, market commentary, community highlights. You live on TikTok and Instagram.",
    tags: ["TikTok", "Instagram", "Content"],
    icon: "📱",
  },
];

function HiringSection() {
  return (
    <section
      className="py-20 md:py-32 bg-[#F9EEE6] relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-pattern-white.png")',
        backgroundRepeat: "repeat",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="max-w-[900px] mx-auto px-4 relative z-10">
        <div className="text-center mb-4">
          <span className="inline-block bg-mumu-orange-6 text-white font-nerko text-sm px-4 py-1.5 rounded-full uppercase tracking-wide mb-4">
            We're Hiring
          </span>
          <h2 className="font-nerko text-4xl md:text-6xl text-black mb-4 leading-tight">
            Build With the Herd
          </h2>
          <p className="font-sans text-black/70 text-base md:text-lg max-w-[600px] mx-auto leading-relaxed">
            Mumu is a revenue-generating icon. Trading fees flow directly
            on-chain — and new efforts will be re-invested back into the $MUMU
            community. We're looking for driven people to grow with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {ROLES.map((role) => (
            <div
              key={role.title}
              className="bg-white rounded-[28px] shadow-container p-7 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="text-4xl">{role.icon}</div>
              <div>
                <h3 className="font-nerko text-2xl md:text-3xl text-black mb-2">
                  {role.title}
                </h3>
                <p className="font-sans text-black/65 text-sm md:text-base leading-relaxed">
                  {role.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#F0EDE8] text-black/60 font-nerko text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#024000] rounded-[28px] p-7 md:p-10 text-center shadow-container">
          <p className="font-nerko text-white text-xl md:text-2xl mb-2">
            Interested? Reach out directly.
          </p>
          <p className="font-sans text-white/70 text-sm md:text-base mb-6">
            DM us on X or Telegram with your background and what you'd bring to
            the herd. No formal applications — just show us what you've got.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://x.com/mumuonsolana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-nerko text-base px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 shadow-container"
            >
              DM on X (Twitter)
            </a>
            <a
              href="https://t.me/mumuonsolana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-mumu-orange-6 text-white font-nerko text-base px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 shadow-container"
            >
              DM on Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HiringSection;
