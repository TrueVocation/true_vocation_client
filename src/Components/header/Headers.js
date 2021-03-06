import '../../Constants/buttons.scss'
import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {ReactComponent as Logo} from '../../images/Group 58.svg';
import {Container, Divider, Grid, useScrollTrigger} from "@mui/material";
import PropTypes from "prop-types";
import useAuth from "../../AuthConfig/useAuth";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import CustomLink from "../links/CustomLink";
import Avatar from "@mui/material/Avatar";
import {Block, Logout, School} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import CustomMenuLink from "../links/CustomMenuLink";
import {API_BASE} from "../../Constants/Constants";
import {default as axios} from "axios";
import {useEffect} from "react";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        style: {
            boxShadow: trigger ? "rgb(140 152 164 / 25%) 0px 3px 6px 0px" : "none"
        }
    });
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};


export function Headers() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [avatar, setAvatar] = React.useState('');
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const auth = useAuth();
    const navigate = useNavigate();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setAnchor(null);
    };

    const [menu, setMenu] = React.useState(null);
    const openMenu = Boolean(menu);
    const handleClickMenu = (event) => {
        setMenu(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setMenu(null);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu" alignItems={"center"}
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <HideOnScroll>
                <AppBar position={"sticky"} color={"inherit"}>
                    <Container style={{maxWidth:"none"}}>
                        <Toolbar style={{justifyContent: "space-between"}}>
                            {/*<IconButton*/}
                            {/*    size="large"*/}
                            {/*    edge="start"*/}
                            {/*    style={{color:"rgb(34, 51, 84)"}}*/}
                            {/*    aria-label="open drawer"*/}
                            {/*    sx={{ mr: 2 }}*/}
                            {/*>*/}
                            {/*    <MenuIcon />*/}
                            {/*</IconButton>*/}
                            {/*<img src={logo} width={80}/>*/}

                            <Box display={"flex"} flexDirection={"row"} sx={{flexGrow: 1}}>
                                <Link to={"/"}><Logo/></Link>
                                <Link to={"/"}
                                      style={{
                                          color: "rgb(34, 51, 84)",
                                          marginLeft: 5,
                                          fontWeight: 700,
                                          marginTop: 7,
                                          fontFamily: "Inter",
                                          fontSize: 21,
                                          textDecoration: "none",
                                          alignSelf: "center"
                                      }}>

                                    True Vocation</Link>


                                <Grid container item sx={{paddingTop: 1, marginLeft: 5}} xs={6}
                                      display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}
                                      alignItems={"center"}>
                                    <CustomLink item to={"/"}
                                                style={{color: "white", fontFamily: "Inter"}}>Home</CustomLink>
                                    {/*<CustomLink item to={"/????????????"} style={{color:"white",fontFamily:"Inter"}}>Subjects</CustomLink>*/}
                                    {/*<div className="custom_link" onClick={handleClick} style={{*/}
                                    {/*    fontFamily: "Inter",*/}
                                    {/*    cursor: "pointer",*/}
                                    {/*    textDecoration: "none",*/}
                                    {/*    fontSize: 15,*/}
                                    {/*    color: "rgb(103, 119, 136)",*/}
                                    {/*}}>Subjects*/}
                                    {/*</div>*/}

                                    <CustomLink to={"/tests/1"}
                                                style={{color: "#08262C", fontFamily: "Inter"}}>Test</CustomLink>
                                    <CustomLink to={"/universities"}
                                                style={{color: "#08262C", fontFamily: "Inter"}}>Universities</CustomLink>
                                    <CustomLink to={"/posts"}
                                                style={{color: "#08262C", fontFamily: "Inter"}}>Posts</CustomLink>
                                </Grid>
                            </Box>


                            {/*<Box flexDirection={"column"}>*/}
                            {/*    <Grid container item justifyContent={"center"}>*/}
                            {/*        <Logo />*/}
                            {/*    </Grid>*/}
                            {/*    <Grid container item flexDirection={"column"} justifyContent={"center"}>*/}
                            {/*        <Typography*/}
                            {/*            variant="h6"*/}
                            {/*            noWrap*/}
                            {/*            component="p"*/}
                            {/*            sx={{ display: { xs: 'none', sm: 'block' } }}*/}
                            {/*            style={{color:"rgb(34, 51, 84)",fontWeight:700, fontFamily:"Inter",fontSize:18, margin:0, padding:0}}*/}
                            {/*            alignSelf={"center"}*/}
                            {/*        >*/}
                            {/*            True*/}
                            {/*        </Typography>*/}
                            {/*        <Typography*/}
                            {/*            variant="body1"*/}
                            {/*            noWrap*/}
                            {/*            component="span"*/}
                            {/*            sx={{ display: { xs: 'none', sm: 'block' } }}*/}
                            {/*            style={{color:"rgb(34, 51, 84)",fontWeight:700, fontFamily:"Inter",fontSize:18, margin:0, padding:0}}*/}
                            {/*            alignSelf={"center"}*/}
                            {/*        >*/}
                            {/*            Vocation*/}
                            {/*        </Typography>*/}
                            {/*    </Grid>*/}
                            {/*</Box>*/}


                            {/*<Search style={{backgroundColor:"rgba(110, 117, 159, 0.1)"}}>*/}
                            {/*    <SearchIconWrapper>*/}
                            {/*        <SearchIcon style={{color:"rgb(34, 51, 84)"}} />*/}
                            {/*    </SearchIconWrapper>*/}
                            {/*    <StyledInputBase*/}
                            {/*        style={{color:"rgb(34, 51, 84)"}}*/}
                            {/*        placeholder="Search???"*/}
                            {/*        inputProps={{ 'aria-label': 'search' }}*/}
                            {/*    />*/}
                            {/*</Search>*/}

                            {auth.user != null ?
                                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                    {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
                                    {/*    <Badge badgeContent={4} color="error">*/}
                                    {/*        <MailIcon style={{color: "rgb(34, 51, 84)"}}/>*/}
                                    {/*    </Badge>*/}
                                    {/*</IconButton>*/}
                                    {/*<IconButton*/}
                                    {/*    size="large"*/}
                                    {/*    aria-label="show 17 new notifications"*/}
                                    {/*    color="inherit"*/}
                                    {/*>*/}
                                    {/*    <Badge badgeContent={17} color="error">*/}
                                    {/*        <NotificationsIcon style={{color: "rgb(34, 51, 84)"}}/>*/}
                                    {/*    </Badge>*/}
                                    {/*</IconButton>*/}
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleClickMenu}
                                        color="inherit"
                                    >
                                        {/*<AccountCircle style={{color: "rgb(34, 51, 84)"}}/>*/}
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                        <Avatar
                                            alt="Remy Sharp"
                                            variant={"circular"}
                                            style={{ width: 40, height: 40}}
                                            src={auth.avatar != null ? auth.avatar : null}
                                        />
                                        </StyledBadge>
                                    </IconButton>
                                </Box>
                                :
                                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}
                                     width={185}>
                                    <Button variant={"outlined"} onClick={() => navigate('/sign-in')}
                                            id={'primary_button_outlined'}>
                                        {/*<Link to={"/sign-in"} style={{textTransform:"initial",textDecoration:"none", color: "white"}}>Sign in</Link>*/}
                                        Sign in
                                    </Button>
                                    <Button variant={"contained"} onClick={() => navigate('/sign-up')}
                                            id={'primary_button'}>
                                        {/*<Link to={"/sign-up"} style={{textTransform:"initial",textDecoration:"none", color: "white"}}>Sign up</Link>*/}
                                        Sign up
                                    </Button>
                                </Box>
                            }


                            {/*<Box sx={{display: {xs: 'flex', md: 'none'}}}>*/}
                            {/*    <IconButton*/}
                            {/*        size="large"*/}
                            {/*        aria-label="show more"*/}
                            {/*        aria-controls={mobileMenuId}*/}
                            {/*        aria-haspopup="true"*/}
                            {/*        onClick={handleMobileMenuOpen}*/}
                            {/*        color="inherit"*/}
                            {/*    >*/}
                            {/*        <MoreIcon/>*/}
                            {/*    </IconButton>*/}
                            {/*</Box>*/}
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Menu
                anchorEl={anchor}
                variant={"menu"}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                onMouseLeave={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        // overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        //borderBottom: "3px solid rgb(55, 125, 255)",
                        padding: "25px 15px 10px 25px",
                        width: 550,
                        borderRadius: 6,
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 10,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'left', vertical: 'top'}}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                <Grid container xs={12} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Grid item xs={3.5} display={"flex"} flexDirection={"column"}>
                        <Grid item marginBottom={5} container justifyContent={"center"}>
                            <Grid item container flexDirection={"row"} marginBottom={1}>
                                <Avatar variant={"square"} style={{
                                    width: 26, height: 26, backgroundColor: "rgb(111, 53, 186)", borderRadius: 8
                                }}>
                                    <School fontSize={"small"}/>
                                </Avatar>
                                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"start"}
                                            style={{
                                                color: "rgb(52, 71, 103)",
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                letterSpacing: 0,
                                                alignSelf: "center",
                                            }}>
                                    True Vocation</Typography>
                            </Grid>

                            <CustomLink to={"/fwef"} style={{
                                color: "#08262C",
                                fontFamily: "Inter",
                                textAlign: "center",
                                marginBottom: 20
                            }}>Specialities</CustomLink>
                            <CustomLink to={"/fwefwe"}
                                        style={{color: "#08262C", fontFamily: "Inter"}}>Professions</CustomLink>
                        </Grid>
                        <Grid item container justifyContent={"center"}>
                            <Grid item container flexDirection={"row"} marginBottom={1}>
                                <Avatar variant={"square"} style={{
                                    width: 26, height: 26, backgroundColor: "rgb(111, 53, 186)", borderRadius: 8
                                }}>
                                    <School fontSize={"small"}/>
                                </Avatar>
                                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"start"}
                                            style={{
                                                color: "rgb(52, 71, 103)",
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                letterSpacing: 0,
                                                alignSelf: "center"
                                            }}>
                                    True Vocation</Typography>
                            </Grid>

                            <CustomLink to={"/fwef"} style={{
                                color: "#08262C",
                                fontFamily: "Inter",
                                textAlign: "center"
                            }}>Specialities</CustomLink>
                            <CustomLink to={"/fwefwe"}
                                        style={{color: "#08262C", fontFamily: "Inter"}}>Professions</CustomLink>
                        </Grid>
                    </Grid>
                    <Grid item xs={0.5} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <Divider orientation={"vertical"} variant={"fullWidth"} style={{height: "100%"}}/>
                    </Grid>

                    <Grid item xs={3.5}>
                        <Grid item container justifyContent={"center"}>
                            <Grid item container flexDirection={"row"} marginBottom={1}>
                                <Avatar variant={"square"} style={{
                                    width: 26, height: 26, backgroundColor: "rgb(111, 53, 186)", borderRadius: 8
                                }}>
                                    <School fontSize={"small"}/>
                                </Avatar>
                                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"start"}
                                            style={{
                                                color: "rgb(52, 71, 103)",
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                letterSpacing: 0,
                                                alignSelf: "center"
                                            }}>
                                    True Vocation</Typography>
                            </Grid>

                            <CustomLink to={"/fwef"} style={{
                                color: "#08262C",
                                fontFamily: "Inter",
                                textAlign: "center"
                            }}>Specialities</CustomLink>
                            <CustomLink to={"/fwefwe"}
                                        style={{color: "#08262C", fontFamily: "Inter"}}>Professions</CustomLink>
                        </Grid>
                    </Grid>
                    <Grid item xs={0.5} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <Divider orientation={"vertical"} variant={"fullWidth"} style={{height: "100%"}}/>
                    </Grid>
                    <Grid item xs={3} display={"flex"} flexDirection={"column"}>
                        <Grid item container justifyContent={"center"}>
                            <Grid item container flexDirection={"row"} marginBottom={1}>
                                <Avatar variant={"square"} style={{
                                    width: 26, height: 26, backgroundColor: "rgb(111, 53, 186)", borderRadius: 8
                                }}>
                                    <School fontSize={"small"}/>
                                </Avatar>
                                <Typography variant={"h5"} fontFamily={"Inter"} textAlign={"start"}
                                            style={{
                                                color: "rgb(52, 71, 103)",
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                letterSpacing: 0,
                                                alignSelf: "center"
                                            }}>
                                    True Vocation</Typography>
                            </Grid>

                            <CustomLink to={"/fwef"} style={{
                                color: "#08262C",
                                fontFamily: "Inter",
                                textAlign: "center"
                            }}>Specialities</CustomLink>
                            <CustomLink to={"/fwefwe"}
                                        style={{color: "#08262C", fontFamily: "Inter"}}>Professions</CustomLink>
                        </Grid>
                    </Grid>
                </Grid>
            </Menu>

            <Menu
                anchorEl={menu}
                variant={"menu"}
                id="account-menu"
                open={openMenu}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                MenuListProps={{
                    sx: {
                        padding: 0
                    }
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        // overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        //borderBottom: "3px solid rgb(55, 125, 255)",
                        width: 350,
                        padding: 0,
                        borderRadius: 3,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 10,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}

            >

                <Grid container xs={12} display={"flex"} flexDirection={"column"}>
                    <Grid container item xs={12} display={"flex"} flexDirection={"row"}
                          style={{padding: "15px 25px 20px 25px", backgroundColor: "rgba(34, 51, 84, 0.08)",
                          marginBottom:10}}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            variant={"rounded"}
                            style={{borderRadius: 8, width: 50, height: 50}}
                            src={auth.avatar != null ? auth.avatar : null}
                            sx={{width: "100%", height: "100%"}}/>


                        <Grid style={{marginLeft:10}} item xs={"auto"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                            <Typography style={{
                                fontFamily: "Inter",
                                fontSize: "17px",
                                fontWeight: "700",
                                color: "rgb(45, 62, 74)",
                            }}>
                                {auth.user !== null ?
                                    auth.user.firstname === null || auth.user.lastName == null ?
                                        auth.user.login :
                                        auth.user.firstName+" "+auth.user.lastName
                                    : ''}
                            </Typography>

                            <Typography style={{
                                fontFamily: "Inter",
                                fontSize: "15px",
                                fontWeight: "400",
                                color: "rgb(103, 119, 136)"
                            }}>
                                {auth.user != null ? auth.user.email : null}
                            </Typography>
                        </Grid>

                    </Grid>
                    <Grid container item xs={12} display={"flex"} flexDirection={"column"}
                    style={{padding:"10px 18px 14px 18px"}}>
                        <CustomMenuLink to={"/profile"}>My Account</CustomMenuLink>
                        <CustomMenuLink to={"/wefwe"}>Settings</CustomMenuLink>
                        <CustomMenuLink to={"/portfolio"}>Portfolio</CustomMenuLink>
                    </Grid>
                    <Divider style={{height:"1px", background:"rgba(34, 51, 84, 0.1)", border:0}}/>
                    <Grid container item xs={12} display={"flex"} flexDirection={"column"}
                          style={{padding:"5px 10px"}}>
                        <Button onClick={() => {
                            auth.signout(() => navigate("/"));
                        }} size={"large"} startIcon={<Logout/>} variant={"text"}  id={"menu_text_button"}>Sign out</Button>
                    </Grid>
                </Grid>


            </Menu>
        </>
    );
}
