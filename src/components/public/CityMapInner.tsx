'use client'

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* ── Coordinates + multilingual names ───────────────────── */
const CITY_COORDS: Record<string, {
  center: [number, number]
  zoom: number
  names: { fr: string; en: string; he: string }
  neighborhoods: {
    key: string          // matches CITY_DATA neighborhood.name
    names: { fr: string; en: string; he: string }
    lat: number
    lng: number
  }[]
}> = {
  'tel-aviv': {
    center: [32.0853, 34.7818],
    zoom: 13,
    names: { fr: 'Tel Aviv', en: 'Tel Aviv', he: 'תל אביב' },
    neighborhoods: [
      { key: 'Neve Tzedek',  names: { fr: 'Neve Tzedek',  en: 'Neve Tzedek',  he: 'נווה צדק'   }, lat: 32.0596, lng: 34.7650 },
      { key: 'Florentin',    names: { fr: 'Florentin',    en: 'Florentin',    he: 'פלורנטין'     }, lat: 32.0612, lng: 34.7726 },
      { key: 'Rothschild',   names: { fr: 'Rothschild',   en: 'Rothschild',   he: 'רוטשילד'      }, lat: 32.0665, lng: 34.7748 },
      { key: 'Old North',    names: { fr: 'Vieux Nord',   en: 'Old North',    he: 'צפון ישן'     }, lat: 32.0875, lng: 34.7770 },
    ],
  },
  'jerusalem': {
    center: [31.7683, 35.2137],
    zoom: 13,
    names: { fr: 'Jérusalem', en: 'Jerusalem', he: 'ירושלים' },
    neighborhoods: [
      { key: 'Réhavia',       names: { fr: 'Réhavia',           en: 'Rehavia',         he: 'רחביה'               }, lat: 31.7741, lng: 35.2060 },
      { key: 'German Colony', names: { fr: 'Colonie Allemande', en: 'German Colony',   he: 'המושבה הגרמנית'      }, lat: 31.7622, lng: 35.2186 },
      { key: 'Musrara',       names: { fr: 'Musrara',           en: 'Musrara',         he: 'מוסררה'              }, lat: 31.7831, lng: 35.2270 },
      { key: 'Talbiyeh',      names: { fr: 'Talbiyeh',          en: 'Talbiyeh',        he: 'טלביה'               }, lat: 31.7737, lng: 35.2130 },
    ],
  },
  'herzliya-pituah': {
    center: [32.1655, 34.7995],
    zoom: 14,
    names: { fr: 'Herzliya Pituah', en: 'Herzliya Pituah', he: 'הרצליה פיתוח' },
    neighborhoods: [
      { key: 'Pointe de Herzliya',      names: { fr: 'Pointe de Herzliya',      en: 'Herzliya Marina',         he: 'חוף הרצליה'           }, lat: 32.1606, lng: 34.7900 },
      { key: 'Quartier des Ambassades', names: { fr: 'Quartier des Ambassades', en: 'Embassy Quarter',         he: 'שכונת השגרירויות'     }, lat: 32.1670, lng: 34.8015 },
      { key: "Sha'ar HaYam",            names: { fr: "Sha'ar HaYam",            en: "Sha'ar HaYam",            he: 'שער הים'              }, lat: 32.1640, lng: 34.7960 },
      { key: 'Herzliya B',              names: { fr: 'Herzliya B',              en: 'Herzliya B',              he: "הרצליה ב'"            }, lat: 32.1595, lng: 34.8055 },
    ],
  },
  'netanya': {
    center: [32.3296, 34.8596],
    zoom: 13,
    names: { fr: 'Netanya', en: 'Netanya', he: 'נתניה' },
    neighborhoods: [
      { key: 'Centre-Ville',    names: { fr: 'Centre-Ville',    en: 'City Centre',        he: 'מרכז העיר'           }, lat: 32.3296, lng: 34.8596 },
      { key: 'Ir Yamim',        names: { fr: 'Ir Yamim',        en: 'Ir Yamim',           he: 'עיר ימים'            }, lat: 32.3190, lng: 34.8553 },
      { key: 'Poleg',           names: { fr: 'Poleg',           en: 'Poleg',              he: 'פולג'                }, lat: 32.2982, lng: 34.8530 },
      { key: 'Kikar HaAtzmaut', names: { fr: "Pl. de l'Indép.", en: 'Independence Sq.',   he: 'כיכר העצמאות'        }, lat: 32.3310, lng: 34.8565 },
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

  const l = lang as 'fr' | 'en' | 'he'
  const cityLabel = city.names[l]

  // Merge localised name + desc
  const pins = city.neighborhoods.map((c) => {
    const nb = neighborhoods.find((n) => n.name === c.key)
    return {
      ...c,
      label: c.names[l],
      desc: nb?.desc[l] ?? '',
    }
  })

  // Font — same as rest of site
  const labelFont = isRTL
    ? `system-ui, 'Segoe UI', Arial, sans-serif`
    : `'Cormorant Garamond', Cormorant, Georgia, serif`

  return (
    <div style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.15)' }}>
      <MapContainer
        center={city.center}
        zoom={city.zoom}
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={false}
        style={{ height: '520px', width: '100%', background: '#aad3df' }}
      >
        {/* CartoDB Voyager — same style as Barnes/Mapbox Streets */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <ZoomControl position="bottomright" />

        {/* City centre pulse marker */}
        <Marker
          position={city.center}
          icon={L.divIcon({
            html: `
              <div style="position:relative;width:28px;height:28px">
                <div style="position:absolute;inset:0;border-radius:50%;background:rgba(200,169,110,0.3);animation:pulse-ring 2s ease-out infinite"></div>
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:50%;background:#C8A96E;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>
              </div>`,
            className: '',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          })}
        >
          <Popup className="city-map-popup">
            <strong style={{ fontFamily: labelFont, fontSize: '1.05rem', color: '#9A7B42', direction: isRTL ? 'rtl' : 'ltr', display: 'block' }}>
              {cityLabel}
            </strong>
          </Popup>
        </Marker>

        {/* Neighbourhood markers */}
        {pins.map((pin) => (
          <Marker
            key={pin.key}
            position={[pin.lat, pin.lng]}
            icon={L.divIcon({
              html: `
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px;direction:${isRTL ? 'rtl' : 'ltr'}">
                  <div style="width:11px;height:11px;border-radius:50%;background:#C8A96E;border:2px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,0.25);flex-shrink:0"></div>
                  <div style="font-size:${isRTL ? '11px' : '12px'};font-family:${labelFont};color:#1A1A1A;font-weight:${isRTL ? '500' : '600'};letter-spacing:${isRTL ? '0' : '0.02em'};white-space:nowrap;background:rgba(255,255,255,0.92);padding:2px 7px;border-radius:2px;box-shadow:0 1px 4px rgba(0,0,0,0.12);line-height:1.4">${pin.label}</div>
                </div>`,
              className: '',
              iconSize: [160, 34],
              iconAnchor: [80, 5],
            })}
          >
            <Popup className="city-map-popup">
              <div style={{ minWidth: '185px', direction: isRTL ? 'rtl' : 'ltr' }}>
                <p style={{ fontFamily: labelFont, fontSize: '1.1rem', color: '#9A7B42', marginBottom: '5px', fontWeight: 600, lineHeight: 1.3 }}>
                  {pin.label}
                </p>
                {pin.desc && (
                  <p style={{ fontFamily: isRTL ? `system-ui, 'Segoe UI', Arial, sans-serif` : `'DM Sans', system-ui, sans-serif`, fontSize: '0.8rem', color: '#4A4A4A', lineHeight: 1.6, margin: 0 }}>
                    {pin.desc}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        /* Popup — light theme */
        .city-map-popup .leaflet-popup-content-wrapper {
          background: #FAFAF9;
          border: 1px solid rgba(200,169,110,0.4);
          border-radius: 3px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.15);
          color: #2D2D2D;
        }
        .city-map-popup .leaflet-popup-tip { background: #FAFAF9; }
        .city-map-popup .leaflet-popup-close-button {
          color: #9A7B42 !important;
          font-size: 16px !important;
        }

        /* Pulse */
        @keyframes pulse-ring {
          0%   { transform: scale(0.6); opacity: 0.85; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        /* Attribution */
        .leaflet-control-attribution {
          background: rgba(255,255,255,0.75) !important;
          color: rgba(0,0,0,0.35) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: rgba(154,123,66,0.7) !important; }

        /* Zoom */
        .leaflet-control-zoom a {
          background: #fff !important;
          color: #2D2D2D !important;
          border-color: rgba(0,0,0,0.15) !important;
          font-weight: 400 !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(200,169,110,0.12) !important;
          color: #9A7B42 !important;
        }
      `}</style>
    </div>
  )
}
