"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useMemo } from "react";
import L from "leaflet";

// Fix default marker icons
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export interface MapPoint {
  lat: number;
  lng: number;
  title: string;
}

export interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  route: MapPoint[];
}

/* -----------------------------------------
   Map fly controller (safe + guarded)
------------------------------------------ */
const MapController = ({
  center,
  zoom,
}: {
  center: { lat: number; lng: number };
  zoom: number;
}) => {
  const map = useMap();

  useEffect(() => {
    if (
      !map ||
      typeof center.lat !== "number" ||
      typeof center.lng !== "number" ||
      isNaN(center.lat) ||
      isNaN(center.lng)
    ) {
      return;
    }

    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    const distance = currentCenter.distanceTo([
      center.lat,
      center.lng,
    ]);
    const zoomDiff = Math.abs(currentZoom - zoom);

    if (distance < 10 && zoomDiff < 0.1) return;

    map.stop();
    map.flyTo([center.lat, center.lng], zoom, {
      duration: 2.5,
      easeLinearity: 0.25,
      noMoveStart: true,
    });
  }, [center.lat, center.lng, zoom, map]);

  return null;
};

/* -----------------------------------------
   Zoom listener
------------------------------------------ */
const ZoomHandler = ({
  onZoomChange,
}: {
  onZoomChange: (zoom: number) => void;
}) => {
  useMapEvents({
    zoomend(e) {
      onZoomChange(e.target.getZoom());
    },
  });
  return null;
};

/* -----------------------------------------
   Main Map Component
------------------------------------------ */
const InteractiveMap = ({ center, zoom, route }: MapProps) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);

  const polylinePositions = useMemo(
    () => route.map((p) => [p.lat, p.lng] as [number, number]),
    [route]
  );

  const showLabels = currentZoom > 9;

  return (
    <div className="w-full h-full relative isolate">
      <MapContainer
        center={[-1.2921, 36.8219]} // set ONCE
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#f0f0f0" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <ZoomHandler onZoomChange={setCurrentZoom} />
        <MapController center={center} zoom={zoom} />

        {polylinePositions.length > 0 && (
          <Polyline
            positions={polylinePositions}
            pathOptions={{
              color: "#1b3658",
              weight: 4,
              dashArray: "10, 10",
              opacity: 0.8,
            }}
          />
        )}

        {route.map((point, idx) => (
          <Marker
            key={`${idx}-${point.lat}`}
            position={[point.lat, point.lng]}
            icon={icon}
          >
            <Tooltip
              direction="top"
              offset={[0, -40]}
              permanent
              opacity={showLabels ? 1 : 0}
              className="custom-tooltip"
            >
              <span className="font-bold text-[#1b3658] text-sm">
                {point.title}
              </span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
