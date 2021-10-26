import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import logo from "../images/blockchainIcon.png";
// import { IconButton } from '@material-ui/core';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router-dom";
import { Box } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  main: {
    display: "flex"
  },
  card: {
    maxWidth: 345,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#ffffff",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  round: {
    borderRadius: "50%"
  },
  icon: {
    color: "white",
  },
  title: {
    flexGrow: 1,
  },

  drawerClose: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function BackToTop(props) {
  const classes = useStyles();

  const handleLogout = () => {
    toast.success('Logout Successfully!');

    setTimeout(5000);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    props.history.push('/');

  };

  var intials, photo;
  if(localStorage.getItem("profileUrl") !== null) {
    photo = localStorage.getItem("profileUrl");
  }
  else {
    var nameArr = localStorage.getItem("name").split(" ");
    if (nameArr.length === 1) {
      intials = nameArr[0].charAt(0).toUpperCase();
    }
    else {
      intials = nameArr[0].charAt(0).toUpperCase() + nameArr[nameArr.length - 1].charAt(0).toUpperCase();
    }
  }
  var email = localStorage.getItem("email");

  // const [open, setOpen] = React.useState(false);

  const open = false
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <React.Fragment>
      <div className={classes.main}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.title}>
              <Link to="/student/dashboard">
                <img src={logo} style={{ width: "3rem", height: "3rem" }} alt="banner" />
              </Link>
            </div>
            <ul className="navbar-nav me-2 mb-2 mb-lg-0">

              <li className="nav-item dropdown">
              {photo === undefined ? <div className="nav-link  bg-primary text-light rounded-circle text-center" style={{ width: "2.5rem", height: "2.5rem", fontSize: "1.2rem" }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <p>{intials}</p>
              </div>
              :
              <img alt="profilePhoto" src={photo} className="text-light rounded-circle" style={{ width: "2.5rem", height: "2.5rem" }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              </img>}
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><span className="dropdown-item" >{email}</span></li>
                  <li><span className="dropdown-item" >Software Engineer 1</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><span className="dropdown-item" >
                    <button className="dropdown-item" onClick={handleLogout}> <ExitToAppIcon /> Logout </button></span>
                  </li>
                </ul>
              </li>
            </ul>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className="navRoot" >
            <span className="hashedinLogo">
              <span className="hashedinTitle">
                Hashed
                <span className="hashedinText">In</span>
              </span>
              <span className="deloitteTitle"> By Deloitte </span>
            </span>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Box>
            {props.children}
          </Box>
        </main>
        <Toolbar id="back-to-top-anchor" disableGutters={true} />
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
    </React.Fragment >
  );
};

export default withRouter(BackToTop);