"use client";

import { useEffect, useState } from "react";

// Uses the browser's Geolocation API + OpenStreetMap's free Nominatim
// reverse-geocoding endpoint to resolve a colony/street-level label
// (no API key required). Falls back gracefully if permission is denied
// or geolocation isn't available.
export function useLocation() {
  const [label, setLabel] = useState("Detecting location...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLabel("Multan, PK");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { headers: { Accept: "application/json" } }
          );
          const data = await res.json();
          const addr = data.address ?? {};
          // Prefer colony/neighbourhood/street level over the city name.
          const local =
            addr.neighbourhood ||
            addr.suburb ||
            addr.residential ||
            addr.road ||
            addr.quarter;
          const city = addr.city || addr.town || addr.county;
          setLabel(local ? `${local}, ${city ?? ""}`.replace(/,\s*$/, "") : city || "Current location");
        } catch {
          setLabel("Multan, PK");
        } finally {
          setLoading(false);
        }
      },
      () => {
        // Permission denied or unavailable
        setLabel("Multan, PK");
        setLoading(false);
      },
      { timeout: 8000 }
    );
  }, []);

  return { label, loading };
}
