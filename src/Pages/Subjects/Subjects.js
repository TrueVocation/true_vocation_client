import React, {useState} from 'react';
import {Container, Grid} from "@mui/material";
import SearchField from "../../Components/search/SearchField";
import Box from "@mui/material/Box";
import CustomAnimatedComponent from "../../Components/motion/CustomAnimatedComponent";
import SubjectCard from "../../Components/card/SubjectCard";
import {DoDisturb} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

function Subjects(props) {

    const [search, setSearch] = useState("");

    const handleSearchChange = (event) =>{
        setSearch(event.target.value);
    }

    const subjects = [
        {name: "Physics", picture:"https://images.pexels.com/photos/60582/newton-s-cradle-balls-sphere-action-60582.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Math", picture:"https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "History", picture:"https://images.pexels.com/photos/36006/renaissance-schallaburg-figures-facade.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Geography", picture:"https://images.pexels.com/photos/414916/pexels-photo-414916.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name: "Chemistry", picture: "https://images.pexels.com/photos/7722797/pexels-photo-7722797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"Biology",picture:"https://images.pexels.com/photos/4916455/pexels-photo-4916455.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
        {name:"English",picture:"https://images.pexels.com/photos/970516/pexels-photo-970516.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
    ]

    const displaySubjects = subjects
            .filter(subject => subject.name.toLowerCase().includes(search.toLowerCase()))
            .map(subject => {
                return <Grid item style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                    marginBottom:20

                }}>
                    <CustomAnimatedComponent whileHover={{scale:1.04}} style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <SubjectCard subject={subject} height={300} width={300} />
                    </CustomAnimatedComponent>
                </Grid>
            })

    return (
        <Box style={{
            paddingTop:32,
            backgroundColor:"#F7F9FF",
            paddingBottom:30,
            minHeight:window.innerHeight
        }}>
            <Container maxWidth={"sm"}>
                <SearchField value={search} handleChange={handleSearchChange} />
            </Container>

            <Container maxWidth={"xl"}>
                <Grid container display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    {displaySubjects.length !== 0 ?
                    displaySubjects
                    :
                        <Grid item container flexDirection={"column"} justifyContent={"center"} marginTop={5} marginBottom={10}>
                            <Typography textAlign={"center"} variant={"h2"} fontFamily={"Inter"} fontWeight={"bold"}
                                        style={{color: "#2d3e4a", marginBottom: 10}}>Not Found 404</Typography>
                    <DoDisturb style={{fontSize:100, alignSelf:"center"}}/>
                        </Grid>
                    }
                </Grid>
            </Container>

        </Box>
    );
}

export default Subjects;