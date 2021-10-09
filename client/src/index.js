import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,Slide  } from 'react-toastify';
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
// import { PublicClientApplication } from "@azure/msal-browser";
// import { msalConfig } from "./authConfig";

// import App from "./App.jsx";
// export const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
        <ToastContainer
          className="impct-toast"
          position="bottom-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
          transition={Slide}
        />
      </ThemeProvider>
  </React.StrictMode>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <React.StrictMode>
//         <App msalInstance={msalInstance}/>
//     </React.StrictMode>,
//     document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
