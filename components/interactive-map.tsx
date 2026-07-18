"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location, FoodPlace } from "@/types/planner";

interface InteractiveMapProps {
  origin: Location | null;
  destination: Location | null;
  routeGeometry?: [number, number][];
  foodPlaces?: FoodPlace[];
}

// Custom Leaflet Icons styled with Tailwind classes (using L.divIcon to avoid broken asset URL issues)
const createCustomIcon = (bgClass: string, pingBgClass: string, glowClass: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="relative w-8 h-8 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
        <div class="absolute w-6 h-6 rounded-full ${pingBgClass} animate-ping"></div>
        <div class="w-4 h-4 rounded-full ${bgClass} border-2 border-slate-900 shadow-[0_0_12px_${glowClass}]"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createFoodIcon = () => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="relative w-6 h-6 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
        <div class="w-3 h-3 rounded-full bg-orange-400 border border-slate-900 shadow-[0_0_8px_rgba(251,146,60,0.6)]"></div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const originIcon = createCustomIcon("bg-brand-cyan", "bg-brand-cyan/20", "rgba(0,242,254,0.6)");
const destIcon = createCustomIcon("bg-brand-blue", "bg-brand-blue/20", "rgba(79,172,254,0.6)");
const foodIcon = createFoodIcon();

// Map controller to adjust view dynamically
function MapController({
  origin,
  destination,
  routeGeometry
}: {
  origin: [number, number] | null;
  destination: [number, number] | null;
  routeGeometry?: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    if (routeGeometry && routeGeometry.length > 0) {
      map.fitBounds(routeGeometry, {
        padding: [60, 60],
        maxZoom: 15,
        animate: true,
        duration: 1.5,
      });
    } else if (origin && destination) {
      map.fitBounds([origin, destination], {
        padding: [60, 60],
        maxZoom: 15,
        animate: true,
        duration: 1.5,
      });
    } else if (origin) {
      map.setView(origin, 14, {
        animate: true,
        duration: 1.0,
      });
    } else if (destination) {
      map.setView(destination, 14, {
        animate: true,
        duration: 1.0,
      });
    }
  }, [origin, destination, routeGeometry, map]);

  return null;
}

export default function InteractiveMap({ origin, destination, routeGeometry, foodPlaces = [] }: InteractiveMapProps) {
  // Default coordinates centered on London King's Cross
  const defaultCenter: [number, number] = [51.5309, -0.1233];
  const defaultZoom = 13;

  const originCoords: [number, number] | null = origin
    ? [origin.lat, origin.lng]
    : null;
  const destCoords: [number, number] | null = destination
    ? [destination.lat, destination.lng]
    : null;

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
        className="w-full h-full"
        style={{ background: "#05070a" }}
      >
        {/* Dark theme tile layers from CartoDB */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={20}
        />

        {/* Origin Marker */}
        {originCoords && (
          <Marker position={originCoords} icon={originIcon}>
            <Popup className="custom-popup">
              <div className="p-2 text-xs font-semibold text-slate-800">
                <span className="text-brand-cyan uppercase block text-[9px] font-bold">Origin</span>
                {origin?.name}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destCoords && (
          <Marker position={destCoords} icon={destIcon}>
            <Popup className="custom-popup">
              <div className="p-2 text-xs font-semibold text-slate-800">
                <span className="text-brand-blue uppercase block text-[9px] font-bold">Destination</span>
                {destination?.name}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Food Places Markers */}
        {foodPlaces.map((food) => (
          <Marker key={food.id} position={food.coordinate} icon={foodIcon}>
            <Popup className="custom-popup">
              <div className="p-2 text-xs font-semibold text-slate-800">
                <span className="text-orange-500 uppercase block text-[9px] font-bold">{food.category}</span>
                {food.name}
                <span className="block mt-1 text-[10px] font-normal text-slate-600">{food.description}</span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Connecting route polyline (OSRM or straight line) */}
        {routeGeometry && routeGeometry.length > 0 ? (
          <Polyline
            positions={routeGeometry}
            pathOptions={{
              color: "#00F2FE",
              weight: 4,
              opacity: 0.9,
            }}
          />
        ) : originCoords && destCoords ? (
          <Polyline
            positions={[originCoords, destCoords]}
            pathOptions={{
              color: "#00F2FE",
              weight: 3,
              dashArray: "6, 8",
              opacity: 0.8,
            }}
          />
        ) : null}

        {/* Map state synchronizer */}
        <MapController origin={originCoords} destination={destCoords} routeGeometry={routeGeometry} />
      </MapContainer>
    </div>
  );
}
