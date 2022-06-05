import React, {useState} from 'react'
import {GoogleMap, InfoWindow, Marker, useJsApiLoader} from '@react-google-maps/api';
import {CastForEducation, TrafficSharp} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import UniversityCardMain from "../../Components/card/UniversityCardMain";
import CustomMarker from "./CustomMarker";
import {RenderIf} from "../../Components/RenderIf";

const containerStyle = {
    width: '100%',
    height: '800px'
};

const API_KEY = 'AIzaSyBxix7KLY3fOwuPlEQYLBIH5FPr6ihnc4Y';

const center = {
    lat: 43.23522601799928,
    lng: 76.90971490331546
};

const position = {
    lat: 43.25600370123229,
    lng: 76.94322315562829
};

const position2 = {
    lat: 43.23521147886686,
    lng: 76.90973875397027
};

// 43.23522601799928, 76.90971490331546
function GoogleMaps({universities}) {
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
            zoom={14}
            onUnmount={onUnmount}
        >
            {
                universities?.map(university=>{
                   return <RenderIf isTrue={university?.location != null}>
                        <CustomMarker university={university}/>
                    </RenderIf>
                })
            }


            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMaps)