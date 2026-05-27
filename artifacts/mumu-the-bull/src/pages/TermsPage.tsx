import React from "react";
import Navbar from "@/components/Navbar";
import BuySection from "@/components/main/BuySection/BuySection";
import TickerSection from "@/components/main/TickerSection/TickerSection";
import FooterSection from "@/components/main/FooterSection/FooterSection";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9EEE6]">
      <Navbar alwaysBlack={true} />

      <main
        className="grow pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/images/bg-pattern-black.png")',
          backgroundRepeat: "repeat",
          backgroundBlendMode: "soft-light",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="font-nerko text-6xl md:text-8xl text-black-9 mb-4 text-center">
            Terms of Use
          </h1>
          <p className="font-sans text-sm text-black-9/60 mb-12 text-center">
            Last Updated: March 10, 2026
          </p>

          <div className="space-y-12 font-sf-pro-display text-black-9/80 leading-relaxed">
            <section>
              <p className="text-lg">
                Welcome to MUMU the Bull ("MUMU", "we", "our", or "us"). By
                accessing or using any MUMU-related platforms, tokens, websites,
                or services, you agree to comply with and be bound by these
                Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                1. General Disclaimer
              </h2>
              <p className="mb-4">
                MUMU is a community-driven cryptocurrency project created for
                entertainment, cultural, and experimental purposes. It is not
                intended to be a financial instrument, security, or investment
                product.
              </p>
              <p className="mb-2 font-semibold">You acknowledge that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cryptocurrency markets are highly volatile.</li>
                <li>You may lose all funds used to purchase MUMU tokens.</li>
                <li>
                  No guarantees of value, returns, or future performance are
                  provided.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                2. No Financial Advice
              </h2>
              <p className="mb-4">
                All content related to MUMU—including but not limited to website
                content, social media posts, and community discussions—is for
                informational purposes only and does not constitute financial,
                legal, or investment advice.
              </p>
              <p className="mb-2 font-semibold">You are solely responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conducting your own research (DYOR)</li>
                <li>Making independent financial decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                3. Token Use
              </h2>
              <p className="mb-4 font-semibold text-lg">MUMU tokens:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Have no intrinsic value or guaranteed utility</li>
                <li>Are not backed by any physical or financial asset</li>
                <li>May be subject to extreme price fluctuations</li>
              </ul>
              <p className="mt-4">
                Use of the token is entirely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                4. Eligibility
              </h2>
              <p className="mb-4">By interacting with MUMU, you confirm that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You are at least 18 years old (or legal age in your
                  jurisdiction)
                </li>
                <li>
                  You are not restricted from participating in
                  cryptocurrency-related activities under your local laws
                </li>
                <li>
                  You understand the risks associated with blockchain technology
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                5. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law, MUMU and its team shall
                not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Financial losses or damages</li>
                <li>Smart contract vulnerabilities or exploits</li>
                <li>Third-party platform issues (e.g., exchanges, wallets)</li>
                <li>Market volatility or token price changes</li>
              </ul>
              <p className="mt-4">All interactions are at your own risk.</p>
            </section>
          </div>
        </div>
      </main>

      <BuySection />
      <TickerSection />
      <FooterSection />
    </div>
  );
}
