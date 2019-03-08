import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';
import * as firebase from 'firebase';
import LogIn from "./components/Admin/LogIn";
import CompanyLogIn from "./components/Company/CompanyLogIn";
import StudentLogIn from "./components/Student/StudentLogIn";

class App extends Component {
  
  constructor(){
    super();
    
    this.state = {
      text: 'Campus Recuitment System',
      click: false,
      admin: false,
      company: false,
      student: false
    }

    this.signUp = this.signUp.bind(this);
    this.adminform = this.adminform.bind(this);
    this.companyform = this.companyform.bind(this);
    this.studentform = this.studentform.bind(this);
    this.back = this.back.bind(this);
  }

    check() {
    
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              // User is signed in.
              console.log(user.email);

          } else {
              // User is signed out.
              console.log('no user');
              // ...
          }
        });
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("USER LOGGED IN")
                console.log(user.email)
                this.setState({
                    sign: true
                });
            } else {
                console.log("NOBODY'S HERE")
                
                // do not change state
            }
        }.bind(this));
    }

    signUp(){
      const db = firebase.firestore();
      const email = document.getElementById("email").value;
      const name = document.getElementById("name").value;
      const password = document.getElementById('password').value;
      if(email === '' || name === '' || password === ''){
        swal('Fill all the fields','','warning');
      }
      else{
          
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res =>{
          debugger
          this.setState({
            sign: true
          });
          db.collection('Admin').add({
            email,
            name
          }).then(function(res) {
              swal('Registration Successful', '', 'success');
          }).catch(function(error) {
            swal('Error adding document: ','', 'error');
          });
          
            
        }).catch(function (error) {
          // Handle Errors here.
          swal(error.message,'','error');
          // ...
        });

      }

    }

    adminform(){
      this.setState({
        click: true, sign: true, admin: true, student: false, company: false
      })
    }

    companyform(){
      this.setState({
        click: true, sign: true, admin: false, student: false, company: true
      })
    }

    studentform(){
      this.setState({
        click: true, sign: true, admin: false, student: true, company: false
      })
    }

    back() {
        this.setState({
          click: false, admin: false, student: false, company: false
        });
    }

    renderButton(){
      return (
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <div className="card" id="signup">
                <div className="card-header text-white text-center bg-dark">
                  <h2>Select</h2>
                </div>
                <div className="card-body">
                  <span className="btn btn-secondary d-block p-2 text-white" onClick={this.adminform}>
                    Admin Login
                  </span>
                  <span className="btn btn-secondary d-block p-2 text-white mt-3" onClick={this.companyform}>
                    Company Login
                  </span>
                  <span className="btn btn-secondary d-block p-2 text-white mt-3" onClick={this.studentform}>
                    Student Login
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-1" />
          </div>
        )
      }

    

  render() {
      const {click, admin, student, company} = this.state;
    // debugger
    return <div>

        <div className="App" onLoad={this.check()}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />    
            <h1 className="App-title">{this.state.text}</h1>
          </header>
        </div>

        {!click && this.renderButton()}
        {admin && <LogIn back={this.back} change={this.change} />}
        {student && <StudentLogIn back={this.back} change={this.change} />}
        {company && <CompanyLogIn back={this.back} change={this.change} />}

      </div>;
  }
}

export default App;
