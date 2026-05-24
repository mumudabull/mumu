"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const FAQ_DATA = [
  {
    question: "How do I claim my new $MUMU tokens?",
    answer:
      "Go to migrate.fun/project/mig139 - connect the wallet you used to deposit your old $MUMU tokens, and claim your new $MUMU 1:1. THIS IS THE ONLY LINK. Please stay safe from all other scam links and unsolicited messages.",
  },
  {
    question: "How long do I have to claim or migrate?",
    answer:
      "The claim period is open for 90 days, lasting until approximately June 8th. We recommend claiming as soon as possible to ensure you receive your new tokens promptly.",
  },
  {
    question: "What if I missed the deposit window?",
    answer:
      "If you missed the initial deposit window (Feb 24 – Mar 10), you can still migrate during the 90-day claim period, but a 5% penalty will apply to your token conversion.",
  },
  {
    question: "Why did $MUMU migrate?",
    answer:
      "The migration was necessary to implement creator fees for ongoing revenue, rebalance the Liquidity Pool for better price discovery, and ensure proper supply management through token burns.",
  },
  {
    question: "What happens to unclaimed tokens after 90 days?",
    answer:
      "Once the 90-day claim period ends, all unclaimed tokens and leftover SOL will be moved to the project treasury to support future development and community initiatives.",
  },
  {
    question: "Is there a token burn involved?",
    answer:
      "Yes, approximately 450M excess tokens will be burned after the 90-day claim period to match the original circulating supply and prevent any dilution.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={` hover:rotate-2 transition-all duration-300  border border-black-8 rounded-xl mb-4 overflow-hidden ${isOpen ? "bg-black-6" : "bg-black"}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left  hover:bg-black-9 cursor-pointer group"
      >
        <span className="font-nerko text-white text-xl md:text-2xl leading-none pt-1">
          {question}
        </span>
        <ChevronDown
          className={`text-white w-6 h-6 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-black-3 font-sans text-sm md:text-base leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section
      className="py-20 md:py-32 bg-[#222222] relative"
      style={{
        backgroundImage: 'url("/images/bg-pattern-white.png")',
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-200 mx-auto px-4 relative z-10">
        <h2 className="font-nerko text-white text-4xl md:text-5xl lg:text-5xl mb-16 text-center md:text-left leading-tight">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col">
          {FAQ_DATA.map((item, index) => (
            <FAQItem
              key={index.toString()}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
