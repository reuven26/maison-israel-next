'use client'

import { MapContainer, TileLayer, Circle, Marker, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* ── Coordinates lookup (ville → quartier → [lat, lng]) ──── */
type LatLng = [number, number]

const COORDS: Record<string, { default: LatLng; [q: string]: LatLng }> = {
  // Supabase dbVille values
  'Tel Aviv': {
    default:           [32.0853, 34.7818],
    'Neve Tzedek':     [32.0596, 34.7650],
    'Florentin':       [32.0612, 34.7726],
    'Rothschild':      [32.0665, 34.7748],
    'Old North':       [32.0875, 34.7770],
    'Vieux Nord':      [32.0875, 34.7770],
    'Jaffa':           [32.0515, 34.7502],
    'Ramat Aviv':      [32.1135, 34.8020],
    'Dizengoff':       [32.0749, 34.7741],
    'Sarona':          [32.0699, 34.7886],
  },
  'Jérusalem': {
    default:              [31.7683, 35.2137],
    'Réhavia':            [31.7741, 35.2060],
    'German Colony':      [31.7622, 35.2186],
    'Musrara':            [31.7831, 35.2270],
    'Talbiyeh':           [31.7737, 35.2130],
    'Vieille Ville':      [31.7767, 35.2345],
    'Old City':           [31.7767, 35.2345],
    'Ein Kerem':          [31.7642, 35.1553],
    'Katamon':            [31.7611, 35.2065],
  },
  'Herzliya Pituah': {
    default:                     [32.1655, 34.7995],
    'Pointe de Herzliya':        [32.1606, 34.7900],
    'Quartier des Ambassades':   [32.1670, 34.8015],
    "Sha'ar HaYam":              [32.1640, 34.7960],
    'Herzliya B':                [32.1595, 34.8055],
  },
  'Netanya': {
    default:             [32.3296, 34.8596],
    'Centre-Ville':      [32.3296, 34.8596],
    'Ir Yamim':          [32.3190, 34.8553],
    'Poleg':             [32.2982, 34.8530],
    'Ramat Poleg':       [32.2960, 34.8560],
    'Nitza':             [32.3380, 34.8530],
    'Kikar HaAtzmaut':   [32.3310, 34.8565],
  },
  'Hadera': {
    default:             [32.4340, 34.9196],
    'Givat Olga':        [32.4530, 34.8865],
    'Givat Olga ':       [32.4530, 34.8865],
    'Bord de Mer':       [32.4555, 34.8830],
  },
  'Caesarea': {
    default: [32.4991, 34.8938],
  },
  'Césarée': {
    default:               [32.5012, 34.8950],
    'Césarée Aleph':       [32.5012, 34.8903],
    'Quartier du Golf':    [32.4920, 34.9010],
    'Bord de Mer':         [32.5060, 34.8875],
  },
  'Savyon': {
    default:          [32.0533, 34.8742],
    'Vieux Savyon':   [32.0540, 34.8730],
    'Nouveau Savyon': [32.0490, 34.8780],
    'Ganei Yehuda':   [32.0610, 34.8800],
    'Neve Savyon':    [32.0560, 34.8695],
  },
  'Tel Aviv-Yafo': {
    default:         [32.0553, 34.7618],
    'Neve Tzedek':   [32.0596, 34.7650],
    'Florentin':     [32.0612, 34.7726],
    'Jaffa':         [32.0515, 34.7502],
  },
}

function getCoords(ville: string, quartier?: string | null): LatLng {
  const city = COORDS[ville]
  if (!city) return [32.0853, 34.7818] // default → Tel Aviv
  if (quartier && city[quartier]) return city[quartier]
  return city.default
}

/* ── Props ───────────────────────────────────────────────── */
interface Props {
  ville: string
  quartier?: string | null
  locale: string
  isRTL: boolean
}

export default function PropertyMapInner({ ville, quartier, locale, isRTL }: Props) {
  const center = getCoords(ville, quartier)
  const zoom = quartier ? 15 : 13

  const approxLabel =
    locale === 'he' ? 'מיקום משוער' :
    locale === 'en' ? 'Approximate location' :
    'Emplacement approximatif'

  const sectionLabel =
    locale === 'he' ? 'מיקום הנכס' :
    locale === 'en' ? 'Property Location' :
    'Emplacement du Bien'

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Section heading */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: isRTL ? '0' : '0.3em', textTransform: isRTL ? 'none' : 'uppercase', color: '#C8A96E', marginBottom: '0.6rem' }}>
          {quartier ? `${quartier} · ${ville}` : ville}
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#FAFAF9', marginBottom: '0' }}>
          {sectionLabel}
        </h2>
      </div>

      {/* Map */}
      <div style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.15)' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
          style={{ height: '420px', width: '100%', background: '#0E0F11' }}
        >
          {/* Mapbox Dark v11 — cinematic monochromatic luxury */}
          <TileLayer
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''}`}
            tileSize={512}
            zoomOffset={-1}
          />
          <ZoomControl position="bottomright" />

          {/* Pulse circle (approximate zone) */}
          <Circle
            center={center}
            radius={220}
            pathOptions={{
              color: '#C8A96E',
              fillColor: '#C8A96E',
              fillOpacity: 0.12,
              weight: 1.5,
              opacity: 0.5,
            }}
          />

          {/* Gold centre dot */}
          <Marker
            position={center}
            icon={L.divIcon({
              html: `
                <div style="position:relative;width:24px;height:24px">
                  <div style="position:absolute;inset:0;border-radius:50%;background:rgba(200,169,110,0.28);animation:prop-pulse 2s ease-out infinite"></div>
                  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#C8A96E;border:2px solid rgba(250,248,244,0.85);box-shadow:0 0 12px rgba(200,169,110,0.7)"></div>
                </div>`,
              className: '',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })}
          />
        </MapContainer>

        {/* Cinematic vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 400, boxShadow: 'inset 0 0 100px 16px rgba(8,8,10,0.55)' }} />

        <style>{`
          @keyframes prop-pulse {
            0%   { transform: scale(0.5); opacity: 0.9; }
            100% { transform: scale(2.6); opacity: 0; }
          }
          .leaflet-control-attribution {
            background: rgba(8,8,10,0.6) !important;
            color: rgba(250,248,244,0.3) !important;
            font-size: 9px !important;
          }
          .leaflet-control-attribution a { color: rgba(200,169,110,0.5) !important; }
          .leaflet-control-zoom a {
            background: rgba(22,23,26,0.85) !important;
            color: #C8A96E !important;
            border-color: rgba(212,184,136,0.2) !important;
            backdrop-filter: blur(8px);
          }
          .leaflet-control-zoom a:hover {
            background: rgba(200,169,110,0.18) !important;
            color: #FAF8F4 !important;
          }
        `}</style>
      </div>

      {/* Disclaimer */}
      <p style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: '#8A8B91', letterSpacing: isRTL ? '0' : '0.04em', textAlign: isRTL ? 'right' : 'left' }}>
        ✦ {approxLabel}
      </p>
    </div>
  )
}
