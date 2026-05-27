import React from "react";

const steps = [
  {
    title: "Setup",
    description:
      "A new Pumpfun token will be created using the Migratefun Creator Dashboard with the same ticker (Mumu), image, and parameters.",
    bgColor: "bg-[#BCA991]",
  },
  {
    title: "Deposit Window (June 1st – June 8th)",
    description:
      "Holders will deposit their old Mumu tokens through migrate.fun during the deposit window (June 1st – June 8th).",
    bgColor: "bg-[#C8B7A4]",
  },
  {
    title: "LP Recovery",
    description:
      "MigrateFun will sell the deposited old Mumu tokens, reclaiming SOL from the old liquidity pool.",
    bgColor: "bg-[#D4C5B7]",
  },
  {
    title: "Rebuying on PumpFun",
    description:
      "Migratefun will use the recovered SOL to buy into new Mumu's bonding curve and match the old token's final price.",
    bgColor: "bg-[#E1D4CA]",
  },
  {
    title: "Token Claiming (Opens June 8th)",
    description:
      "Starting June 8th, holders can claim their new Mumu tokens at migrate.fun. 1% of old Mumu = 1% of new Mumu — proportional ownership is preserved.",
    bgColor: "bg-white",
    isHighlighted: true,
  },
  {
    title: "Claim Period",
    description:
      "90-day window opens June 8th. Depositors keep their 1% = 1% share. Those who did not deposit during the window can still migrate with a 5% penalty.",
    bgColor: "bg-white",
  },
  {
    title: "After 90 Days",
    description:
      "Unclaimed tokens + leftover SOL go to treasury. Excess tokens will be removed from circulation and locked.",
    bgColor: "bg-white",
  },
];

function HowMigrationWorkedSection() {
  return (
    <section
      className="bg-[#750000] relative py-20 px-4 md:px-0 pb-48 md:pb-20"
      style={{
        backgroundImage: 'url("/images/bg-pattern-white.png")',
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-container container mx-auto relative z-10">
        <h2 className="text-white text-4xl md:text-6xl font-nerko text-center mb-12">
          How Migration Will Work
        </h2>

        <div className="flex flex-col gap-8 items-center">
          <div className="max-w-[762px] w-full flex flex-col gap-5">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-container relative ${
                  step.bgColor
                } ${step.isHighlighted ? "ring-4 ring-white" : ""}`}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 shrink-0 w-8 h-8 md:w-12 md:h-12 bg-[#A44700] rounded-full flex items-center justify-center text-white font-nerko text-lg md:text-2xl shadow-md mt-1">
                  {index + 1}
                </div>
                <div className="pl-3">
                  <h3 className="text-[#3C3C3C] text-xl md:text-2xl font-nerko mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#3C3C3C]/80 text-sm md:text-base font-nerko">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-[calc(var(--unit)*480)] aspect-square absolute bottom-0 right-0" style={{ maxWidth: "min(480px, calc(var(--unit)*480))" }}>
        <img
          src="/images/how-migration-worked.png"
          alt="Bull sitting in a chair"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
}

export default HowMigrationWorkedSection;
