import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';
import CompanySignUp from "./CompanySignUp";
import CompanyDashboard from "./CompanyDashboard";
import CompanyVacancies from "./CompanyVacancies"
import swal from 'sweetalert';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: false,
      sign: false,
      vacancy: false
    };

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.back1 = this.back1.bind(this);
    this.stddetail = this.stddetail.bind(this);
    this.vacancies = this.vacancies.bind(this);
  }

  signUp() {
    const db = firebase.firestore();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    if (email === "" || name === "" || password === "") {
      swal("Fill all the fields", "", "warning");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          debugger;
          this.setState({ company: true, sign: false });
          db.collection("Company")
            .doc(res.user.uid)
            .set({ email, name })
            .then(function(res) {
              swal("Registration Successful", "", "success");
            })
            .catch(function(error) {
              swal("Error adding document: ", "", "error");
            });
        })
        .catch(function(error) {
          // Handle Errors here.
          swal(error.message, "", "error");
          // ...
        });
    }
  }

  signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const db = firebase.firestore();
    if (email === "" || password === "") {
      swal("Fill all the fields", "", "warning");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log("Company res =>", res);
          debugger;
          db.collection("Company")
            .where("email", "==", res.user.email)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size > 0) {
                this.setState({ company: true });
                swal("SigIn successful", "", "success");
              } else {
                swal("Access denied", "only company have rights", "warning");
              }
            });
        })
        .catch(error => {
          swal(error.message, "", "error");
        });
    }
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        swal("Logged Out successfully", "", "success");
        this.setState({ company: false });
      })
      .catch(function(error) {
        swal(error.message, "", "error");
      });
  }

  change() {
    debugger;
    this.setState({
      sign: true
    });
  }

  back1() {
    this.setState({
      sign: false,
      vacancy: false
    });
  }

  stddetail(){

  }

  vacancies() {
    this.setState({
      vacancy: true,
      sign: true,
      company: true
    });
  }

  componentDidMount() {
    debugger;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        console.log("user", user.uid);
        console.log("user", user.email);

        db.collection("Company")
          .where("email", "==", user.email)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size > 0) {
              this.setState({ company: true });
            }
          });
      }
    });
  }

  renderForm() {
    const { back } = this.props;

    return (
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card" id="signup">
            <div className="card-header text-white text-center bg-primary">
              <h2>Company Sign In</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="btn btn-primary" onClick={this.signIn}>
                SignIn <i className="fa fa-sign-in" />
              </button>{" "}
              Don't have a account click{" "}
              <a className="alert-link" onClick={() => this.change()}>
                here
              </a>
              <button
                className="btn btn-danger float-right"
                onClick={() => back()}
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    );
  }

  render() {
    const { company, sign, vacancy } = this.state;
    debugger;
    return (
      <div>
        {sign && !company && <CompanySignUp signUp={this.signUp} back={this.back1} />}
        {!sign && company && <CompanyDashboard logOut={this.logOut} stddetail={this.stddetail} vacancies={this.vacancies} />}
        {!sign && !company && this.renderForm()}
        {vacancy && <CompanyVacancies back={this.back1} />}
      </div>
    );
  }
}

export default LogIn;
