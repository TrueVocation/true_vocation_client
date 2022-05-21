import React from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px'
};

const API_KEY = 'AIzaSyBxix7KLY3fOwuPlEQYLBIH5FPr6ihnc4Y';

const center = {
    lat: 43.23522601799928,
    lng: 76.90971490331546
};
// 43.23522601799928, 76.90971490331546
function GoogleMaps() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={1}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: 43.23522601799928, lng: 76.90971490331546}}
            />
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMaps)