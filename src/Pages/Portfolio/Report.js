import React, {useEffect, useState} from 'react';
import {Divider, Grid, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import useAuth from "../../AuthConfig/useAuth";
import JsPDF from "jspdf";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import {FileDownloadOutlined} from "@mui/icons-material";


const Achievement = ({achievement}) =>{
    const [image, setImage] = useState('');

    async function fetchImage() {
        try {
            let jwtToken = localStorage.getItem("token");
            const url = new URL(`${API_BASE}/achievements/viewPicture`);
            url.searchParams.set("url", achievement.picture)
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200) {
                const contentType = response.headers['content-type']
                setImage(`data:${contentType};base64,` + response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchImage()
    },[])

    return <Paper style={{
        boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
        borderRadius: 12,
        margin: "15px 0",
    }}>
        <Grid container xs={12} display={"flex"} flexDirection={"column"}>
            <Grid item xs={12}>
                <img style={{width:"100%"}} src={image}/>
            </Grid>
            <Grid container display={"flex"} flexDirection={"column"}>
                <Typography variant={"h5"} fontFamily={"Inter"}
                            style={{
                                color: "rgb(45, 62, 74)",
                                fontSize: 18,
                                marginBottom:7,
                            }}>{achievement.name}</Typography>
                <Typography variant={"h5"} fontFamily={"Inter"}
                            style={{
                                color: "rgb(45, 62, 74)",
                                fontSize: 16,
                                marginBottom:7,
                            }}>{achievement.receivedDate}</Typography>
            </Grid>
        </Grid>
    </Paper>
}

function Report({portfolio, myHobbies, myAchievements, setGenerate, generate}) {
    const [date, setDate] = useState(new Date())
    const auth = useAuth();
    const [image2, setImage2] = useState('');

    async function fetchImage(achievement) {
        try {
            let jwtToken = localStorage.getItem("token");
            const url = new URL(`${API_BASE}/achievements/viewPicture`);
            url.searchParams.set("url", achievement.picture)
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200) {
                const contentType = response.headers['content-type']
                return `data:${contentType};base64,` + response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        async function generatePdf() {
            if (!generate) {
                return
            }

            const docPdf = new JsPDF('portrait', 'pt', 'a4');

            await docPdf.html(document.querySelector('#report'))

            await Promise.all(myAchievements.map(async (item) => {
                const data = await fetchImage(item)
                docPdf.addPage()
                docPdf.setFontSize(20)
                docPdf.text("Title: " + item.name, 50, 50)
                docPdf.text("Data issue: " + date.toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }), 50, 80)
                docPdf.addImage(data, 'JPEG', 20, 100, 560, 560)
                return data
            }))


            docPdf.save('test.pdf')
            setGenerate(false)
        }

        generatePdf()
        const arr = auth.user.birthdate.split("-")
            const d = new Date(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]))
            setDate(d)
    },[generate])
    return (
        <Paper  style={{
            boxShadow: "0px 0px 12px -5px rgba(0,0,0,0.1)",
            borderRadius: 12,
            margin: "15px 0",
        }}>
            <Grid container display={"flex"} flexDirection={"row"}>
                <Grid onClick={()=>setGenerate(true)} style={{cursor:"pointer",padding: "25px 30px 0 25px"}} item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                    <Tooltip style={{fontSize:20}} title={"Export file"} placement={"bottom"} arrow>
                        <Avatar variant={"circular"} style={{
                            width: 50, height: 50, backgroundColor: "#E7E4FC"
                        }}>
                            <FileDownloadOutlined fontSize={"large"} style={{
                                color:"#604BE8"
                            }} />
                        </Avatar>
                    </Tooltip>
                </Grid>
                <Grid id={'report'} style={{ padding: "25px 30px",}} item xs={12} container display={"flex"} flexDirection={"row"}>

                <Grid item xs={12} mb={2} container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>


                    <Grid item xs={6} container display={"flex"} alignItems={"center"}>
                        <img src={"http://localhost:8080/api/static/logo.png"} width={50}/>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 23,
                                        fontWeight: "bold",
                                        marginLeft:10
                                    }}>True Vocation</Typography>
                    </Grid>
                </Grid>


                <Grid item xs={12} mb={1} container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>

                    <Grid item xs={7.7} container display={"flex"} justifyContent={"space-between"}>
                        <Grid item xs={12} marginBottom={0} display={"flex"} flexDirection={"row"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 35,
                                            fontFamily:"Inter",
                                            fontWeight: "bold",
                                            marginBottom:5,
                                        }}>{auth.user.firstName + " "+ auth.user.lastName}</Typography>
                        </Grid>

                        <Grid item xs={12} container display={"flex"} flexDirection={"row"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom:7,
                                        }}>Email: </Typography>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            marginBottom:7,
                                            marginLeft:10
                                        }}>{auth.user.email}</Typography>
                        </Grid>
                        <Grid item xs={12} container display={"flex"} flexDirection={"row"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom:7,
                                        }}>Gender: </Typography>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            marginBottom:7,
                                            marginLeft:10
                                        }}>{portfolio.gender}</Typography>
                        </Grid>

                        <Grid item xs={12} container display={"flex"} flexDirection={"row"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom:7,
                                        }}>Phone Number:</Typography>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            marginBottom:7,
                                            marginLeft:10
                                        }}>{auth.user.phoneNumber}</Typography>
                        </Grid>
                        <Divider/>
                        <Grid item xs={12} container marginBottom={1} display={"flex"} flexDirection={"row"}>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            marginBottom:7,
                                        }}>Birthdate:</Typography>
                            <Typography variant={"h5"} fontFamily={"Inter"}
                                        style={{
                                            color: "rgb(45, 62, 74)",
                                            fontSize: 18,
                                            marginBottom:7,
                                            marginLeft:10
                                        }}>{date.toLocaleDateString('en-GB', {
                                day : 'numeric',
                                month : 'long',
                                year : 'numeric'
                            })}</Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={4} display={"flex"}>
                        <Box>
                            <Avatar style={{width: "100%",height:"100%", borderRadius:10}} variant={"rounded"} alt="Travis Howard"
                                    src={auth.avatar !== null ? auth.avatar : null}/>
                        </Box>
                    </Grid>
                </Grid>

                    <Divider style={{height: 5, borderColor: "rgba(0, 0, 0, 0.12)"}}/>

                <Grid item xs={7.7}>
                    <Grid item xs={12} mb={4}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        marginBottom:7,
                                    }}>Bio</Typography>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 18,
                                        marginBottom:7,
                                    }}>{portfolio.aboutMe}</Typography>
                    </Grid>

                    <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        marginBottom:7,
                                    }}>Hobbies</Typography>
                    </Grid>

                    <Grid item xs={12} container mb={3} display={"flex"} flexDirection={"row"}>
                        {myHobbies.map(chip=>{
                            return <span
                                style={{
                                    color: "rgb(45, 62, 74)",
                                    backgroundColor:"rgb(220,220,220)",
                                    fontSize: 18,
                                    fontFamily:"Inter",
                                    fontWeight: "bold",
                                    marginBottom:7,
                                    margin:"10px 15px 10px 0",
                                    padding:10,
                                    borderBottomLeftRadius:20,
                                    borderTopLeftRadius:20,
                                    borderBottomRightRadius:20,
                                    borderTopRightRadius:20
                                }}>{chip.label}</span>
                        })}
                    </Grid>


                </Grid>

                <Grid item xs={12} mb={2} >
                    <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        marginBottom:7,
                                    }}>Schools</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            portfolio.schools?.map(school=>{
                                return  <Grid item container xs={12} display={"flex"} justifyContent={"space-between"} mb={2}>
                                    <Grid item xs={12} alignSelf={"flex-end"}>
                                        <Typography variant={"h5"} fontFamily={"Inter"}
                                                    style={{
                                                        color: "rgb(45, 62, 74)",
                                                        fontSize: 18,
                                                        marginBottom:7,
                                                    }}>{`${school.number} ${school.name}`}</Typography>
                                    </Grid>
                                </Grid>
                            })
                        }

                    </Grid>
                </Grid>


                {/* Start Languages   */}
                <Grid item xs={12} mb={2} >
                    <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        marginBottom:7,
                                    }}>Languages</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            portfolio.languages?.map(language=>{
                                return  <Grid item container xs={12} display={"flex"} justifyContent={"space-between"} mb={2}>
                                    <Grid item xs={12} alignSelf={"flex-end"}>
                                        <Typography variant={"h5"} fontFamily={"Inter"}
                                                    style={{
                                                        color: "rgb(45, 62, 74)",
                                                        fontSize: 18,
                                                        marginBottom:7,
                                                    }}>{`${language.language} - ${language.level}`}</Typography>
                                    </Grid>
                                </Grid>
                            })
                        }

                    </Grid>
                </Grid>
                {/* End Languages   */}



                </Grid>
                {/* Start Achievement */}
                <Grid item xs={12} mb={2} style={{padding:"0 25px"}}>
                    <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h5"} fontFamily={"Inter"}
                                    style={{
                                        color: "rgb(45, 62, 74)",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        marginBottom:7,
                                    }}>Achievements</Typography>
                    </Grid>
                    <Grid item xs={12} container display={"flex"} justifyContent={"space-between"}>
                        {
                            myAchievements?.map(ach=>{
                                return  <Grid item container display={"flex"} xs={12}>
                                    <Achievement achievement={ach}/>
                                </Grid>
                            })
                        }

                    </Grid>
                </Grid>
                {/* End Achievement */}
            </Grid>

        </Paper>
    );
}

export default Report;