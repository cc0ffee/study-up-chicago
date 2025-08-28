"use client"
import { useEffect, useRef, useState } from 'react';
import Map, { MapRef, NavigationControl, Popup, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

enum PlaceType {
  library = 'library',
  cafe = 'cafe',
  campus = 'campus',
  other = 'other'
}
type Location = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    description: string;
    placeType: PlaceType;
}

export default function MapComponent() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [popUpInfo, setPopUpInfo] = useState<Location | null>();

    function handleMarkerHover(l: Location | null) {
        setPopUpInfo(l);
    }

    const mapContainer = useRef(null);
    const mapRef = useRef<MapRef>(null);
    const chicagoBounds = [
        [-88.0, 41.6], // Southwest
        [-87.5, 42.1] // Northeast
      ];

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch('/api/locations/');
                const data = await res.json();
                setLocations(data);
            } catch (err) {
                console.error("Error fetching locations:", err);
            }
        };
        fetchLocations();
    }, []);
    
    return (
        <div ref={mapContainer} className=''>
            <Map
                ref={mapRef}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
                initialViewState={{
                    longitude: -87.6298,
                    latitude: 41.8781,
                    zoom: 14,
                }}
                reuseMaps
                style={{width: '100%', height: '100vh'}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                // @ts-ignore, the bounds type is valid and compiles fine
                maxBounds={chicagoBounds}
                dragRotate={false}
            >
                {locations.map((l) => (
                    <Marker 
                        key={l.id} 
                        latitude={l.lat} 
                        longitude={l.lng} 
                        anchor="bottom"
                        >
                            <div onMouseEnter={() => handleMarkerHover(l)} onMouseLeave={() => handleMarkerHover(null)}>
                                <img width={20} height={20}   src={(() => {
                                    switch(l.placeType) {
                                        case PlaceType.cafe: return './coffee.svg';
                                        case PlaceType.library: return './library.svg';
                                        case PlaceType.campus: return './campus.svg';
                                        case PlaceType.other: return './other.svg';
                                    default: return './other.svg';
                                    }
                                })()}/>
                            </div>
                        
                    </Marker>
                ))}

                {popUpInfo && (
                    <Popup
                    anchor='top'
                    longitude={popUpInfo.lng}
                    latitude={popUpInfo.lat}
                    onClose={() => setPopUpInfo(null)}
                    >
                        <div className="text-black p-2">
                            {popUpInfo.name}
                        </div>
                    </Popup>
                )}

                <NavigationControl showCompass={false}/>
            </Map>
        </div>
    )
}