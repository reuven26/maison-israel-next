'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* ── Coordinates by city ─────────────────────────────────── */
const CITY_COORDS: Record<string, {
  center: [number, number]
  zoom: number
  neighborhoods: { name: string; lat: number; lng: number }[]
}> = {
  'tel-aviv': {
    center: [32.0853, 34.7818],
    zoom: 13,
    neighborhoods: [
      { name: 'Neve Tzedek',  lat: 32.0596, lng: 34.7650 },
      { name: 'Florentin',    lat: 32.0612, lng: 34.7726 },
      { name: 'Rothschild',   lat: 32.0665, lng: 34.7748 },
      { name: 'Old North',    lat: 32.0875, lng: 34.7770 },
    ],
  },
  'jerusalem': {
    center: [31.7683, 35.2137],
    zoom: 13,
    neighborhoods: [
      { name: 'Réhavia',        lat: 31.7741, lng: 35.2060 },
      { name: 'German Colony',  lat: 31.7622, lng: 35.2186 },
      { name: 'Musrara',        lat: 31.7831, lng: 35.2270 },
      { name: 'Talbiyeh',       lat: 31.7737, lng: 35.2130 },
    ],
  },
  'herzliya-pituah': {
    center: [32.1655, 34.7995],
    zoom: 14,
    neighborhoods: [
      { name: 'Pointe de Herzliya',       lat: 32.1606, lng: 34.7900 },
      { name: 'Quartier des Ambassades',  lat: 32.1670, lng: 34.8015 },
      { name: "Sha'ar HaYam",             lat: 32.1640, lng: 34.7960 },
      { name: 'Herzliya B',               lat: 32.1595, lng: 34.8055 },
    ],
  },
  'netanya': {
    center: [32.3296, 34.8596],
    zoom: 13,
    neighborhoods: [
      { name: 'Centre-Ville',        lat: 32.3296, lng: 34.8596 },
      { name: 'Ir Yamim',            lat: 32.3190, lng: 34.8553 },
      { name: 'Poleg',               lat: 32.2982, lng: 34.8530 },
      { name: 'Kikar HaAtzmaut',     lat: 32.3310, lng: 34.8565 },
    ],
  },
}

/* ── Props ───────────────────────────────────────────────── */
interface Props {
  slug: string
  neighborhoods: { name: string; desc: { fr: string; en: string; he: string } }[]
  lang: string
  isRTL: boolean
}

export default function CityMapInner({ slug, neighborhoods, lang, isRTL }: Props) {
  const city = CITY_COORDS[slug]
  if (!city) return null

  // Merge desc text into coordinate data
  const pins = city.neighborhoods.map((c) => {
    const nb = neighborhoods.find((n) => n.name === c.name)
    return { ...c, desc: nb?.desc[lang as 'fr' | 'en' | 'he'] ?? '' }
  })

  return (
    <div style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden' }}>
      <MapContainer
        center={city.center}
        zoom={city.zoom}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: '520px', width: '100%', background: '#111214' }}
      >
        {/* Dark tile layer – CartoDB Dark Matter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <ZoomControl position="bottomright" />

        {/* City centre pulse marker */}
        <Marker
          position={city.center}
          icon={L.divIcon({
            html: `
              <div style="position:relative;width:24px;height:24px">
                <div style="position:absolute;inset:0;border-radius:50%;background:rgba(200,169,110,0.25);animation:pulse-ring 2s ease-out infinite"></div>
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#C8A96E;box-shadow:0 0 10px rgba(200,169,110,0.8)"></div>
              </div>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })}
        >
          <Popup className="city-map-popup">
            <strong style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#C8A96E' }}>
              {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </strong>
          </Popup>
        </Marker>

        {/* Neighbourhood markers */}
        {pins.map((pin) => (
          <Marker
            key={pin.name}
            position={[pin.lat, pin.lng]}
            icon={L.divIcon({
              html: `
                <div style="display:flex;flex-direction:column;align-items:center;gap:3px">
                  <div style="width:10px;height:10px;border-radius:50%;background:#C8A96E;border:2px solid rgba(255,255,255,0.35);box-shadow:0 0 6px rgba(200,169,110,0.55)"></div>
                  <div style="font-size:9px;font-family:DM Sans,sans-serif;color:#C8A96E;letter-spacing:0.04em;white-space:nowrap;background:rgba(10,10,11,0.7);padding:1px 5px;border-radius:2px">${pin.name}</div>
                </div>`,
              className: '',
              iconSize: [90, 30],
              iconAnchor: [45, 5],
            })}
          >
            <Popup className="city-map-popup">
              <div style={{ minWidth: '180px', direction: isRTL ? 'rtl' : 'ltr' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#C8A96E', marginBottom: '4px', fontWeight: 600 }}>
                  {pin.name}
                </p>
                {pin.desc && (
                  <p style={{ fontSize: '0.8rem', color: '#D4D5D8', lineHeight: 1.5, margin: 0 }}>{pin.desc}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        /* Leaflet popup dark theme */
        .city-map-popup .leaflet-popup-content-wrapper {
          background: #141416;
          border: 1px solid rgba(200,169,110,0.25);
          border-radius: 2px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          color: #FAFAF9;
        }
        .city-map-popup .leaflet-popup-tip {
          background: #141416;
        }
        .city-map-popup .leaflet-popup-close-button {
          color: #C8A96E !important;
        }
        /* Pulse animation for city centre */
        @keyframes pulse-ring {
          0%   { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        /* Hide default attribution box overlap */
        .leaflet-control-attribution {
          background: rgba(10,10,11,0.7) !important;
          color: rgba(255,255,255,0.3) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: rgba(200,169,110,0.5) !important; }
        /* Zoom buttons */
        .leaflet-control-zoom a {
          background: #141416 !important;
          color: #C8A96E !important;
          border-color: rgba(200,169,110,0.2) !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(200,169,110,0.15) !important;
        }
      `}</style>
    </div>
  )
}
