import React from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {InfoOutlined} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Tooltip, tooltipClasses} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#e9f0f5',
        color: 'rgb(45, 62, 74)',
        maxWidth: 600,
        padding:15,
        fontSize: theme.typography.pxToRem(20),
        border: '1px solid #dadde9',
        borderRadius:15
    },
}));

function TestCard(props) {

    const navigate = useNavigate();

    const {test} = props

    return (
        <Paper variant={"elevation"} elevation={3} style={{
            borderRadius: 15,
            boxShadow: "rgb(140 152 164 / 25%) 0px 3px 6px 0px",
            marginBottom:40
        }}
               square={true}>
            <Box display={"flex"} flexDirection={"row"} height={"350px"}>
                <Box style={{
                    padding: "20px 15px 15px 25px",width:"100%"
                }} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                    <Box>

                    <Box display={"flex"}  flexDirection={"row"} justifyContent={"space-between"} marginBottom={1}
                    >
                    <Typography variant={"h5"} fontFamily={"Inter"}
                                >
                        <Link to={`/tests/${test.id}`} style={{
                            color: "rgb(45, 62, 74)",
                            fontSize: 25,
                            fontWeight: "bold",
                            textTransform:"none",
                            textDecoration:"none"
                        }}>
                            {test.name}
                        </Link>

                    </Typography>

                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Tooltip with HTML</Typography>
                                    {test.instruction}
                                </React.Fragment>
                            }
                        >
                            <IconButton style={{padding:0}} color="primary" aria-label="add an alarm">
                                <InfoOutlined/>
                            </IconButton>
                        </HtmlTooltip>
                </Box>
                    <Box >
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{color: "rgb(45, 62, 74)", fontSize: 16}}>
                            {test.description}
                            AnyBlob or Blob to create a field of the “any” binary type;
                            ImageBlob to create a field meant to be an image.
                            TextBlob to create a field for a CLOB (long text).
                            And you can create as many DataTypes as you like.
                            AnyBlob or Blob to create a field of the “any” binary type;
                            ImageBlob to create a field meant to be an image.
                            TextBlob to create a field for a CLOB (long text).
                            And you can create as many DataTypes as you like.
                            AnyBlob or Blob to create a field of the “any” binary type;
                            ImageBlob to create a field meant to be an image.
                            TextBlob to create a field for a CLOB (long text).
                            And you can create as many DataTypes as you like.


                        </Typography>
                    </Box>

                    </Box>
                    <Box>
                        <Button id={"primary_button_outlined"} size={"large"} type={"button"}
                                onClick={() => navigate(`/tests/${test.id}`)} variant="outlined"
                                fontFamily={"Inter"}>More</Button>
                    </Box>
            </Box>
                <Box style={{height: "inherit"}}>
                    <img style={{borderTopRightRadius: 8, borderBottomRightRadius: 8, height: "inherit"}}
                         src={test.picture}/>
                </Box>

        </Box>
</Paper>
)
    ;
}

export default TestCard;


