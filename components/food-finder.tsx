"use client";

import { useState, useEffect } from "react";
import { FoodPlace, Location } from "../types/planner";
import { findFoodNearLocation } from "../services/food";

interface FoodFinderProps {
  destination: Location | null;
}

export function FoodFinder({ destination }: FoodFinderProps) {
  const [places, setPlaces] = useState<FoodPlace[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      if (!destination) {
        setPlaces([]);
        return;
      }
      setLoading(true);
      const results = await findFoodNearLocation(destination);
      setPlaces(results);
      setLoading(false);
    }
    fetchFood();
  }, [destination]);

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500">
        <p>Set a destination to discover nearby dining options.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <h3 className="text-xl font-medium tracking-tight text-white mb-2">
        Dining near {destination.displayName}
      </h3>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : places.length === 0 ? (
        <p className="text-zinc-400">No restaurants found nearby.</p>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto pb-8">
          {places.map((place) => (
            <div key={place.id} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-white">{place.name}</h4>
                <span className="text-sm px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                  ★ {place.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">{place.description}</p>
              <div className="flex gap-2 mt-2 text-xs text-zinc-500">
                <span className="capitalize">{place.category}</span>
                <span>•</span>
                <span>{place.distance}m away</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
