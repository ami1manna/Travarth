// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons not showing in some builds
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({location,lat, long}) => {
  const place = {
    name:location.split(',')[0].trim(),
    coords: [lat, long],
    description: "Historic monument in Mumbai",
    zoom: 16
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={place.coords} zoom={place.zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
/>

        <Marker position={place.coords}>
          <Popup>
            <b>{place.name}</b><br />{place.description}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
