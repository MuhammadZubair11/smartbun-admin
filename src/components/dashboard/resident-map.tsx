
"use client";

import 'leaflet/dist/leaflet.css';
import L, { icon, Map, TileLayer as LeafletTileLayer } from 'leaflet';
import { initialResidents, type Resident } from "./residents-table";
import { useEffect, useState, useRef } from "react";

const MARKER_ICON = icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

type ResidentWithLocation = Resident & {
  position: [number, number];
};


export function ResidentMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const [residentLocations, setResidentLocations] = useState<ResidentWithLocation[]>([]);

  useEffect(() => {
    // Generate random locations for residents for demonstration purposes.
    // In a real app, this would come from a database or a live-tracking service.
    const locations = initialResidents.map(resident => ({
        ...resident,
        position: [
          34.0522 + (Math.random() - 0.5) * 0.1, // Centered around Los Angeles
          -118.2437 + (Math.random() - 0.5) * 0.1
        ] as [number, number],
      }));
    setResidentLocations(locations);
  }, []);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
        mapInstance.current = new Map(mapRef.current).setView([34.0522, -118.2437], 12);

        new LeafletTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance.current);
    }

    if(mapInstance.current && residentLocations.length > 0) {
        // Clear existing markers
        mapInstance.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapInstance.current?.removeLayer(layer);
            }
        });

        // Add new markers
        residentLocations.forEach(resident => {
            L.marker(resident.position, { icon: MARKER_ICON })
                .addTo(mapInstance.current!)
                .bindPopup(`<b>${resident.name}</b><br />Room: ${resident.room}<br />Status: ${resident.status}`);
        });
    }
    
    // Cleanup on unmount
    return () => {
        if (mapInstance.current) {
            mapInstance.current.remove();
            mapInstance.current = null;
        }
    };
  }, [residentLocations]);

  if (residentLocations.length === 0) {
    return <p>Loading resident locations...</p>;
  }
  
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
        <div ref={mapRef} className="h-full w-full rounded-lg bg-muted" />
    </div>
  );
}
