'use client';

import { MapContainer, TileLayer, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

const fakeRegions = [
  {
    type: 'Feature',
    properties: {
      name: 'Troms',
      dangerLevel: 3,
      info: 'Heavy snow expected.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [18.9, 69.6],
        [19.2, 69.6],
        [19.2, 69.8],
        [18.9, 69.8],
        [18.9, 69.6],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Lofoten',
      dangerLevel: 1,
      info: 'Low avalanche risk.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [13.5, 68.1],
        [13.9, 68.1],
        [13.9, 68.3],
        [13.5, 68.3],
        [13.5, 68.1],
      ]],
    },
  },
];

const getColor = (level: number) => {
  if (level <= 1) return 'green';
  if (level === 2) return 'yellow';
  return 'red';
};

export default function Map() {
  const [selected, setSelected] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<L.LatLng | null>(null);

  const onEachRegion = (feature: any, layer: L.Layer) => {
    layer.on({
      click: (e) => {
        setPopupPosition(e.latlng); // Set the position of the popup where the user clicked
        setSelected(feature.properties);
      },
    });
  };

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.dangerLevel),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  });

  return (
    <div className="h-full w-full">
      <MapContainer center={[68.5, 15]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON data={fakeRegions as any} style={style} onEachFeature={onEachRegion} />

        {/* Render the popup if a region is selected */}
        {selected && popupPosition && (
          <Popup position={popupPosition}>
            <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
              <h3 className="font-bold text-lg text-gray-800">{selected.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{selected.info}</p>
              <p className="mt-2 text-sm text-gray-500">Danger level:
                <span
                  className={`font-semibold ${selected.dangerLevel <= 1
                      ? 'text-green-500'
                      : selected.dangerLevel === 2
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                >
                  {selected.dangerLevel}
                </span>
              </p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}
