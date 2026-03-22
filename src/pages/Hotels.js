import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { translations, getLanguage } from '../i18n';
import '../styles/Hotels.css';

export default function Hotels() {
  const lang = getLanguage();
  const t = translations[lang];
  /*   const [hotels, setHotels] = useState([]);
   */
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  const weddingIcon = new L.Icon({
    iconUrl:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI0NCIgdmlld0JveD0iMCAwIDMyIDQ0Ij48cGF0aCBmaWxsPSIjZGMyNjI2IiBzdHJva2U9IiNhYTFmMWYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE2IDFjLTcuNyAwLTE0IDYuMy0xNCAxNHM2LjMgMTQgMTQgMTQgMTQtNi4zIDE0LTE0UzIzLjcgMSAxNiAxeiIvPjx0ZXh0IHg9IjE2IiB5PSIxOSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPuKdpDwvdGV4dD48L3N2Zz4=',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -44],
  });

  const hotels = [
    {
      name: 'Wedding Location (Schilling Roofbar)',
      lat: 49.40674303895697,
      lng: 8.68574880839979,
      street: 'Alte Glockengießerei 9 (8. Obergeschoss)',
      city: '69115 Heidelberg',
      website: 'https://schillingroofbar.com/',
    },
    {
      name: 'Hotel NH Collection Heidelberg',
      lat: 49.40774985278626,
      lng: 8.682852387303196,
      street: 'Bergheimer Str. 91',
      city: '69115 Heidelberg',
      website: 'https://www.nh-hotels.com/hotel/nh-collection-heidelberg',
    },
    {
      name: 'Qube Hotel Bergheim',
      lat: 49.408109370283874,
      lng: 8.681441545397998,
      street: 'Bergheimer Str. 74',
      city: '69115 Heidelberg',
      website: 'https://www.qube-hotel-heidelberg.de/',
    },
    {
      name: 'Premier Inn Heidelberg City (Zentrum)',
      lat: 49.405966188212,
      lng: 8.686087131291153,
      street: 'Rohrbacher Str. 14',
      city: '69115 Heidelberg',
      website:
        'https://www.premierinn.com/de/de/hotels/deutschland/baden-wuerttemberg/heidelberg/heidelberg-city-zentrum.html',
    },
    {
      name: 'ATLANTIC Hotel Heidelberg',
      lat: 49.40341274729383,
      lng: 8.674239248177496,
      street: 'Kurfürsten-Anlage 59',
      city: '69115 Heidelberg',
      website: 'https://atlantic-hotels.de/hotel-heidelberg',
    },
    {
      name: 'Hotel Bergheim41',
      lat: 49.40850007662099,
      lng: 8.68863805564746,
      street: 'Bergheimer Str. 41',
      city: '69115 Heidelberg',
      website:
        'https://www.guestreservations.com/de/bergheim-41-hotel-im-alten-hallenbad/booking?s=uberdashotel&utm_source=google&utm_medium=cpc&utm_campaign=22774674877&gad_source=1&gad_campaignid=22774674877&gbraid=0AAAAADiMQMb4fAmMht1h00DG5SGBIuOMd&gclid=EAIaIQobChMI6NmG-LSzkwMVirCDBx34xwu4EAAYASABEgLE0PD_BwE',
    },
    {
      name: 'Aparthotel Adagio Heidelberg',
      lat: 49.40341274729383,
      lng: 8.674239248177496,
      street: 'Kurfürsten-Anlage 59',
      city: '69115 Heidelberg',
      website:
        'https://www.adagio-city.com/de/hotel-b4s9-aparthotel-adagio-heidelberg.shtml',
    },
    {
      name: 'IntercityHotel Heidelberg',
      lat: 49.404927723460666,
      lng: 8.67438803274917,
      street: 'Kurfürsten-Anlage 1',
      city: '69115 Heidelberg',
      website: 'https://hrewards.com/de/intercityhotel-heidelberg',
    },
    {
      name: 'The Heidelberg Exzellenz Hotel',
      lat: 49.40494168615879,
      lng: 8.69263778271681,
      street: 'Kirchheimer Weg 40',
      city: '69118 Heidelberg',
      website: 'https://www.the-heidelberg.de/',
    },
  ];

  return (
    <div className='Hotels'>
      <h1>{t.hotelsTitle}</h1>
      <p className='hotels-intro'>{t.hotelsIntro}</p>

      <div className='hotels-container'>
        <div className='map-section'>
          <MapContainer
            center={[49.40680586873278, 8.685920470057656]}
            zoom={13.5}
            style={{ height: '100%', width: '100%', borderRadius: '15px' }}
          >
            <TileLayer
              attribution='© OpenStreetMap'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {hotels.map((hotel, index) => {
              const isWeddingLocation = index === 0;
              return (
                <Marker
                  key={index}
                  position={[hotel.lat, hotel.lng]}
                  icon={isWeddingLocation ? weddingIcon : new L.Icon.Default()}
                >
                  <Popup>{hotel.name}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className='hotels-list'>
          {hotels.map((hotel, index) => {
            const isWeddingLocation = index === 0;
            return (
              <div
                key={index}
                className={`hotel-card ${isWeddingLocation ? 'wedding-location' : ''}`}
              >
                {isWeddingLocation && (
                  <div className='wedding-badge'>{t.weddingVenueBadge}</div>
                )}
                <h4>{hotel.name}</h4>
                <p className='hotel-address'>{hotel.street}</p>
                <p className='hotel-address'>{hotel.city}</p>
                <a
                  href={hotel.website}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t.viewWebsite}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
