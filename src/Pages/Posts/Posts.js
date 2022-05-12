import React from 'react';
import Box from "@mui/material/Box";
import {Container, Grid, Tab, Tabs, ToggleButton, ToggleButtonGroup} from "@mui/material";
import PostsCardVertical from "../../Components/card/posts/PostsCardVertical";
import CustomAnimatedComponent from "../../Components/motion/CustomAnimatedComponent";
import PostsCardHorizontal from "../../Components/card/posts/PostsCardHorizontal";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import SearchField from "../../Components/search/SearchField";
import {GridViewRounded, TableRowsRounded} from "@mui/icons-material";
import useAuth from "../../AuthConfig/useAuth";

function TabPanel(props) {
    return null;
}

TabPanel.propTypes = {
    index: PropTypes.number,
    value: PropTypes.number,
    children: PropTypes.node
};

const DataTableGridView = () =>{
    return <Grid container item justifyContent={"space-evenly"}>
        <Grid item xs={10} style={{marginBottom:50}}>
            <CustomAnimatedComponent whileHover={{scale:1.02}} style={{
                display: "flex",
                alignItems: "center"
            }}>
                {/*<PostsCardVertical/>*/}
                <PostsCardHorizontal/>
            </CustomAnimatedComponent>
        </Grid>

        <Grid item xs={10} style={{marginBottom:50}}>
            <CustomAnimatedComponent whileHover={{scale:1.02}} style={{
                display: "flex",
                alignItems: "center"
            }}>
                {/*<PostsCardVertical/>*/}
                <PostsCardHorizontal/>
            </CustomAnimatedComponent>
        </Grid>

        <Grid item xs={10} style={{marginBottom:50}}>
            <CustomAnimatedComponent whileHover={{scale:1.02}} style={{
                display: "flex",
                alignItems: "center"
            }}>
                {/*<PostsCardVertical/>*/}
                <PostsCardHorizontal/>
            </CustomAnimatedComponent>
        </Grid>

    </Grid>
}

const DataGridView = () =>{
    return <Grid container item justifyContent={"space-around"}>
        <Grid item xs={12} sm={8} md={5.5} lg={3.5} xl={2.75} style={{marginBottom:30, marginLeft:15, marginRight:15}}>
            <CustomAnimatedComponent whileHover={{scale:1.02}} style={{
                display: "flex",
                alignItems: "center"
            }}>
                <PostsCardVertical/>
            </CustomAnimatedComponent>
        </Grid>
        <Grid item xs={12} sm={8} md={5.5} lg={3.5} xl={2.75} style={{marginBottom:30, marginLeft:15, marginRight:15}}>
            <CustomAnimatedComponent whileHover={{scale:1.02}} style={{
                display: "flex",
                alignItems: "center"
            }}>
                <PostsCardVertical/>
            </CustomAnimatedComponent>
        </Grid>

        <Grid item xs={12} sm={5.5} md={5.5} lg={3.5} xl={2.75} style={{marginBottom:30, marginLeft:15, marginRight:15}}>
            <CustomAnimatedComponent whileHover={{scale:1.02}} style={{
                display: "flex",
                alignItems: "center"
            }}>
                <PostsCardVertical/>
            </CustomAnimatedComponent>
        </Grid>

        <Grid item xs={12} sm={5.5} md={5.5} lg={3.5} xl={2.75} style={{marginBottom:30, marginLeft:15, marginRight:15}}>
            <CustomAnimatedComponent whileHover={{scale:1.02}} style={{
                display: "flex",
                alignItems: "center"
            }}>
                <PostsCardVertical/>
            </CustomAnimatedComponent>
        </Grid>
        </Grid>

}

function Posts(props) {
    const [value, setValue] = React.useState(0);
    const [view, setView] = React.useState('list');

    const handleChangeSelect = (event, nextView) => {
        setView(nextView);
    };
    const auth = useAuth();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const post = {
    id: 5,
    title:"Title",
    shortDescription: "Sort description",
    createdDate: "2022-02-09",
    picture: "picture",
    description: "Description"
    }

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
        <Box style={{backgroundColor:"rgb(242, 245, 249)"}}>
            <Grid container xs={12} display={"flex"} justifyContent={"center"} flexDirection={"row"} alignSelf={"center"}>
                <Grid item xs={12} container justifyContent={"center"} marginBottom={3}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Main" style={{textTransform: "none"}} {...a11yProps(0)} />
                        <Tab label="Popular" style={{textTransform: "none"}} {...a11yProps(1)} />
                        {auth.user ? <Tab label="Favorite" style={{textTransform: "none"}} {...a11yProps(2)} /> : null}
                    </Tabs>
                </Grid>

                <Grid item xs={12}>
                    <Container maxWidth={"md"} style={{display:"flex"}}  flexdirection={"row"}>
                        <Grid item xs={10}>
                            <SearchField  />
                        </Grid>
                        <Grid item display={"flex"} flexdirection={"row"} justifyContent={"center"} alignItems={"center"} xs={2}>
                            <ToggleButtonGroup
                                value={view}
                                exclusive
                                onChange={handleChangeSelect}
                            >
                                <ToggleButton value="list" aria-label="list">
                                    <TableRowsRounded />
                                </ToggleButton>
                                <ToggleButton value="module" aria-label="module">
                                    <GridViewRounded />
                                </ToggleButton>
                            </ToggleButtonGroup>
                            {/*<ButtonGroup variant="outlined" orientation="vertical" aria-label="outlined button group">*/}
                            {/*    <Button onClick={()=>setSelected(true)}>*/}
                            {/*        {*/}
                            {/*            selected ?  : <TableRowsOutlined/>*/}
                            {/*        }*/}

                            {/*    </Button>*/}
                            {/*    <Button onClick={()=>setSelected(false)}>*/}
                            {/*        {*/}
                            {/*            selected ?  : <GridViewRounded/>*/}
                            {/*        }*/}
                            {/*    </Button>*/}
                            {/*</ButtonGroup>*/}
                        </Grid>

                    </Container>
                </Grid>
                <TabPanel value={value} index={0}>
                    {
                        view ==="list" ? DataTableGridView() : DataGridView()
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {
                        view ==="list" ? DataTableGridView() : DataGridView()
                    }
                </TabPanel>
                <TabPanel value={value} index={2}>
                </TabPanel>


            </Grid>
        </Box>
    );
}

export default Posts;