import { BarChart3, Users, Zap } from "lucide-react";
import React from "react";

const metrics = [
  {
    label: "Tokens Migrated",
    value: "—",
    sub: "Available June 2nd",
    icon: <Zap className="w-5 h-5 text-white" />,
  },
  {
    label: "Active Migrators",
    value: "—",
    sub: "Available June 2nd",
    icon: <Users className="w-5 h-5 text-white" />,
  },
  {
    label: "Total Value Locked",
    value: "—",
    sub: "Available June 2nd",
    icon: <BarChart3 className="w-5 h-5 text-white" />,
  },
];

const LiveMetricsSection = () => {
  return (
    <section
      id="live-metrics"
      className="w-full py-20 px-4 md:px-8 bg-[#024000] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-nerko text-white uppercase">
              Migration Stats
            </h2>
            <p className="text-white/60 font-sans mt-2">
              Live data will be available when the portal opens June 2nd.
            </p>
          </div>
          <div className="bg-white/10 text-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-white/30 rounded-full" />
            Not Yet Live
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index.toString()}
              className="bg-white/10 p-8 rounded-[40px] border border-white/10"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-white/10 rounded-2xl">
                  {metric.icon}
                </div>
              </div>
              <div className="text-sm font-nerko font-bold text-white/40 uppercase tracking-wider mb-1">
                {metric.label}
              </div>
              <div className="text-4xl font-nerko text-white/30 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-white/30 font-nerko">
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
