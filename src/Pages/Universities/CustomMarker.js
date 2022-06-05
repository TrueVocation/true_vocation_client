import React, {useState} from 'react';
import {InfoWindow, Marker} from "@react-google-maps/api";
import Typography from "@mui/material/Typography";
import UniversityCardMain from "../../Components/card/UniversityCardMain";
import {Grid} from "@mui/material";

function CustomMarker({university}) {
    const [isVisible, setIsVisible] = useState(false)
    const position = {
        lat: parseFloat(university.location.lat),
        lng: parseFloat(university.location.lng),
    }
    return (
        <Marker
            icon={"http://localhost:8080/api/static/university/college.png"}
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={position}
            onClick={()=>setIsVisible(prevState => !prevState)}
        >
            {isVisible && <InfoWindow onCloseClick={()=>setIsVisible(prevState => !prevState)} position={position}>
                <Grid style={{width:400}}>
                    <UniversityCardMain university={university} />
                </Grid>
            </InfoWindow>}

        </Marker>
    );
}

export default CustomMarker;