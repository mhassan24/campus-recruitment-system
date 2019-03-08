import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';
import swal from 'sweetalert';

class StudentDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
          data: false
        }

        this.addDetails = this.addDetails.bind(this);
    }

    addDetails(){
      const db = firebase.firestore();
      const FName = document.getElementById('FName').value;
      const LName = document.getElementById('LName').value;
      const email = document.getElementById('email').value;
      const number = document.getElementById('number').value;
      const city = document.getElementById('city').value;
      const age = document.getElementById("age").value;
      const matric = document.getElementById("matric").value;
      const matricaggregate = document.getElementById("matricaggregate").value;
      const college = document.getElementById("college").value;
      const collegeaggregate = document.getElementById("collegeaggregate").value;
      const university = document.getElementById("university").value;
      const universityaggregate = document.getElementById("universityaggregate").value;
      var gender;
      debugger
      if (document.getElementById("radio1").checked) {
        gender = 'Male';
      }
      else if (document.getElementById("radio2").checked){
        gender = "Female";
      }else{ gender = "Not Specified"}

      if (!FName || !LName || !email || !number || !city || !age) {
        swal('Fill the required fields','','error');
      }
      else{
        db.collection('stdDetails').add({
          FName,
          LName,
          email,
          number,
          city,
          age,
          gender,
          matric,
          matricaggregate,
          college,
          collegeaggregate,
          university,
          universityaggregate,
          uid: firebase.auth().currentUser.uid
        }).then(res =>{
          swal('Data Successfully inserted', "", "success");
          this.setState({ data: true });
        }).catch(err =>{
          swal(err,'','error');
        })
      }
    }

    componentDidMount() {
      debugger
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const db = firebase.firestore();
          console.log('user', user.uid);
          console.log('user', user.email);

          db.collection("stdDetails")
            .where("uid", "==", user.uid)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size > 0) {
                this.setState({ data: true});
              }
            });
        }
      });
    }

    componentDidUpdate(){
      const db = firebase.firestore();
      db.collection("stdDetails")
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().FName);
            document.getElementById("data").innerHTML = "<b>First Name: </b>" + doc.data().FName + "<br /><b>Last Name: </b>" + doc.data().LName + "<br /><b>Age: </b>" + doc.data().age + "<br /><b>City: </b>" + doc.data().city + "<br /><b>Gender: </b>" + doc.data().gender + "<br /><b>Email: </b>" + doc.data().email + "<br /><b>Number: </b>" + doc.data().number + "<br /><b>School: </b>" + doc.data().matric + "<br /><b>Aggregate: </b>" + doc.data().matricaggregate + "<br /><b>College: </b>" + doc.data().college + "<br /><b>Aggregate: </b>" + doc.data().collegeaggregate + "<br /><b>University: </b>" + doc.data().university + "<br /><b>Aggregate: </b>" + doc.data().universityaggregate;
          });
          
        });
    }

    renderData(){
      const { back } = this.props;

      return <div className="row mt-4">
          <div className="col-md-4" />
          <div className="col-md-4">
            <div className="card card-info">
              <div className="card-header text-white text-center bg-primary">
                <span style={{ fontSize: "28px" }}>Details</span>
              </div>
              <div className="card-body mt-5">
                <div className="row">
                  <div className="col-md-3" />
                  <div className="col-md-8 text-monospace" id="data" />
                  <div className="col-md-1" />
                </div>
                <center>
                  <button className="btn btn-danger mt-4" onClick={() => back()}>
                    Back
                  </button>
                </center>
              </div>
            </div>
          </div>
          <div className="col-md-4" />
        </div>;
      
    }

    renderDetails(){
      const { back } = this.props;

      return (
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card" id="signup">
            <div className="card-header text-white text-center bg-primary">
              <h2>Details</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>First Name:*</label>
                <input
                  type="text"
                  className="form-control"
                  id="FName"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:*</label>
                <input
                  type="text"
                  className="form-control"
                  id="LName"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender:*</label><br />
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" id="radio1" name="radio" value="Male" />Male  
                    </label>
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" id="radio2" name="radio" value="Female" />Female
                    </label>
                </div>
              </div>
              <div className="form-group">
                <label>Email:*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact No:*</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  placeholder="Number"
                  required
                />
              </div>
              <div className="form-group">
                <label>City:*</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-group">
                <label>Age:*</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  placeholder="Age"
                  required
                />
              </div>
              <div className="form-group">
                <label>School:</label>
                <input
                  type="text"
                  className="form-control"
                  id="matric"
                  placeholder="School Name"
                />
              </div>
              <div className="form-group">
                <label>Aggregate:</label>
                <input
                  type="text"
                  className="form-control"
                  id="matricaggregate"
                  placeholder="Grade"
                />
              </div>
              <div className="form-group">
                <label>College:</label>
                <input
                  type="text"
                  className="form-control"
                  id="college"
                  placeholder="College Name"
                />
              </div>
              <div className="form-group">
                <label>Aggregate:</label>
                <input
                  type="text"
                  className="form-control"
                  id="collegeaggregate"
                  placeholder="Grade"
                />
              </div>
              <div className="form-group">
                <label>University:</label>
                <input
                  type="text"
                  className="form-control"
                  id="university"
                  placeholder="University Name"
                />
              </div>
              <div className="form-group">
                <label>Aggregate:</label>
                <input
                  type="text"
                  className="form-control"
                  id="universityaggregate"
                  placeholder="G.P.A"
                />
              </div>

               <button className="btn btn-primary" onClick={this.addDetails}>
                Submit
              </button>
              <button className="btn btn-danger float-right" onClick={() => back()}>
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
        const {data} = this.state;

        return (
          <div>
            {!data ? this.renderDetails() : this.renderData()}
          </div>
        );
    }
}

export default StudentDashboard;
