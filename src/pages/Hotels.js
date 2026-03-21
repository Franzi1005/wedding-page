import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Hotels() {
  /*   const [hotels, setHotels] = useState([]);
   */
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
  const hotels = [
    {
      name: 'Hotel NH Collection Heidelberg',
      lat: 49.40774985278626,
      lng: 8.682852387303196,
    },
    {
      name: 'Qube Hotel Bergheim',
      lat: 49.408109370283874,
      lng: 8.681441545397998,
    },
    {
      name: 'Premier Inn Heidelberg City (Zentrum)',
      lat: 49.405966188212,
      lng: 8.686087131291153,
    },
    {
      name: 'ATLANTIC Hotel Heidelberg',
      lat: 49.40341274729383,
      lng: 8.674239248177496,
    },
    {
      name: 'Hotel Bergheim41',
      lat: 49.40850007662099,
      lng: 8.68863805564746,
    },
    {
      name: 'Aparthotel Adagio Heidelberg',
      lat: 49.40341274729383,
      lng: 8.674239248177496,
    },
    {
      name: 'IntercityHotel Heidelberg',
      lat: 49.404927723460666,
      lng: 8.67438803274917,
    },
    {
      name: 'The Heidelberg Exzellenz Hotel',
      lat: 49.40494168615879,
      lng: 8.69263778271681,
    },
  ];

  return (
    <MapContainer
      center={[49.40680586873278, 8.685920470057656]}
      zoom={13.5}
      style={{ height: '400px', width: '40%' }}
    >
      <TileLayer
        attribution='© OpenStreetMap'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {hotels.map((hotel) => {
        return (
          <Marker position={[hotel.lat, hotel.lng]}>
            <Popup>{hotel.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
