import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
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
import SideNavBar from "./side_nav"

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  toolBar: {
    margin: "auto",
    maxWidth: 1260,
    width: "100%",
    backgroundColor: "#ffff",
    padding: "0"
  },
  appBar: {
    backgroundColor: "#ffff"
  },
  round: {
    borderRadius: "50%"
  },
  icon: {
    color: "white",
  },
  title: {
    flexGrow: 1,
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

  var nameArr = localStorage.getItem("name").split(" ");
  var intials;
  if (nameArr.length === 1) {
    intials = nameArr[0].charAt(0).toUpperCase();
  }
  else {
    intials = nameArr[nameArr.length - 1].charAt(0).toUpperCase();
  }
  var email = localStorage.getItem("email");
  return (
    <React.Fragment>
      <CssBaseline />
      <SideNavBar />
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.title}>
            <Link to="/student/dashboard">
              <img src={logo} style={{ width: "3rem", height: "3rem" }} alt="banner" />
            </Link>
          </div>
          <ul className="navbar-nav me-2 mb-2 mb-lg-0">

            <li className="nav-item dropdown">
              <div className="nav-link  bg-primary text-light rounded-circle text-center" style={{ width: "2.5rem", height: "2.5rem" }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <p>{intials}</p>
              </div>
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
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment >
  );
};

export default withRouter(BackToTop);