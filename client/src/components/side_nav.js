import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router-dom";

function SideNavBar(props) {
    return (
        <React.Fragment>
            <div className="navRoot" >
                <span className="hashedinLogo">
                    <span className="hashedinTitle"> 
                        Hashed
                        <span className="hashedinText">In</span>
                    </span>
                    <span className="deloitteTitle"> By Deloitte </span>
                </span>
            </div>
        </React.Fragment>
    );    
}

export default withRouter(SideNavBar);