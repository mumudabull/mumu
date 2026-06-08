import { BarChart3, Users, Zap } from "lucide-react";
import React from "react";
import {
  getGetMigrationStatsQueryKey,
  useGetMigrationStats,
} from "@workspace/api-client-react";
import { formatCompact, formatNumber } from "@/lib/utils";

const LiveMetricsSection = () => {
  const { data: stats } = useGetMigrationStats({
    query: {
      queryKey: getGetMigrationStatsQueryKey(),
      refetchInterval: 60000,
    },
  });
  const isLive = !!stats;
  const progress = stats
    ? Math.min(Math.max(stats.migrationProgress, 0), 100)
    : 0;
  const placeholder = "Loading…";

  const metrics = [
    {
      label: "Tokens Migrated",
      value: stats ? formatCompact(stats.totalSupply) : "—",
      sub: isLive ? "Live migrated supply" : placeholder,
      icon: <Zap className="w-5 h-5 text-white" />,
    },
    {
      label: "Holders Upgraded",
      value: stats ? formatNumber(stats.holders) : "—",
      sub: isLive ? "Wallets that migrated" : placeholder,
      icon: <Users className="w-5 h-5 text-white" />,
    },
    {
      label: "Supply Migrated",
      value: stats ? `${progress}%` : "—",
      sub: isLive ? "Of old token supply" : placeholder,
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
              Migration Stats
            </h2>
            <p className="text-white/60 font-sans mt-2">
              {isLive
                ? "Live on-chain migration data, refreshed every minute."
                : "Loading live migration data…"}
            </p>
          </div>
          <div
            className={`backdrop-blur-sm px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 ${
              isLive
                ? "bg-[#56D491]/20 text-[#56D491] border-[#56D491]/30"
                : "bg-white/10 text-white/50 border-white/10"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isLive ? "bg-[#56D491] animate-pulse" : "bg-white/30"
              }`}
            />
            {isLive ? stats.currentPhase : "Loading…"}
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <img
            src="/images/mumu-astronaut-candle.jpg"
            alt="Astronaut Mumu floating in space pushing a giant green candle higher"
            className="w-full max-w-[640px] aspect-[3/2] object-cover rounded-[32px] border-4 border-white/80 shadow-container rotate-1"
          />
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
              <div
                className={`text-4xl font-nerko mb-1 ${
                  isLive ? "text-white" : "text-white/30"
                }`}
              >
                {metric.value}
              </div>
              <div
                className={`text-sm font-nerko ${
                  isLive ? "text-[#56D491]" : "text-white/30"
                }`}
              >
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
