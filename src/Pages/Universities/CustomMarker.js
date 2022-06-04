import React, {useState} from 'react';
import {InfoWindow, Marker} from "@react-google-maps/api";
import Typography from "@mui/material/Typography";
import UniversityCardMain from "../../Components/card/UniversityCardMain";

function CustomMarker({university, position}) {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <Marker
            icon={"https://cdn-icons-png.flaticon.com/64/6985/6985071.png"}
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={position}
            onClick={()=>setIsVisible(prevState => !prevState)}
        >
            {isVisible && <InfoWindow onCloseClick={()=>setIsVisible(prevState => !prevState)} position={{lat: 43.25582721809071, lng: 76.94323875469979}}>
                <Typography>
                    <UniversityCardMain university={university} />
                </Typography>
            </InfoWindow>}

        </Marker>
    );
}

export default CustomMarker;