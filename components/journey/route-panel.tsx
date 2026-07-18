"use client";

import { motion } from "framer-motion";
import { mockJourneyPlan } from "@/lib/mockData";
import { Bus, Train, PersonStanding, Car, Bike, BadgeCheck } from "lucide-react";
import type { TransportMode } from "@/types/journey";

const ModeIcon = ({ mode }: { mode: TransportMode }) => {
  const icons: Record<TransportMode, React.ReactNode> = {
    walk: <PersonStanding className="w-4 h-4" />,
    bus: <Bus className="w-4 h-4" />,
    metro: <Train className="w-4 h-4" />,
    train: <Train className="w-4 h-4" />,
    tram: <Train className="w-4 h-4" />,
    taxi: <Car className="w-4 h-4" />,
    bike: <Bike className="w-4 h-4" />,
  };
  return <>{icons[mode]}</>;
};

const modeColors: Record<TransportMode, string> = {
  walk: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  bus: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  metro: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
  train: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
  tram: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  taxi: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  bike: "text-lime-400 bg-lime-400/10 border-lime-400/20",
};

const tagColors: Record<string, string> = {
  cyan: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30",
  green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  purple: "text-purple-400 bg-purple-400/10 border-purple-400/30",
};

export function RoutePanel() {
  const { routes } = mockJourneyPlan;

  return (
    <div className="space-y-4">
      {routes.map((route, i) => (
        <motion.div
          key={route.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`glass-card rounded-2xl p-5 border ${
            route.isRecommended
              ? "border-brand-cyan/30 shadow-[0_0_24px_rgba(0,242,254,0.07)]"
              : "border-white/5"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-bold text-white">{route.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[route.tagColor] || tagColors.cyan}`}>
                  {route.tag}
                </span>
                {route.isRecommended && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-brand-cyan">
                    <BadgeCheck className="w-3 h-3" /> AI Pick
                  </span>
                )}
              </div>
              <div className="flex gap-3 text-xs text-slate-400">
                <span>⏱ {route.totalTime} min</span>
                <span>🚶 {route.walkingTime} min walk</span>
                <span>🔄 {route.transfers} transfer{route.transfers !== 1 ? "s" : ""}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">£{route.totalFare.toFixed(2)}</div>
              <div className="text-[10px] text-slate-500">estimated fare</div>
            </div>
          </div>

          {/* Segments */}
          <div className="space-y-2">
            {route.segments.map((seg, j) => (
              <div key={j} className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg border ${modeColors[seg.mode]}`}>
                  <ModeIcon mode={seg.mode} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-200 truncate">
                    {seg.label}{seg.line ? ` · ${seg.line}` : ""}{seg.stops ? ` · ${seg.stops} stops` : ""}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{seg.from} → {seg.to}</div>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap">
                  {seg.duration} min · {(seg.distance / 1000).toFixed(1)} km
                </div>
              </div>
            ))}
          </div>

          {/* Score bar */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
              <span>AI Route Score</span>
              <span className="font-bold text-white">{route.overallScore}/100</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${route.overallScore}%` }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-cyan to-brand-blue rounded-full"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
