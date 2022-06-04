import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Checkbox, FormControl, Grid, InputAdornment, InputLabel, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import UniversityCardMain from "../../Components/card/UniversityCardMain";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import {GridViewOutlined, LocationOnOutlined, Search} from "@mui/icons-material";
import './university.scss'
import { Show } from 'react-haiku';
import UniversityMaps from "./UniversityMaps";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";


function UniversityFilter(props) {
    const [universities, setUniversities] = useState([])
    const [displayType, setDisplayType] = useState(true);
    const [city, setCity] = React.useState('');

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    useEffect(() => {
        fetchUniversities();
    }, [])

    async function fetchUniversities() {
        try {
            const url = new URL(`${API_BASE}/universities`);
            url.searchParams.set('page', 0);
            url.searchParams.set('size', 8);
            url.searchParams.set('sort', 'id');
            url.searchParams.set('order', 'desc');
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                setUniversities(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Box sx={{backgroundColor: "rgb(242, 245, 249)"}}>
            <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}
                  style={{padding: "20px 10px 20px 10px"}}>
                <Grid item xs={12} container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}
                >
                    <Grid item xs={9.5} container display={"flex"} flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          style={{padding: "0 20px 0 20px"}}
                    >
                        <Grid item xs={2}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}>All Universities ({universities?.length})</Typography>
                        </Grid>
                        <Grid item xs={2} container display={"flex"} flexDirection={"row"}
                              justifyContent={"space-between"}>
                            <Grid item xs={5.5}>
                                <Paper onClick={()=>setDisplayType(true)} id={"hover_item"} style={{
                                    boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                                    padding: "11px 0 11px 0",
                                    borderRadius: 12,
                                    margin: "15px 0",
                                    cursor: "pointer",
                                    backgroundColor: displayType ? 'rgb(85, 105, 255)' : null,
                                }}>
                                    <Box display={"flex"} flexDirection={"row"}>
                                        <Grid item container display={"flex"} flexDirection={"row"}
                                              justifyContent={"center"}>
                                            <GridViewOutlined style={{
                                                fontSize: 25,
                                                color: displayType ? 'white' : 'rgb(99, 115, 129)',
                                            }}/>
                                            <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                                        style={{
                                                            fontSize: 16, marginLeft: 5,
                                                            color: displayType ? 'white' : 'rgb(99, 115, 129)',
                                                        }}>Card</Typography>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={5.5}>
                                <Paper onClick={()=>setDisplayType(false)} id={"hover_item"} style={{
                                    boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                                    padding: "11px 0 11px 0",
                                    borderRadius: 12,
                                    margin: "15px 0",
                                    cursor: "pointer",
                                    backgroundColor: displayType ? null : 'rgb(85, 105, 255)',
                                }}>
                                    <Box display={"flex"} flexDirection={"row"}>
                                        <Grid item container display={"flex"} flexDirection={"row"}
                                              justifyContent={"center"}>
                                            <LocationOnOutlined style={{
                                                fontSize: 25,
                                                color: displayType ? 'rgb(99, 115, 129)' : 'white',
                                            }}/>
                                            <Typography variant={"h5"} fontFamily={"Inter"} alignSelf={"center"}
                                                        style={{
                                                            fontSize: 16, marginLeft: 5,
                                                            color: displayType ? 'rgb(99, 115, 129)' : 'white',
                                                        }}>Map</Typography>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2.5} container display={"flex"} justifyContent={"center"}>
                        <Paper style={{
                            boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                            padding: "8px 0 8px 8px",
                            borderRadius: 12,
                            width: "100%",
                            margin: 15
                        }}>
                            <Box display={"flex"} flexDirection={"row"}>
                                <Grid item container display={"flex"} flexDirection={"row"}>
                                    <InputBase fullWidth
                                               id="outlined-adornment-weight"
                                               placeholder={"Search for a university..."}
                                               style={{fontSize: 16}}
                                               startAdornment={<InputAdornment position="start"
                                                                               style={{marginRight: 5}}>
                                                   <Search style={{fontSize: 24, color: "rgb(103, 119, 136)"}}/>
                                               </InputAdornment>}
                                               aria-describedby="outlined-weight-helper-text"
                                               inputProps={{
                                                   'aria-label': 'weight',
                                               }}
                                    />
                                </Grid>
                            </Box>
                        </Paper>

                    </Grid>
                </Grid>

                <Grid item xs={9.5} container display={"flex"} flexDirection={"row"}>
                    <Show>
                        <Show.When isTrue={displayType}>
                            {

                                universities?.map(universities => {
                                    return <Grid key={universities.id} item xs={4} mb={1} style={{padding: "0 5px 0 5px"}}>
                                        <UniversityCardMain university={universities}/>
                                    </Grid>
                                })
                            }
                        </Show.When>
                        <Show.Else>
                            <Grid item xs={12} style={{padding:15}}>
                                <UniversityMaps universities={universities} />
                            </Grid>
                        </Show.Else>
                    </Show>

                </Grid>
                <Grid item xs={2.5} container display={"flex"} justifyContent={"center"}>
                    <Paper variant={"elevation"} elevation={0} style={{
                        borderRadius: 12,
                        boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
                        width: "100%",
                        margin: 15,
                        padding:20
                    }}
                           square={true}>
                    <Grid container xs={12} display={"flex"} flexDirection={"row"}>
                        <Grid item xs={12} container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 22,
                                            fontWeight: "bold",
                                        }}>Filter</Typography>
                            <Chip label={"Clear All"} variant="filled" style={{
                                backgroundColor:"rgba(255, 25, 67, 0.1)",
                                color:"rgb(255, 25, 67)",
                                fontFamily:"Inter",
                                fontSize:16
                            }} />
                        </Grid>
                        <Grid item xs={12} mt={5} container display={"flex"} flexDirection={"column"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom:8
                                        }}>City</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={city}
                                    label="City"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} mt={5}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom:8
                                        }}>Status</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Private" />
                                <FormControlLabel control={<Checkbox />} label="Public" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} mt={5}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Dormitory" />
                                <FormControlLabel control={<Checkbox />} label="Military" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}


export default UniversityFilter;