import React from 'react';
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {Grid, Tab, Tabs} from "@mui/material";
import General from "./General";

function TabPanel(props) {
    return null;
}

TabPanel.propTypes = {
    index: PropTypes.number,
    value: PropTypes.number,
    children: PropTypes.node
};


function Profile(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{padding: "25px 0 0 0"}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Box style={{backgroundColor: "rgb(242, 245, 249)"}} paddingBottom={4}>

            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}
                 style={{backgroundColor: "rgb(55, 125, 255)"}}
            >
                <Grid container display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    <Grid item xs={10} marginTop={3}>
                        <Typography variant={"h4"} fontFamily={"Inter"} fontWeight={"700"}
                                    style={{color: "white", marginBottom: 13, fontSize: "2.0243rem"}}>
                            Account settings
                        </Typography>
                        <Typography variant={"h6"} fontFamily={"Inter"} fontWeight={"500"}
                                    style={{color: "white", fontSize: "1.25rem", lineHeight: 1.6}}>
                            Change account information and settings
                        </Typography>
                    </Grid>

                    <Grid item xs={10} marginTop={3}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="General" style={{
                                textTransform: "none",
                                backgroundColor: "white",
                                color: "rgb(55, 125, 255)"
                            }} {...a11yProps(0)} />
                            <Tab label="Change Password" style={{
                                textTransform: "none",
                                backgroundColor: "white",
                                color: "rgb(55, 125, 255)"
                            }}{...a11yProps(1)} />
                        </Tabs>
                    </Grid>
                </Grid>

            </Box>


            <Grid container display={"flex"} flexDirection={"row"} justifyContent={"center"}

            >

                <Grid item xs={10}>
                    <TabPanel value={value} index={0}>
                        <General/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    </TabPanel>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Profile;