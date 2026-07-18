export interface Location {
  name: string;
  displayName: string;
  lat: number;
  lng: number;
}

export interface RouteSegment {
  mode: "walk" | "bus" | "metro" | "train";
  instruction: string;
  duration: number; // in minutes
  distance: number; // in meters
  coordinates: [number, number][]; // Leaflet LatLngTuple array
}

export interface JourneyOption {
  id: string;
  name: string;
  type: string;
  time: number; // total time in minutes
  walking: number; // walking time in minutes
  cost: number; // simulated price
  weatherScore: number;
  comfortScore: number;
  overallScore: number;
  explanation: string;
  segments: RouteSegment[];
}

export interface WeatherCondition {
  temp: number;
  type: string;
  windSpeed: number;
  humidity: number;
  iconName: string;
}

export interface FoodPlace {
  id: string;
  name: string;
  category: "cafe" | "restaurant" | "fastfood" | "pub";
  rating: number;
  distance: number; // distance in meters from route/destination
  description: string;
  coordinate: [number, number];
}
