"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Route as RouteIcon,
  CloudSun,
  Utensils,
  ShieldCheck,
  Landmark,
  PoundSterling,
  Leaf,
  Sparkles,
  ArrowLeft,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { mockJourneyPlan } from "@/lib/mockData";
import { RoutePanel } from "@/components/journey/route-panel";
import { WeatherPanel } from "@/components/journey/weather-panel";
import { FoodPanel } from "@/components/journey/food-panel";
import { EssentialsPanel } from "@/components/journey/essentials-panel";
import { AttractionsPanel } from "@/components/journey/attractions-panel";
import { BudgetPanel } from "@/components/journey/budget-panel";
import { CarbonPanel } from "@/components/journey/carbon-panel";
import { AiSuggestionsPanel } from "@/components/journey/ai-suggestions-panel";

type Tab = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
};

const tabs: Tab[] = [
  { id: "route", label: "Route", icon: RouteIcon, badge: 3 },
  { id: "weather", label: "Weather", icon: CloudSun },
  { id: "food", label: "Food", icon: Utensils, badge: 5 },
  { id: "essentials", label: "Essentials", icon: ShieldCheck, badge: 6 },
  { id: "attractions", label: "Sights", icon: Landmark, badge: 5 },
  { id: "budget", label: "Budget", icon: PoundSterling },
  { id: "carbon", label: "Carbon", icon: Leaf },
  { id: "ai", label: "AI Tips", icon: Sparkles, badge: 7 },
];

function JourneyContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("route");
  const [loading, setLoading] = useState(true);

  const from = searchParams.get("from") || mockJourneyPlan.from;
  const to = searchParams.get("to") || mockJourneyPlan.to;
  const date = searchParams.get("date") || mockJourneyPlan.date;
  const travellers = Number(searchParams.get("travellers") || mockJourneyPlan.travellers);

  useEffect(() => {
    // Simulate AI plan generation
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const panelContent: Record<string, React.ReactNode> = {
    route: <RoutePanel />,
    weather: <WeatherPanel />,
    food: <FoodPanel />,
    essentials: <EssentialsPanel />,
    attractions: <AttractionsPanel />,
    budget: <BudgetPanel />,
    carbon: <CarbonPanel />,
    ai: <AiSuggestionsPanel />,
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-brand-cyan/20 border-t-brand-cyan animate-spin" />
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-brand-cyan" />
        </div>
        <div className="text-center">
          <p className="text-white font-display font-semibold text-lg">Planning Your Journey</p>
          <p className="text-slate-400 text-sm mt-1 animate-pulse">Analysing routes, weather, food, and more...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <Link
          href="/planner"
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Planner
        </Link>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-2xl font-bold text-white">
              {from} → {to}
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 font-semibold">
              ✓ AI Plan Ready
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            &nbsp;·&nbsp;{travellers} traveller{travellers !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Best time", value: "28 min", color: "text-brand-cyan" },
            { label: "Best fare", value: "£5.40", color: "text-emerald-400" },
            { label: "Temp", value: `${mockJourneyPlan.weather.current.temp}°C ${mockJourneyPlan.weather.current.icon}`, color: "text-brand-blue" },
          ].map((s) => (
            <div key={s.label} className="px-3 py-2 glass-card rounded-xl border border-white/5 text-center min-w-[80px]">
              <div className={`font-bold text-sm ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex overflow-x-auto pb-1 gap-1 no-scrollbar"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
              activeTab === tab.id
                ? "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.badge && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.id ? "bg-brand-cyan text-background" : "bg-white/10 text-slate-400"}`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Panel content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {panelContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function JourneyPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
      </div>
    }>
      <JourneyContent />
    </Suspense>
  );
}
