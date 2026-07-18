import { Location } from "../types/planner";

export interface RouteData {
  distance: number; // in meters
  duration: number; // in seconds
  geometry: [number, number][]; // Array of [lat, lng] tuples
}

export async function getRoute(origin: Location, destination: Location): Promise<RouteData | null> {
  try {
    // OSRM expects coordinates in lng,lat order
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error("Failed to fetch route");
      return null;
    }
    
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      
      // GeoJSON returns coordinates in [lng, lat] order. Leaflet expects [lat, lng].
      const geometry = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]] as [number, number]);
      
      return {
        distance: route.distance,
        duration: route.duration,
        geometry: geometry
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
}
