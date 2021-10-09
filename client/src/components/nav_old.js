import React, { useState } from "react";
import Logo from "../images/brllogo.png";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper/Auth";
import { endTest } from "../helper/Test";
import { Button, Modal } from "react-bootstrap";

const Nav = () => {
    const [values, setValues] = useState({
        end: false,
        error: "",
    });

    const { end, error } = values;
    const token = isAuthenticated();

    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    const handleRedirect = (event) => {
        handleClose();
        var filteredResponse = JSON.parse(localStorage.getItem("mark")).map(
            (item) => {
                return { question: item.question, response: item.response };
            }
        );
        endTest({ responses: filteredResponse })
            .then((data) => {
                if (data.err) {
                    setValues({ ...values, error: data.err });
                    handleShowError();
                } else if (data.message) {
                    setValues({ ...values, error: data.message });
                    window.location.href = "./student/feedback";
                } else if (data.error) {
                    setValues({ ...values, error: data.error });
                    handleShowError();
                } else {
                    localStorage.removeItem("time");
                    setValues({ ...values, end: true });
                }
            })
            .catch((error) => {
                return error;
            });
    };

    const errorMessage = () => {
        return (
            <>
                <Modal show={showError} onHide={handleCloseError} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Details Carefully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{error}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseError}>
                            Close
            </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showConfirmation = () => {
        return (
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Test Portal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You Sure? Once Submitted You Can Not Attempt Again.
        </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleRedirect}>
                        Yes
          </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const performRedirect = () => {
        if (end) {
            if (token) {
                return <Redirect to="/student/feedback" />;
            }
        }
        if (localStorage.getItem("questions")) {
            return <Redirect to="/student/questions" />;
        }
        if (!isAuthenticated()) {
            console.log("Nav Token" + isAuthenticated());
            return <Redirect to="/" />;
        }
    };

    const showComponent = () => {
        var questions = JSON.parse(localStorage.getItem("questions"));
        if (questions) {
            return (
                <div className="align-self-center ml-auto">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNav"
                        style={{ justifyContent: "flex-end" }}
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item m-2">
                                <button className="btn btn-primary" onClick={handleShow}>
                                    End Test
                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between p-3">
            <div className="w-100 d-flex px-3 component" style={{}}>
                <div>
                    <img src={Logo} className="navbar-brand" width="200px" alt="logo" />
                </div>
                {errorMessage()}
                {showComponent()}
                {performRedirect()}
                {showConfirmation()}
            </div>
        </nav>
    );
};

export default Nav;
