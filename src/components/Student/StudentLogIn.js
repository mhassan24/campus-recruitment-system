import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';
import StudentDashboard from "./StudentDashboard";
import StudentSignUp from "./StudentSignUp";
import StudentDetails from "./StudentDetails";
import swal from 'sweetalert';

class StudentLogIn extends Component {

  constructor(props) {
    super(props);

    this.state = { student: false, sign: false, details: false };

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.detail = this.detail.bind(this);
    this.back1 = this.back1.bind(this);
  }

  signUp() {
    const db = firebase.firestore();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById('password').value;
    if (email === '' || name === '' || password === '') {
      swal('Fill all the fields', '', 'warning');
    }
    else {

      firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
        debugger
        this.setState({ student: true, sign: false });
        db.collection("Student").doc(res.user.uid).set({ email, name }).then(function(res) {
            swal("Registration Successful", "", "success");
          })
          .catch(function(error) {
            swal("Error adding document: ", "", "error");
          });


      }).catch(function (error) {
        // Handle Errors here.
        swal(error.message, '', 'error');
        // ...
      });

    }

  }

  signIn() { 
    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;
    const db = firebase.firestore();
    if (email === '' || password === '') {
      swal('Fill all the fields', '', 'warning');
    }
    else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {

        db.collection("Student")
          .where("email", "==", res.user.email)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size > 0) {
              this.setState({ student: true });
              swal("SigIn successful", "", "success");
            } else {
              swal("Access denied", "only student have rights", "warning");
            }
          });

      }).catch(error => {
        swal(error.message, '', 'error');
      })

    }
  }

  logOut() {
    firebase.auth().signOut().then(() => {
      swal('Logged Out successfully', '', 'success');
      this.setState({ student: false });
    }).catch(function (error) {
      swal(error.message, '', 'error');
    });
  }

  change() {
    debugger
    this.setState({
      sign: true,
    })
  }

  back1() {
    this.setState({
      sign: false,
      details: false
    })
  }

  detail(){
    debugger
    this.setState({
      details: true,
      student: true,
      sign: true
    })
  }

  componentDidMount() {
    debugger
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();

        db.collection("Student")
          .where("email", "==", user.email)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size > 0) {
              this.setState({ student: true });
            }
          });
      }
    });
  }

  renderForm() {
    const { back } = this.props;

    return <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card" id="signup">
            <div className="card-header text-white text-center bg-primary">
              <h2>Student Sign In</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Email address:</label>
                <input type="email" className="form-control" id="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Password" required />
              </div>
              <button className="btn btn-primary" onClick={this.signIn}>
                SignIn <i className="fa fa-sign-in" />
              </button> Don't have a account click <a className="alert-link" onClick={() => this.change()}>
                here
              </a>
              <button className="btn btn-danger float-right" onClick={() => back()}>
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>;
  }

  render() {
    const { student, sign, details } = this.state;
    // debugger
    return <div>
        {sign && !student && <StudentSignUp signUp={this.signUp} back={this.back1} />}
        {!sign && student && <StudentDashboard logOut={this.logOut} detail={this.detail}  back={this.back1} />}
        {!sign && !student && this.renderForm()}
        {details && <StudentDetails back={this.back1} />}
      </div>;
  }
}

export default StudentLogIn;
