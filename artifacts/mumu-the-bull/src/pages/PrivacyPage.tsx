import React from "react";
import Navbar from "@/components/Navbar";
import BuySection from "@/components/main/BuySection/BuySection";
import TickerSection from "@/components/main/TickerSection/TickerSection";
import FooterSection from "@/components/main/FooterSection/FooterSection";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9EEE6]">
      <Navbar alwaysBlack={true} />

      <main
        className="flex-grow pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/images/bg-pattern-black.png")',
          backgroundRepeat: "repeat",
          backgroundBlendMode: "soft-light",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="font-nerko text-6xl md:text-8xl text-black-9 mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="font-sans text-sm text-black-9/60 mb-12 text-center">
            Last Updated: March 10, 2026
          </p>

          <div className="space-y-12 font-sf-pro-display text-black-9/80 leading-relaxed">
            <section>
              <p className="text-lg text-center italic">
                Your privacy is important to us. This Privacy Policy explains
                how MUMU the Bull handles information.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                1. Information Collection
              </h2>
              <p>
                MUMU is a decentralized project. We do not require you to create
                an account or provide personal information such as your name,
                email address, or physical address to browse our website or use
                our tokens.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                2. Blockchain Data
              </h2>
              <p>
                Please note that all transactions on the blockchain are public.
                Your wallet address and transaction history are visible to
                anyone. We do not control this data and cannot delete it.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                3. Cookies and Tracking
              </h2>
              <p>
                Our website may use basic cookies or analytical tools to help us
                understand how users interact with our site and to improve the
                user experience. You can manage your cookie preferences through
                your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                4. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites, such as
                exchanges, social media platforms, or community tools. We are
                not responsible for the privacy practices of these external
                sites.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                5. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-nerko text-3xl md:text-4xl text-black-9 mb-4">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, you can
                reach out to us at{" "}
                <a href="mailto:hello@mumu.ing" className="underline">
                  hello@mumu.ing
                </a>
                .
              </p>
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
