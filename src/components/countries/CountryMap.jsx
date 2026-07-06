import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './CountryMap.css'

export function CountryMap({ country }) {
  const coordinates = country.capitalCoordinates
  const center = coordinates ? [coordinates.lat, coordinates.lng] : [20, 0]
  const zoom = coordinates ? 6 : 2

  return (
    <MapContainer
      className="country-map"
      center={center}
      key={country.id}
      zoom={zoom}
      fadeAnimation={false}
      markerZoomAnimation={false}
      scrollWheelZoom
      zoomAnimation={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {coordinates && (
        <CircleMarker
          center={center}
          pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.8 }}
          radius={10}
        >
          <Popup>
            <strong>{country.name}</strong>
            <br />
            Capital: {country.capital}
          </Popup>
        </CircleMarker>
      )}
    </MapContainer>
  )
}
