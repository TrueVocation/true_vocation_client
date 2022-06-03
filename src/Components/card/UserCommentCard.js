import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Grid, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit, MoreVert, Remove} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../../AuthConfig/useAuth";
import {If, Show} from 'react-haiku';
import {alpha, styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {useSnackbar} from "notistack";


const options = [
    'Delete',
    'Update',
];

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function UserCommentCard({comment, setIsOk, isOk}) {
    const {user} = useAuth();
    const [avatar, setAvatar] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editState, setEditState] = useState(false);
    const [commentText, setCommentText] = useState(comment?.text)
    const {enqueueSnackbar} = useSnackbar();
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEdit = () => {
        setAnchorEl(null);
        setEditState(prevState => !prevState)
    };

    const handleDelete = () => {
        setAnchorEl(null);
        deleteComment(comment?.id)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setEditState(prevState => !prevState)
    };

    async function fetchUserImage(user) {
        try {
            let jwtToken = localStorage.getItem("token");
            const url = new URL(`${API_BASE}/account/viewAvatar/${user?.id}`);
            url.searchParams.set("url", user?.imageUrl)
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200) {
                const contentType = response.headers['content-type']
                console.log(response.headers)
                setAvatar(`data:${contentType};base64,` + response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function deleteComment(id) {
        try {
            const url = new URL(`${API_BASE}/comments/${id}`);
            let jwtToken = localStorage.getItem("token");
            const response = await axios.delete(url.toString(), {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            if (response.status === 204) {
                setIsOk(!isOk)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function updatePostComment() {
        if (user === null) {
            enqueueSnackbar(`You are not authorized.Please login to add comments!`, {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
            setCommentText('')
        } else {
            try {
                let jwtToken = localStorage.getItem("token");
                const url = new URL(`${API_BASE}/comments/post`);
                const data = {
                    id: comment?.id,
                    text: commentText
                }
                const response = await axios.post(url.toString(), data, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                });
                if (response.status === 200) {
                    setIsOk(prevState => !prevState)
                    setCommentText('')
                    setEditState(prevState => !prevState)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        fetchUserImage(comment?.userDTO);
        setCommentText(comment?.text);
    }, [comment])

    return (
        <Grid container display={"flex"} flexdirection={"row"} marginBottom={5}>
            <Grid item xs={2.5} sm={2} md={1.5} lg={1.4}>
                <Avatar sx={{height: 70, width: 70}} src={avatar}/>
            </Grid>
            <Grid item flexdirection={"column"} xs={8} sm={9} md={9.5} lg={9.2} style={{paddingTop: 5}}>
                <Show>
                    <Show.When isTrue={editState}>
                        <Grid container flexdirection={"row"}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    value={commentText}
                                    onChange={(e)=>setCommentText(e.target.value)}
                                    id="outlined-multiline-flexible"
                                    label="Edit your comment here..."
                                    multiline
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid item xs={12} display={"flex"} justifyContent={"end"} mt={1}>
                                <Button id={"primary_button_outlined"} size={"large"} onClick={updatePostComment}
                                        type={"button"} variant="outlined"
                                        fontFamily={"Inter"}>Update</Button>
                                <Button id={"warning_button"} size={"large"} onClick={handleClose}
                                        type={"button"} style={{marginLeft:10}} variant="contained"
                                        fontFamily={"Inter"}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Show.When>
                    <Show.Else>
                        <Typography variant={"h2"} style={{
                            fontSize: 17,
                            fontWeight: "600",
                            fontFamily: "Inter",
                            color: "#2d3e4a"
                        }}>
                            {`${comment?.userDTO.firstName} ${comment?.userDTO.lastName}`}
                        </Typography>
                        <Typography variant={"h3"} style={{
                            fontSize: 16,
                            fontFamily: "Inter",
                            color: "#212B36",
                            marginTop: 8
                        }}>
                            {comment?.text}
                        </Typography>
                    </Show.Else>
                </Show>

            </Grid>
            <Grid item>
                <If isTrue={user?.id === comment?.userDTO?.id}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVert/>
                    </IconButton>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleEdit}>
                            <Edit/>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                            <Delete/>
                            Delete
                        </MenuItem>

                    </StyledMenu>
                </If>
            </Grid>
        </Grid>
    );
}

export default UserCommentCard;