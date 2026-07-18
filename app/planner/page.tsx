"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Calendar,
  Users,
  PoundSterling,
  ArrowRightLeft,
  Loader2,
  X,
  Sparkles
} from "lucide-react";
import { travelPreferences } from "@/lib/mockData";
import type { TravelPreference } from "@/types/journey";
import MapWrapper from "@/components/map-wrapper";
import { searchLocations } from "@/services/geocoding";
import { Location } from "@/types/planner";

export default function PlannerPage() {
  const router = useRouter();

  // Location state
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState<Location[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<Location[]>([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destLoading, setDestLoading] = useState(false);
  const [showOriginPanel, setShowOriginPanel] = useState(false);
  const [showDestPanel, setShowDestPanel] = useState(false);

  // Journey config
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState(50);
  const [travellers, setTravellers] = useState(1);
  const [selectedPreferences, setSelectedPreferences] = useState<TravelPreference[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ─── Geocoding debounce ─────────────────────────────────────────────────
  let originTimer: ReturnType<typeof setTimeout>;
  let destTimer: ReturnType<typeof setTimeout>;

  const handleOriginChange = (val: string) => {
    setOriginQuery(val);
    setShowOriginPanel(true);
    if (val === "") { setOrigin(null); return; }
    clearTimeout(originTimer);
    if (val.length >= 3) {
      setOriginLoading(true);
      originTimer = setTimeout(async () => {
        const res = await searchLocations(val);
        setOriginSuggestions(res);
        setOriginLoading(false);
      }, 400);
    }
  };

  const handleDestChange = (val: string) => {
    setDestQuery(val);
    setShowDestPanel(true);
    if (val === "") { setDestination(null); return; }
    clearTimeout(destTimer);
    if (val.length >= 3) {
      setDestLoading(true);
      destTimer = setTimeout(async () => {
        const res = await searchLocations(val);
        setDestSuggestions(res);
        setDestLoading(false);
      }, 400);
    }
  };

  const selectOrigin = (loc: Location) => {
    setOrigin(loc);
    setOriginQuery(loc.name);
    setOriginSuggestions([]);
    setShowOriginPanel(false);
  };

  const selectDestination = (loc: Location) => {
    setDestination(loc);
    setDestQuery(loc.name);
    setDestSuggestions([]);
    setShowDestPanel(false);
  };

  const swapLocations = () => {
    const t = origin;
    setOrigin(destination);
    setDestination(t);
    const tq = originQuery;
    setOriginQuery(destQuery);
    setDestQuery(tq);
  };

  const togglePreference = (id: TravelPreference) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Navigate to the AI journey page, passing preferences as a query
    const params = new URLSearchParams({
      from: originQuery || "King's Cross",
      to: destQuery || "Tower Bridge",
      date: date || "2025-08-15",
      budget: budget.toString(),
      travellers: travellers.toString(),
      preferences: selectedPreferences.join(",")
    });
    setTimeout(() => {
      router.push(`/journey?${params.toString()}`);
    }, 800);
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row h-[calc(100vh-64px)] relative overflow-hidden bg-background">

      {/* ─── Left Sidebar ──────────────────────────────────────────────── */}
      <aside className="w-full lg:w-[440px] bg-card border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col h-1/2 lg:h-full z-10 overflow-y-auto">

        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white">Journey Planner</h1>
              <p className="text-[11px] text-slate-500">AI-powered route recommendations</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 space-y-5 overflow-y-auto">

          {/* ─── Location Inputs ─────────────────────────────────────── */}
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Route</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-cyan z-10" />
              <input
                type="text"
                placeholder="From — enter origin..."
                value={originQuery}
                onChange={(e) => handleOriginChange(e.target.value)}
                onFocus={() => setShowOriginPanel(true)}
                className="w-full bg-black/40 border border-white/8 focus:border-brand-cyan/50 rounded-xl pl-11 pr-9 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors"
              />
              {originQuery && (
                <button onClick={() => { setOriginQuery(""); setOrigin(null); }} className="absolute right-3 top-3.5 text-slate-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
              <AnimatePresence>
                {showOriginPanel && (originSuggestions.length > 0 || originLoading) && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1.5 p-2 rounded-xl bg-slate-900 border border-white/10 shadow-2xl z-30 max-h-52 overflow-y-auto">
                    {originLoading ? (
                      <div className="flex items-center justify-center py-3 gap-2 text-xs text-slate-400">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-cyan" /> Searching...
                      </div>
                    ) : originSuggestions.map((loc, i) => (
                      <button key={i} onClick={() => selectOrigin(loc)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-white transition-colors">
                        <span className="font-semibold block">{loc.name}</span>
                        <span className="text-[10px] text-slate-500 truncate block">{loc.displayName}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Swap button */}
            <div className="flex items-center justify-center">
              <button onClick={swapLocations}
                className="p-2 rounded-xl bg-white/5 border border-white/8 hover:bg-brand-cyan/10 hover:border-brand-cyan/30 text-slate-500 hover:text-brand-cyan transition-all">
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <Navigation className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-blue z-10" />
              <input
                type="text"
                placeholder="To — enter destination..."
                value={destQuery}
                onChange={(e) => handleDestChange(e.target.value)}
                onFocus={() => setShowDestPanel(true)}
                className="w-full bg-black/40 border border-white/8 focus:border-brand-blue/50 rounded-xl pl-11 pr-9 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors"
              />
              {destQuery && (
                <button onClick={() => { setDestQuery(""); setDestination(null); }} className="absolute right-3 top-3.5 text-slate-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
              <AnimatePresence>
                {showDestPanel && (destSuggestions.length > 0 || destLoading) && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1.5 p-2 rounded-xl bg-slate-900 border border-white/10 shadow-2xl z-30 max-h-52 overflow-y-auto">
                    {destLoading ? (
                      <div className="flex items-center justify-center py-3 gap-2 text-xs text-slate-400">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-blue" /> Searching...
                      </div>
                    ) : destSuggestions.map((loc, i) => (
                      <button key={i} onClick={() => selectDestination(loc)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-white transition-colors">
                        <span className="font-semibold block">{loc.name}</span>
                        <span className="text-[10px] text-slate-500 truncate block">{loc.displayName}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Date & Travellers ────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black/40 border border-white/8 focus:border-brand-cyan/40 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-300 outline-none transition-colors [color-scheme:dark]"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Travellers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <div className="flex items-center bg-black/40 border border-white/8 rounded-xl pl-10 pr-2 py-1">
                  <button onClick={() => setTravellers(Math.max(1, travellers - 1))} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white font-bold transition-colors">-</button>
                  <span className="flex-1 text-center text-sm font-semibold text-white">{travellers}</span>
                  <button onClick={() => setTravellers(Math.min(10, travellers + 1))} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white font-bold transition-colors">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Budget slider ────────────────────────────────────────── */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
              Budget per person
            </label>
            <div className="relative bg-black/40 border border-white/8 rounded-xl px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <PoundSterling className="w-4 h-4 text-brand-cyan" />
                  <span className="text-lg font-bold text-white">{budget}</span>
                </div>
                <span className="text-xs text-slate-500">per person</span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-cyan [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,242,254,0.6)] [&::-webkit-slider-track]:rounded-full"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1.5">
                <span>£5</span>
                <span>£500</span>
              </div>
            </div>
          </div>

          {/* ─── Travel Preferences ───────────────────────────────────── */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Travel Style
              {selectedPreferences.length > 0 && (
                <span className="ml-2 text-brand-cyan">({selectedPreferences.length} selected)</span>
              )}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {travelPreferences.map((pref) => {
                const isSelected = selectedPreferences.includes(pref.id as TravelPreference);
                return (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id as TravelPreference)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 text-left ${
                      isSelected
                        ? "bg-brand-cyan/10 border-brand-cyan/40 text-brand-cyan"
                        : "bg-black/20 border-white/8 text-slate-400 hover:border-white/15 hover:text-slate-300"
                    }`}
                  >
                    <span className="text-base leading-none">{pref.emoji}</span>
                    <span className="leading-tight">{pref.label}</span>
                    {isSelected && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Search button ────────────────────────────────────────── */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full py-4 rounded-2xl text-sm font-bold text-background bg-brand-cyan hover:bg-brand-cyan/90 hover:shadow-[0_0_24px_rgba(0,242,254,0.35)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Finding your perfect route...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Find My Route
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ─── Map ─────────────────────────────────────────────────────────── */}
      <section className="flex-grow h-1/2 lg:h-full relative">
        <MapWrapper origin={origin} destination={destination} />
      </section>
    </div>
  );
}
