import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';
import AdminDashboard from './AdminDashboard';
import SignUp from './SignUp';
import swal from 'sweetalert';

class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
          admin: false,
          sign: false
        }

      this.signUp = this.signUp.bind(this);  
      this.signIn = this.signIn.bind(this);  
      this.logOut = this.logOut.bind(this);
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
        this.setState({
          admin: true, sign: false
        });
        db.collection("Admin")
          .doc(res.user.uid)
          .set({ email, name })
          .then(function(res) {
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
        console.log('Admin res =>', res);
        debugger
        db.collection("Admin")
          .where("email", "==", res.user.email)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size > 0) {
              this.setState({ admin: true });
              swal('SigIn successful', '', 'success');
            }
            else {
              swal('Access denied', 'only admin have rights', 'warning');
            }
          });

      }).catch(error => {
        swal(error.message, '', 'error');
      })

    }
  }
    
  logOut() {
    firebase.auth().signOut().then(() => {
      swal("Logged Out successfully", "", "success");
      this.setState({ admin: false });
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

  back1(){
    this.setState({
      sign: false
    })
  }

  componentDidMount() {
    debugger
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        console.log('user', user.uid);
        console.log('user', user.email);

        db.collection("Admin")
          .where("email", "==", user.email)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size > 0) {
              this.setState({ admin: true });
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
              <h2>Admin Sign In</h2>
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
      const {admin, sign} = this.state;
        
        return <div>
            {sign && !admin && <SignUp signUp={this.signUp} back={this.back1} />}
            {!sign && admin && <AdminDashboard logOut={this.logOut} />}
            {!sign && !admin && this.renderForm()}
          </div>;
    }
}

export default LogIn;
