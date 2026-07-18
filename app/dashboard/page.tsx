"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  mockRecentJourneys,
  mockFavouriteDestinations,
  mockTravelStats,
  mockBudgetChartData,
  mockCarbonChartData,
} from "@/lib/mockData";
import {
  Bus,
  Train,
  ArrowRight,
  Sparkles,
  Leaf,
  TrendingUp,
  Route,
  Calendar,
  Map,
} from "lucide-react";
import type { TransportMode } from "@/types/journey";

const modeIcon: Record<TransportMode, React.ElementType> = {
  walk: Route,
  bus: Bus,
  metro: Train,
  train: Train,
  tram: Train,
  taxi: Route,
  bike: Route,
};

const modeColors: Record<TransportMode, string> = {
  walk: "text-emerald-400 bg-emerald-400/10",
  bus: "text-orange-400 bg-orange-400/10",
  metro: "text-brand-cyan bg-brand-cyan/10",
  train: "text-brand-blue bg-brand-blue/10",
  tram: "text-purple-400 bg-purple-400/10",
  taxi: "text-yellow-400 bg-yellow-400/10",
  bike: "text-lime-400 bg-lime-400/10",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
} as const;

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

        {/* ─── Page Header ──────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">My Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Your travel summary and statistics</p>
          </div>
          <Link
            href="/planner"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-cyan text-background font-semibold text-sm hover:bg-brand-cyan/90 hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all duration-300 self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            Plan New Journey
          </Link>
        </motion.div>

        {/* ─── Stats Grid ───────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockTravelStats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-4 border border-white/5 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white font-display">{stat.value}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{stat.unit}</div>
              <div className="text-[10px] text-slate-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ─── Charts Row ───────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Budget chart */}
          <div className="glass-card rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-brand-cyan" />
              <h2 className="font-display font-semibold text-white">Monthly Budget</h2>
              <span className="ml-auto text-xs text-slate-500">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockBudgetChartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} unit="£" />
                <Tooltip
                  contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "11px" }}
                  formatter={(val, name) => [`£${Number(val ?? 0)}`, name === "spent" ? "Spent" : "Saved"]}
                />
                <Bar dataKey="spent" fill="#4FACFE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saved" fill="#00F2FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Carbon chart */}
          <div className="glass-card rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <h2 className="font-display font-semibold text-white">Monthly CO₂ Emissions</h2>
              <span className="ml-auto text-xs text-slate-500">kg</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={mockCarbonChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} unit="kg" />
                <Tooltip
                  contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "11px" }}
                  formatter={(val) => [`${Number(val ?? 0)} kg CO₂`, "Emissions"]}
                />
                <Line
                  type="monotone"
                  dataKey="co2"
                  stroke="#34d399"
                  strokeWidth={2.5}
                  dot={{ fill: "#34d399", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#34d399" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ─── Recent Journeys ──────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue" /> Recent Journeys
            </h2>
            <Link href="/planner" className="text-xs text-brand-cyan hover:underline">Plan new</Link>
          </div>
          <div className="space-y-3">
            {mockRecentJourneys.map((journey, i) => {
              const Icon = modeIcon[journey.mode];
              const colorClass = modeColors[journey.mode];
              return (
                <motion.div
                  key={journey.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-4 border border-white/5 flex items-center gap-4 hover:border-white/10 transition-all group"
                >
                  <div className={`p-2.5 rounded-xl ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-white truncate">
                      {journey.from} <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" /> {journey.to}
                    </div>
                    <p className="text-xs text-slate-500">{new Date(journey.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {journey.duration} min</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-white">£{journey.cost.toFixed(2)}</div>
                    <div className="text-[10px] text-emerald-400">{journey.co2} kg CO₂</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Favourite Destinations ───────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white flex items-center gap-2">
              <Map className="w-4 h-4 text-brand-cyan" /> Favourite Destinations
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {mockFavouriteDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/planner`}
                  className="glass-card rounded-2xl p-4 border border-white/5 hover:border-brand-cyan/30 flex flex-col items-center text-center gap-2 block transition-all duration-300"
                >
                  <span className="text-3xl">{dest.emoji}</span>
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">{dest.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{dest.country}</div>
                  </div>
                  <div className="text-[10px] text-brand-cyan font-semibold">{dest.totalVisits}x visited</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Carbon Savings Banner ────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            <Leaf className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-white text-lg">You&apos;ve saved 38.4 kg of CO₂ this year!</h3>
            <p className="text-sm text-slate-400 mt-1">That&apos;s equivalent to planting 3 trees. Keep choosing eco-friendly routes to grow your impact.</p>
          </div>
          <div className="text-4xl shrink-0">🌳</div>
        </motion.div>

      </motion.div>
    </div>
  );
}
