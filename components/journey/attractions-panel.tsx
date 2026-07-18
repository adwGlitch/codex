"use client";

import { motion } from "framer-motion";
import { mockJourneyPlan } from "@/lib/mockData";
import { MapPin, Clock, Star, Ticket } from "lucide-react";

export function AttractionsPanel() {
  const { attractions } = mockJourneyPlan;

  return (
    <div className="space-y-4">
      {attractions.map((attr, i) => (
        <motion.div
          key={attr.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="glass-card rounded-2xl p-4 border border-white/5 hover:border-brand-cyan/20 group transition-all duration-300"
        >
          <div className="flex gap-4">
            {/* Emoji icon */}
            <div className="text-3xl w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
              {attr.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-display font-semibold text-white group-hover:text-brand-cyan transition-colors">{attr.name}</h3>
                <div className="flex items-center gap-1 text-xs text-amber-400 shrink-0 ml-2">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {attr.rating}
                </div>
              </div>
              <p className="text-[10px] text-brand-cyan uppercase tracking-wider font-semibold mb-2">{attr.category}</p>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{attr.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  <MapPin className="w-3 h-3" />{attr.distance}m away
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Clock className="w-3 h-3" />~{attr.estimatedTime} min visit
                </span>
                {attr.free ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-semibold">Free Entry</span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold">
                    <Ticket className="w-3 h-3" />£{attr.entryFee}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
