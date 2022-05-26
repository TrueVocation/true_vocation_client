import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Grid, Pagination} from "@mui/material";
import PostsCardVertical from "../../Components/card/posts/PostsCardVertical";
import CustomAnimatedComponent from "../../Components/motion/CustomAnimatedComponent";
import PostsCardHorizontal from "../../Components/card/posts/PostsCardHorizontal";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import SearchField from "../../Components/search/SearchField";
import useAuth from "../../AuthConfig/useAuth";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import PostSmallCard from "../../Components/card/posts/PostSmallCard";

function TabPanel(props) {
    return null;
}

TabPanel.propTypes = {
    index: PropTypes.number,
    value: PropTypes.number,
    children: PropTypes.node
};


const DataGridView = (posts) => {
    return <Grid container item justifyContent={"space-around"}>
        <Grid item xs={12} sm={8} md={5.5} lg={3.5} xl={2.75}
              style={{marginBottom: 30, marginLeft: 15, marginRight: 15}}>
            {
                posts.map(post => {
                    return <CustomAnimatedComponent key={post.id} whileHover={{scale: 1.02}} style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <PostsCardVertical post={post}/>
                    </CustomAnimatedComponent>
                })
            }

        </Grid>
    </Grid>

}

function Posts(props) {
    const [value, setValue] = React.useState(0);
    const [view, setView] = React.useState('list');
    const [posts, setPosts] = useState([])

    const [pagination, setPagination] = useState(null);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [sort, setSort] = useState("id");
    const [order, setOrder] = useState("desc");

    const handleChangeSelect = (event, nextView) => {
        setView(nextView);
    };
    const auth = useAuth();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
            fetchPosts()
    }, [page])

    async function fetchPosts() {
        try {
            const url = new URL(`${API_BASE}/posts`);
            url.searchParams.set('page', page-1);
            url.searchParams.set('size', size);
            url.searchParams.set('sort', sort);
            url.searchParams.set('order', order);
            const response = await axios.get(url.toString());
            if (response.status === 200) {
                setPosts(response.data.content);
                setSize(response.data.size);
                setPagination({
                    isFirstPage: response.data.first,
                    isLastPage: response.data.last,
                    pageNumber: response.data.number+1,
                    pageSize: response.data.size,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                })
                // setPage(response.data.number);
                if(response.data.totalPages < page){
                    setPage(1)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const post = {
        id: 5,
        title: "Title",
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
        <Box style={{backgroundColor: "rgb(242, 245, 249)"}}>
            <Grid container xs={12} display={"flex"} justifyContent={"center"} flexDirection={"row"}
                  alignSelf={"center"}>
                {/*<Grid item xs={12}>*/}
                {/*    <Container maxWidth={"md"} style={{display: "flex"}} flexdirection={"row"}>*/}

                {/*        <Grid item display={"flex"} flexdirection={"row"} justifyContent={"center"}*/}
                {/*              alignItems={"center"} xs={2}>*/}
                {/*            <ToggleButtonGroup*/}
                {/*                value={view}*/}
                {/*                exclusive*/}
                {/*                onChange={handleChangeSelect}*/}
                {/*            >*/}
                {/*                <ToggleButton value="list" aria-label="list">*/}
                {/*                    <TableRowsRounded/>*/}
                {/*                </ToggleButton>*/}
                {/*                <ToggleButton value="module" aria-label="module">*/}
                {/*                    <GridViewRounded/>*/}
                {/*                </ToggleButton>*/}
                {/*            </ToggleButtonGroup>*/}
                {/*        </Grid>*/}

                {/*    </Container>*/}
                {/*</Grid>*/}
                {/*{*/}
                {/*    view === "list" ? DataTableGridView(posts, pagination) : DataGridView(posts)*/}
                {/*}*/}


                <Grid container item display={"flex"} mt={7} flexdirection={"row"} justifyContent={"center"} xs={12}>
                    <Grid xs={11} container item display={"flex"} flexdirection={"row"} justifyContent={"space-between"}>
                        <Grid container item xs={8} style={{marginBottom: 50}}>
                            <Grid item xs={12}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{color: "#2d3e4a", marginBottom: 15, fontWeight: "bold", fontSize: 20}}>
                                    Latest blogs
                                </Typography>
                                <SearchField/>
                            </Grid>
                            <Grid container item xs={12} display={"flex"} flexdirection={"row"} justifyContent={"space-between"}>
                                <Grid item xs={12} style={{marginBottom: 35}}>
                                    <CustomAnimatedComponent whileHover={{scale: 1.02}} style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <PostsCardHorizontal post={posts[0]}/>
                                    </CustomAnimatedComponent>
                                </Grid>

                                {
                                    posts.map(post => {
                                        return <Grid key={post.id} item xs={5.8} style={{marginBottom: 35}}>
                                            <CustomAnimatedComponent whileHover={{scale: 1.02}} style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <PostsCardVertical post={post}/>
                                            </CustomAnimatedComponent>
                                        </Grid>
                                    })
                                }
                            </Grid>
                            <Grid item container display={"flex"} flexdirection={"row"} justifyContent={"center"}>
                                <Pagination size={"large"}
                                            count={pagination?.totalPages}
                                            hideNextButton={pagination?.isLastPage}
                                            hidePrevButton={pagination?.isFirstPage}
                                            page={pagination?.pageNumber}
                                            onChange={(_, num)=>setPage(num)}
                                    // renderItem={(item) =>
                                    //     <PaginationItem
                                    //         component={NavLink}
                                    //         to={`/?page`}
                                    //         {...item} />
                                    // }
                                            showFirstButton
                                            showLastButton
                                />
                            </Grid>
                        </Grid>

                        <Grid container display={"flex"} flexdirection={"row"} item xs={3.7} style={{marginBottom: 30}}>
                            <Grid item xs={12}>
                                <Typography variant={"h5"} fontFamily={"Inter"}
                                            style={{color: "#2d3e4a", marginBottom: 15, fontWeight: "bold", fontSize: 20}}>
                                    News
                                </Typography>
                                {
                                    posts.map(post => {
                                        return <Grid key={post.id} item xs={12} marginBottom={2}>
                                            <PostSmallCard post={post}/>
                                        </Grid>
                                    })
                                }
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
}

export default Posts;