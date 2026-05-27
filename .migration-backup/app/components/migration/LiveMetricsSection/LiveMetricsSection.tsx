import { ArrowUpRight, BarChart3, Users, Zap } from "lucide-react";
import React from "react";

const LiveMetricsSection = () => {
  const metrics = [
    {
      label: "Tokens Migrated",
      value: "84.2%",
      sub: "+2.1% this week",
      icon: <Zap className="w-5 h-5 text-white" />,
    },
    {
      label: "Active Migrators",
      value: "12,402",
      sub: "Wallets connected",
      icon: <Users className="w-5 h-5 text-white" />,
    },
    {
      label: "Total Value Locked",
      value: "$42.8M",
      sub: "Market Value",
      icon: <BarChart3 className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section
      id="live-metrics"
      className="w-full py-20 px-4 md:px-8 bg-[#024000] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-nerko text-white uppercase">
              Live Migration Stats
            </h2>
            <p className="text-white/60 font-sans mt-2">
              Real-time data from the $MUMU migration portal.
            </p>
          </div>
          <div className="bg-white/20  text-white backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Updates Enabled
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index.toString()}
              className="hover:scale-105 hover:-rotate-12  transition-all  duration-300 scale-100 bg-white p-8 rounded-[40px] shadow-container border border-black/5 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-mumu-green-10 rounded-2xl  transition-colors">
                  {metric.icon}
                </div>
                <ArrowUpRight className="w-5 h-5 text-black/20  transition-colors" />
              </div>
              <div className="text-sm font-nerko font-bold text-black/40 uppercase tracking-wider mb-1">
                {metric.label}
              </div>
              <div className="text-4xl font-nerko text-black-9 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-black/60 font-nerko">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMetricsSection;
