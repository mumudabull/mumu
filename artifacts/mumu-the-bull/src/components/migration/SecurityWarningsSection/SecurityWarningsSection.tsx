import { AlertTriangle, ShieldCheck, UserX } from "lucide-react";
import React from "react";

const SecurityWarningsSection = () => {
  const warnings = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-red-900" />,
      title: "Official Links Only",
      text: "Always double-check that you are on the official migrate.fun or mumu.so domain. Never click on migration links in Telegram DMs.",
    },
    {
      icon: <UserX className="w-8 h-8 text-red-900" />,
      title: "Beware of Impersonators",
      text: "Support staff will NEVER DM you first. If someone asks for your seed phrase or private keys, they are a scammer.",
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-900" />,
      title: "No Surprise Airdrops",
      text: "There are no surprise airdrops or 'special bonuses' for migrating early. Official updates only come from our verified X and Telegram accounts.",
    },
  ];

  return (
    <section
      id="security-warnings"
      className="w-full py-20 px-4 md:px-8 bg-red-50/50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-nerko mb-4 text-center text-black uppercase">
          Security Warnings
        </h2>
        <p className="text-center text-black/70 mb-12 max-w-2xl mx-auto">
          Protect your assets. The MUMU migration is a target for scammers. Stay
          vigilant and follow these guidelines.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {warnings.map((warning, index) => (
            <div
              key={index.toString()}
              className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 flex flex-col items-center text-center"
            >
              <div className="mb-4">{warning.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-black font-nerko uppercase">
                {warning.title}
              </h3>
              <p className="text-sm text-black/70 leading-relaxed font-nerko">
                {warning.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityWarningsSection;
