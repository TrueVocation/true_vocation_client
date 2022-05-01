import React from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Grid, InputAdornment, OutlinedInput} from "@mui/material";
import {Search} from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";

function SearchField(props) {

    const {value, handleChange} = props;

    return (
        <Paper style={{
            boxShadow:"rgb(140 152 164 / 18%) 0px 10px 40px 10px",
            padding:16,
            borderRadius:8,
            marginBottom:32
        }}>
            <Box display={"flex"} flexDirection={"row"}>
                <Grid item container display={"flex"} flexDirection={"row"} style={{paddingTop:8,paddingBottom:8}}>
                    <InputBase fullWidth
                        id="outlined-adornment-weight"
                        placeholder={"Search..."}
                        style={{fontSize:18}}
                        value={value}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="end" style={{marginRight:10}} >
                            <Search style={{fontSize:35, color:"rgb(131, 0, 184)"}} />
                            </InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </Grid>
            </Box>
        </Paper>


    );
}

export default SearchField;