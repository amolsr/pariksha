import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { submitFeedback } from "../helper/Test";
import { Redirect } from "react-router-dom";
import NavBar from "./nav";
import { Paper, Button, Grid } from "@material-ui/core";
export default class feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      quality: "",
      loading: false,
      didRedirect: false,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.quality === "" ||
      this.state.feedback === ""
    ) {
      if (this.state.feedback === "") {
        this.setState((values) => {
          return {
            ...values,
            error: "Please Specify FeedBack!",
          };
        });
        document.getElementById("errorText").classList.add("d-block");
      }
      if (this.state.quality === "") {
        this.setState((values) => {
          return {
            ...values,
            error: "Please Specify Rating!",
          };
        });
        document.getElementById("errorText").classList.add("d-block");
      }
    } else {
      this.setState((values) => {
        return {
          ...values,
          loading: true,
        };
      });
      let states = this;
      submitFeedback({
        quality: this.state.quality,
        feedback: this.state.feedback,
      })
        .then((data) => {
          console.log("Success");
          states.setState((values) => {
            return {
              ...values,
              didRedirect: true,
            };
          });
        })
        .catch((error) => {
          return error;
        });
    }
  };

  performRedirect = () => {
    if (this.state.didRedirect) {
      return <Redirect to="/student/dashboard" />;
    }
  };

  handleChange = (name) => (event) => {
    let data = event.target.value;
    document.getElementById("errorText").classList.remove("d-block");
    this.setState((values) => {
      return {
        ...values,
        [name]: data,
      };
    });
  };

  render() {
    return (
      <>
        <NavBar>
        <Grid container alignContent="center" justifyContent="center">
          <Grid item component={Paper} style={{ padding: "2rem", marginTop: "1.5rem", textAlign: "center" }}>
            <h1>FEEDBACK</h1>
            <p>
              We would love to hear your thoughts, concerns or problems with
              anything so we can improve !
            </p>
            <p>Take a moment to fill out this form.</p>

            <h3>How Do You Rate Your Overall Experience ?</h3>

            <Grid container alignContent="center">
              <Grid item lg={4} md={4} sm={4} xs={4}>
                <input
                  onChange={this.handleChange("quality")}
                  type="radio"
                  name="exp"
                  value="Good"
                />{" "}
                Good
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={4}>
                <input
                  onChange={this.handleChange("quality")}
                  type="radio"
                  name="exp"
                  value="Average"
                />{" "}
                Average
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={4}>
                <input
                  onChange={this.handleChange("quality")}
                  type="radio"
                  name="exp"
                  value="Bad"
                />{" "}
                Bad
              </Grid>
            </Grid>
            <div className="row justify-content-center mb-5 mt-2">
              <form style={{ width: "50%" }}>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    id="Suggestion"
                    onChange={this.handleChange("feedback")}
                    value={this.state.feedback}
                    placeholder="Enter Your Suggestion"
                  ></textarea>
                  <div
                    className="invalid-feedback text-center pt-2"
                    id="errorText"
                  >
                    {this.state.error}
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ fontSize: "20px" }}
                  onClick={this.onSubmit}
                >
                  {this.state.loading ? (
                    <>
                      <CircularProgress
                        color="light"
                        style={{
                          height: "1.7rem",
                          width: "1.7rem",
                          marginBottom: "-2px",
                        }}
                      />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
        </NavBar>
        {this.performRedirect()}
      </>
    );
  }
}
