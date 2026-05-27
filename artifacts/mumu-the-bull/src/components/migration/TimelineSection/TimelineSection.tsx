import React from "react";

const timelineEvents = [
  {
    id: 1,
    date: "June 1",
    title: "Migration Portal Opens",
    description:
      "The $MUMU → Pump.fun migration portal goes live. Holders can begin depositing their old Mumu tokens.",
    status: "upcoming",
  },
  {
    id: 2,
    date: "June 8",
    title: "Token Claims Open",
    description:
      "Holders can claim their new $MUMU tokens at migrate.fun. 1% of old Mumu = 1% of new Mumu — proportional ownership preserved.",
    status: "upcoming",
  },
  {
    id: 3,
    date: "~90 Days After",
    title: "Claim Period Ends",
    description:
      "Late migrators incur a 5% penalty. Unclaimed tokens move to treasury and excess tokens are removed from circulation and locked.",
    status: "upcoming",
  },
];

const TimelineSection = () => {
  return (
    <section
      id="timeline"
      className="w-full py-20 px-4 md:px-8 bg-black-9 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-nerko mb-12 text-center uppercase tracking-tight">
          Migration Timeline
        </h2>
        <div className="relative border-l border-white/50 ml-4 md:ml-0 md:flex md:border-l-0 md:border-t md:justify-between">
          {timelineEvents.map((event, index) => (
            <div
              key={index.toString()}
              className="mb-10 ml-6 md:ml-0 md:mt-8 md:w-1/3 relative"
            >
              <div
                className={`absolute w-4 h-4 ${event.id === 1 ? "bg-orange-500" : "bg-white"} rounded-full -left-[31px] md:-top-[41px] md:left-0 flex items-center justify-center`}
              >
                {event.status === "current" && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                )}
              </div>
              <div
                className={`text-sm font-bold mb-1 ${event.status === "current" ? "text-orange-500" : "text-white/50"}`}
              >
                {event.date}
              </div>
              <h3 className="font-nerko text-2xl font-bold mb-2">
                {event.title}
              </h3>
              <p className="text-sm opacity-70 leading-relaxed max-w-xs">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
