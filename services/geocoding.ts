import { Location } from "@/types/planner";

/**
 * Searches locations using the OpenStreetMap Nominatim Geocoding API.
 * Nominatim usage policy requires a valid User-Agent header identifying the app.
 */
export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.trim().length < 3) {
    return [];
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=5&addressdetails=1`,
      {
        headers: {
          "User-Agent": "FlowRoute-AI-Mobility-OS/1.0 (adwGlitch/codex)",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim query failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => {
      // Build a user-friendly name from parts of the address
      const addr = item.address || {};
      const primaryName =
        addr.road ||
        addr.suburb ||
        addr.neighbourhood ||
        addr.city ||
        addr.town ||
        item.name ||
        "Unnamed Place";
      
      const city = addr.city || addr.town || addr.municipality || "";
      const country = addr.country || "";
      const displayString = [primaryName, city, country]
        .filter((val) => val && val.trim().length > 0)
        .join(", ");

      return {
        name: primaryName,
        displayName: displayString || item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      };
    });
  } catch (error) {
    console.error("Geocoding service error:", error);
    return [];
  }
}
