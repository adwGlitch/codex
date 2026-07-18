"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Compass,
  ArrowRightLeft,
  Loader2,
  Utensils,
  Ticket,
  X,
  Cloud
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MapWrapper from "@/components/map-wrapper";
import { searchLocations } from "@/services/geocoding";
import { Location, WeatherCondition } from "@/types/planner";
import { getRoute, RouteData } from "@/services/routing";
import { getWeather } from "@/services/weather";
import { FoodFinder } from "@/components/food-finder";
import { TicketBooking } from "@/components/ticket-booking";

type TabType = "route" | "food" | "ticket";

export default function PlannerPage() {
  // Journey state
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("route");

  // Route and Weather state
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [isRouting, setIsRouting] = useState(false);

  // Search input queries
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");

  // Search autocomplete list
  const [originSuggestions, setOriginSuggestions] = useState<Location[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<Location[]>([]);
  
  // Loading status
  const [originLoading, setOriginLoading] = useState(false);
  const [destLoading, setDestLoading] = useState(false);

  // Suggestions panel focus state
  const [showOriginPanel, setShowOriginPanel] = useState(false);
  const [showDestPanel, setShowDestPanel] = useState(false);

  // Debounced geocoding search for Origin
  useEffect(() => {
    if (originQuery.trim().length < 3) {
      setOriginSuggestions([]);
      return;
    }

    setOriginLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      const results = await searchLocations(originQuery);
      setOriginSuggestions(results);
      setOriginLoading(false);
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [originQuery]);

  // Debounced geocoding search for Destination
  useEffect(() => {
    if (destQuery.trim().length < 3) {
      setDestSuggestions([]);
      return;
    }

    setDestLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      const results = await searchLocations(destQuery);
      setDestSuggestions(results);
      setDestLoading(false);
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [destQuery]);

  // Fetch Route and Weather
  useEffect(() => {
    async function fetchRouteAndWeather() {
      if (origin && destination) {
        setIsRouting(true);
        const [route, weatherData] = await Promise.all([
          getRoute(origin, destination),
          getWeather(destination.lat, destination.lng)
        ]);
        setRouteData(route);
        setWeather(weatherData);
        setIsRouting(false);
      } else {
        setRouteData(null);
        setWeather(null);
      }
    }
    fetchRouteAndWeather();
  }, [origin, destination]);

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
    const tempLoc = origin;
    setOrigin(destination);
    setDestination(tempLoc);

    const tempQuery = originQuery;
    setOriginQuery(destQuery);
    setDestQuery(tempQuery);
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row h-[calc(100vh-64px)] relative overflow-hidden bg-background">
      
      {/* Left sidebar layout */}
      <aside className="w-full lg:w-[420px] bg-card border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col h-1/2 lg:h-full z-10 overflow-y-auto">
        
        {/* Search fields container */}
        <div className="p-6 border-b border-white/5 space-y-4 bg-black/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display">Route Planner</h2>
            <button
              onClick={swapLocations}
              className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-brand-cyan/10 hover:border-brand-cyan/30 text-slate-400 hover:text-brand-cyan transition-all duration-300"
              title="Swap Locations"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Search Inputs */}
          <div className="space-y-3 relative">
            
            {/* Origin Input */}
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-cyan" />
              <input
                type="text"
                placeholder="Enter starting location..."
                value={originQuery}
                onChange={(e) => {
                  setOriginQuery(e.target.value);
                  setShowOriginPanel(true);
                  if (e.target.value === "") setOrigin(null);
                }}
                onFocus={() => setShowOriginPanel(true)}
                className="w-full bg-black/40 border border-white/5 focus:border-brand-cyan/50 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors"
              />
              {originQuery && (
                <button
                  onClick={() => {
                    setOriginQuery("");
                    setOrigin(null);
                    setOriginSuggestions([]);
                  }}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Suggestions Panel */}
              <AnimatePresence>
                {showOriginPanel && (originSuggestions.length > 0 || originLoading) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1.5 p-2 rounded-xl bg-slate-900 border border-white/10 shadow-2xl z-20 max-h-60 overflow-y-auto"
                  >
                    {originLoading ? (
                      <div className="flex items-center justify-center py-4 gap-2 text-xs text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin text-brand-cyan" />
                        Searching database...
                      </div>
                    ) : (
                      originSuggestions.map((loc, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectOrigin(loc)}
                          className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-white border border-transparent hover:border-white/5 transition-all duration-200"
                        >
                          <span className="font-semibold block text-slate-200">{loc.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                            {loc.displayName}
                          </span>
                        </button>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Destination Input */}
            <div className="relative">
              <Navigation className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-blue" />
              <input
                type="text"
                placeholder="Enter destination..."
                value={destQuery}
                onChange={(e) => {
                  setDestQuery(e.target.value);
                  setShowDestPanel(true);
                  if (e.target.value === "") setDestination(null);
                }}
                onFocus={() => setShowDestPanel(true)}
                className="w-full bg-black/40 border border-white/5 focus:border-brand-blue/50 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors"
              />
              {destQuery && (
                <button
                  onClick={() => {
                    setDestQuery("");
                    setDestination(null);
                    setDestSuggestions([]);
                  }}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Suggestions Panel */}
              <AnimatePresence>
                {showDestPanel && (destSuggestions.length > 0 || destLoading) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1.5 p-2 rounded-xl bg-slate-900 border border-white/10 shadow-2xl z-20 max-h-60 overflow-y-auto"
                  >
                    {destLoading ? (
                      <div className="flex items-center justify-center py-4 gap-2 text-xs text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                        Searching database...
                      </div>
                    ) : (
                      destSuggestions.map((loc, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectDestination(loc)}
                          className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-white border border-transparent hover:border-white/5 transition-all duration-200"
                        >
                          <span className="font-semibold block text-slate-200">{loc.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                            {loc.displayName}
                          </span>
                        </button>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Dynamic tabs navigation */}
        <div className="flex border-b border-white/5 px-4 bg-black/10">
          {(["route", "food", "ticket"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider transition-colors relative text-center flex items-center justify-center gap-1.5 ${
                activeTab === tab ? "text-brand-cyan" : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "route" && <Compass className="w-4 h-4" />}
              {tab === "food" && <Utensils className="w-4 h-4" />}
              {tab === "ticket" && <Ticket className="w-4 h-4" />}
              {tab}
              {activeTab === tab && (
                <motion.span
                  layoutId="plannerTabBorder"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            
            {/* Route Info Tab */}
            {activeTab === "route" && (
              <motion.div
                key="route-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="p-6 space-y-4"
              >
                {!origin || !destination ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="p-4 bg-white/5 w-fit rounded-full mx-auto border border-white/5">
                      <Compass className="w-8 h-8 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">No Journey Planned</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
                        Specify both your start point and destination in the fields above to configure transit options.
                      </p>
                    </div>
                  </div>
                ) : isRouting ? (
                  <div className="flex items-center justify-center py-12">
                     <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-brand-cyan mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">Origin Point</span>
                          <p className="text-sm font-semibold text-slate-200">{origin.displayName}</p>
                        </div>
                      </div>
                      <div className="h-4 border-l border-dashed border-white/15 ml-2"></div>
                      <div className="flex items-start gap-2.5">
                        <Navigation className="w-4 h-4 text-brand-blue mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">Destination Point</span>
                          <p className="text-sm font-semibold text-slate-200">{destination.displayName}</p>
                        </div>
                      </div>
                    </div>

                    {routeData && (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-slate-400">Total Distance</span>
                          <p className="text-lg font-bold text-white mt-1">{(routeData.distance / 1000).toFixed(1)} km</p>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400">Est. Duration</span>
                          <p className="text-lg font-bold text-white mt-1">{Math.ceil(routeData.duration / 60)} min</p>
                        </div>
                      </div>
                    )}

                    {weather && (
                      <div className="p-4 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/15 space-y-2">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-4 h-4 text-brand-cyan" />
                          <h4 className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
                            Destination Weather
                          </h4>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-2xl font-bold text-white">{weather.temp}°C</p>
                            <p className="text-xs text-slate-300">{weather.type}</p>
                          </div>
                          <div className="text-right text-xs text-slate-400">
                            <p>Wind: {weather.windSpeed} km/h</p>
                            <p>Humidity: {weather.humidity}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Food Finder Tab */}
            {activeTab === "food" && (
              <motion.div
                key="food-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <FoodFinder destination={destination} />
              </motion.div>
            )}

            {/* Ticket Booking Tab */}
            {activeTab === "ticket" && (
              <motion.div
                key="ticket-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <TicketBooking hasRoute={!!routeData} price={routeData ? Math.max(2.5, (routeData.distance / 1000) * 0.15) : undefined} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </aside>

      {/* Right Map layout */}
      <section className="flex-grow h-1/2 lg:h-full relative">
        <MapWrapper origin={origin} destination={destination} routeGeometry={routeData?.geometry} />
      </section>

    </div>
  );
}
