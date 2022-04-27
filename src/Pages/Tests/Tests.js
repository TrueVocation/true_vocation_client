import React, {useState} from 'react';
import {Container, Grid} from "@mui/material";
import TestCard from "../../Components/card/TestCard";
import Box from "@mui/material/Box";
import CustomAnimatedComponent from "../../Components/motion/CustomAnimatedComponent";
import SearchField from "../../Components/search/SearchField";

function Tests(props) {
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const tests = [
        {
            id: 1,
            name: "Test",
            description: "panel Liaison value-added",
            instruction: "                                    JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same. Create a custom type (see DataType) with the editor, name it according to these conventions:\n" +
                "\n" +
                "                                    AnyBlob or Blob to create a field of the “any” binary type;\n" +
                "                                    ImageBlob to create a field meant to be an image.\n" +
                "                                    TextBlob to create a field for a CLOB (long text).\n" +
                "                                    And you can create as many DataTypes as you like.",
            picture:"https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            id: 1,
            name: "Test",
            description: "panel Liaison value-added",
            instruction: "                                    JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same. Create a custom type (see DataType) with the editor, name it according to these conventions:\n" +
                "\n" +
                "                                    AnyBlob or Blob to create a field of the “any” binary type;\n" +
                "                                    ImageBlob to create a field meant to be an image.\n" +
                "                                    TextBlob to create a field for a CLOB (long text).\n" +
                "                                    And you can create as many DataTypes as you like.",
            picture:"https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            id: 1,
            name: "Test",
            description: "panel Liaison value-added",
            instruction: "                                    JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same. Create a custom type (see DataType) with the editor, name it according to these conventions:\n" +
                "\n" +
                "                                    AnyBlob or Blob to create a field of the “any” binary type;\n" +
                "                                    ImageBlob to create a field meant to be an image.\n" +
                "                                    TextBlob to create a field for a CLOB (long text).\n" +
                "                                    And you can create as many DataTypes as you like.",
            picture:"https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            id: 1,
            name: "Test",
            description: "panel Liaison value-added",
            instruction: "                                    JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same. Create a custom type (see DataType) with the editor, name it according to these conventions:\n" +
                "\n" +
                "                                    AnyBlob or Blob to create a field of the “any” binary type;\n" +
                "                                    ImageBlob to create a field meant to be an image.\n" +
                "                                    TextBlob to create a field for a CLOB (long text).\n" +
                "                                    And you can create as many DataTypes as you like.",
            picture:"https://images.pexels.com/photos/4126705/pexels-photo-4126705.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
    ]

    return (
        <Box style={{
            backgroundColor: "#e9f0f5",
            paddingTop: 20,
            paddingBottom: 30,
            paddingLeft: 10,
            paddingRight: 10,
        }}>
            <Container maxWidth={"sm"}>
                <SearchField value={search} handleChange={handleSearchChange}/>
            </Container>
            <Container maxWidth={"xl"}>
                <Box>
                    <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        {tests.map(test =>{
                        return <Grid item xs={10}>
                            <CustomAnimatedComponent whileHover={{
                                scale: 1.02,
                                // borderLeft:"5px solid #f9b934",
                                // borderBottomLeftRadius:15,
                                // borderTopLeftRadius:15
                            }} style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <TestCard test={test} />
                            </CustomAnimatedComponent>
                        </Grid>
                        }
                        )}
                    </Grid>
                </Box>

            </Container>
        </Box>
    );
}

export default Tests;