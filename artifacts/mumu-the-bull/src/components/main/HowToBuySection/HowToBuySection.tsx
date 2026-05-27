import React from "react";

const buySteps = [
  {
    title: "BUY SOL FROM A CENTRALIZED EXCHANGE",
    description:
      "The greatest meme IP ever conceived. When the bear market arrived, the bulls were ridiculed, and the warrior stumbled. Yet, the unwavering bull perseveres.",
    bgColor: "bg-white",
  },
  {
    title: "CREATE & SECURE YOUR PHANTOM WALLET",
    description:
      "Create a brand new wallet with Phantom App, keep your seed phrase safe, write it down on a piece of paper you can keep safely!",
    bgColor: "bg-white",
  },
  {
    title: "TRANSFER SOL TO YOUR WALLET",
    description:
      "Copy the Solana wallet address and send some Solana from your exchange account to your phantom wallet address.",
    bgColor: "bg-white",
  },
  {
    title: "CONNECT TO A DEX (RAYDIUM) & OPEN SWAP",
    description:
      "Now visit an exchange platform such as Raydium (via our buy button if you're having trouble) and head over to 'Swap.' Connect your phantom wallet when prompted.",
    bgColor: "bg-white",
  },
  {
    title: "SWAP SOL FOR $MUMU USING CONTRACT ADDRESS",
    description:
      "Swap the Solana in your wallet for Mumu, you can find Mumu as an option by pasting in the contract address below: 5LafQUrVco6o7KMz42eqVEJ9LW31StPyGjeeu5sKoM1A",
    bgColor: "bg-white",
  },
];

function HowToBuySection() {
  return (
    <section
      id="how-to-buy"
      className="bg-[#750000] relative py-20 px-4 md:px-0 pb-48 md:pb-32 overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-pattern-white.png")',
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-container container mx-auto relative z-10">
        <div className="flex justify-center items-center gap-4 mb-12">
          <h2 className="text-white text-4xl md:text-6xl font-nerko text-center uppercase">
            HOW DO I BUY
          </h2>
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.svg"
              width={258}
              height={90}
              alt="Mumu"
              className="object-contain h-auto w-[120px] md:w-[200px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 items-center">
          <div className="max-w-[762px] w-full flex flex-col gap-5">
            {buySteps.map((step, index) => (
              <div
                key={step.title}
                className={`flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-container relative ${step.bgColor}`}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 shrink-0 w-8 h-8 md:w-12 md:h-12 bg-[#E67E22] rounded-full flex items-center justify-center text-white font-nerko text-lg md:text-2xl shadow-md mt-1">
                  {index + 1}
                </div>
                <div className="pl-3">
                  <h3 className="text-[#000000] text-xl md:text-2xl font-black font-nerko mb-1 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-[#3C3C3C] text-sm md:text-base font-nerko leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#E67E22] text-center text-white font-nerko text-xl md:text-3xl px-12 py-4 rounded-buttons shadow-container transition-all uppercase border-b-4 border-black/20">
            CONGRATULATIONS, YOU ARE NOW A FUTURE MULLIONAIRE.
          </div>
        </div>
      </div>

      <div className="w-full max-w-[180px] lg:max-w-[480px] aspect-square absolute bottom-0 lg:bottom-24 right-0 z-20 block">
        <img
          src="/images/how-migration-worked.png"
          alt="Bull sitting in a chair"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-0">
        <img
          src="/images/brick-floor.png"
          alt="Brick Floor"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>
    </section>
  );
}

export default HowToBuySection;
