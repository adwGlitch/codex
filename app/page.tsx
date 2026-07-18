"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Route,
  CloudRain,
  Map,
  Gauge,
  Accessibility,
  ArrowRight,
  Cpu,
  CheckCircle
} from "lucide-react";
import InteractivePreview from "@/components/interactive-preview";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as const;

  const features = [
    {
      icon: Cpu,
      title: "AI Explanation Engine",
      description: "Uses Google Gemini API to translate complex, multi-factor scoring metrics into plain-English reasoning tailored to your trip context.",
      color: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-brand-cyan"
    },
    {
      icon: CloudRain,
      title: "Weather Intelligence",
      description: "Integrates real-time weather forecasts from Open-Meteo, adjusting route scores dynamically based on precipitation, wind, and temperature.",
      color: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-brand-blue"
    },
    {
      icon: Map,
      title: "Interactive Map Layer",
      description: "Renders full leaflet-based maps plotting optimized paths, path segments, and transit transfers with custom styled Leaflet elements.",
      color: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-400"
    },
    {
      icon: Gauge,
      title: "Multi-Factor Scoring",
      description: "Evaluates routes using a deterministic scoring engine that balances travel time, outdoor walking, weather exposure, comfort, and budget.",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Accessibility,
      title: "Comfort & Accessibility",
      description: "Allows filters for sheltered paths, minimized stairs, and reduced walking distances, creating highly customized plans for everyone.",
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400"
    },
    {
      icon: Route,
      title: "Smart OSRM Routing",
      description: "Accesses OpenStreetMap's routing engine to retrieve exact segment geometries, travel times, and directions for multiple route variants.",
      color: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-400"
    }
  ];

  const techStack = [
    { name: "Next.js 15", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS v4", category: "Styling" },
    { name: "Framer Motion", category: "Animations" },
    { name: "React Leaflet", category: "Mapping" },
    { name: "Google Gemini", category: "AI Reasoning" },
    { name: "OSRM API", category: "Routing Engine" },
    { name: "Open-Meteo", category: "Weather Data" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10"
            >
              <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
              <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
                The Mobility Operating System
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]"
            >
              Beyond the Shortest Path:{" "}
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple bg-clip-text text-transparent">
                Smarter Journey Planning
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Traditional maps optimize for distance. FlowRoute leverages weather data, route physics, and AI reasoning to design the journey that fits your day, comfort, and real-world preferences.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/planner"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-background bg-brand-cyan hover:bg-brand-cyan/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] group"
              >
                Launch Journey Planner
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                Explore Features
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="py-12 md:py-20 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See the Decision Engine in Action
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Try switching priority rules below to see how our deterministic algorithm and AI route explainer suggest protected transport modes over high-exposure walking during a localized storm.
            </p>
          </div>
          <InteractivePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered for Complete Context Awareness
            </h2>
            <p className="text-slate-400">
              FlowRoute aggregates multiple API data layers, scores options mathematically, and serves them with personalized explanations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 hover:border-brand-cyan/20 transition-all duration-300 group"
              >
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${feat.color} border border-white/5 w-fit mb-6`}>
                  <feat.icon className={`w-6 h-6 ${feat.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture */}
      <section className="py-16 md:py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Tech explanation */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Powered by a Modern Open Ecosystem
              </h2>
              <p className="text-slate-400 leading-relaxed">
                FlowRoute is built completely client-side using deterministic APIs combined with modern LLM reasoning models. It integrates and aggregates live open APIs without requiring a backend database.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-cyan" />
                  </div>
                  <span className="text-sm text-slate-300">No user sign-in or session cookies required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-cyan" />
                  </div>
                  <span className="text-sm text-slate-300">Open-source routing geometries from OpenStreetMap</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-cyan" />
                  </div>
                  <span className="text-sm text-slate-300">Deterministic scoring engine fallback for offline routing</span>
                </div>
              </div>
            </div>

            {/* Tech badges layout */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between h-28 hover:bg-white/[0.05] transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                    {tech.category}
                  </span>
                  <span className="text-sm font-bold text-white mt-auto">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/5 via-transparent to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to Travel Smarter?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Input any origin and destination, add your journey constraints, and experience real-time route optimization with active weather intelligence.
          </p>
          <div className="pt-2">
            <Link
              href="/planner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-background bg-brand-cyan hover:bg-brand-cyan/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
