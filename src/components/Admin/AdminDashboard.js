import React, { Component } from 'react';
import '../../App.css';
import swal from "sweetalert";
import * as firebase from 'firebase';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
      vacancies: false,
      details: false,
      update: false,
      detailUpdate: false,
      id: null
    };

    this.seeDetails = this.seeDetails.bind(this);
    this.seeVacancies = this.seeVacancies.bind(this);
    this.back = this.back.bind(this);
    this.updateBack = this.updateBack.bind(this);
    this.detailBack = this.detailBack.bind(this);
    this.deleteVacancies = this.deleteVacancies.bind(this);
    this.updateVacancies = this.updateVacancies.bind(this);
    this.deleteDetail = this.deleteDetail.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
    this.update = this.update.bind(this);
    this.updated = this.updated.bind(this);
  }

  seeVacancies() {
    this.setState({
      data: true,
      vacancies: true,
      details: false
    });
  }

  seeDetails() {
    this.setState({
      data: true,
      vacancies: false,
      details: true
    });
  }

  back() {
    this.setState({
      data: false,
      vacancies: false,
      details: false
    });
  }

  updateBack() {
    this.setState({
      data: true,
      vacancies: true,
      details: false,
      update: false
    });
  }

  detailBack() {
    this.setState({
      data: true,
      vacancies: false,
      details: true,
      detailUpdate: false
    });
  }
  
  deleteVacancies(id) {
    const db = firebase.firestore();

    debugger;
    db.collection("vacancies")
    .doc(id)
      .delete()
      .then(function () {
        debugger;
      })
      .then(res => {
        this.setState({
          data: true,
          vacancies: true
        });
        swal("Document successfully deleted!", "", "success");
      })
      .catch(error => {
        swal("Error removing document: ", "", error);
      });
  }

  updateVacancies(id) {
    debugger;
    this.setState({
      data: true,
      update: true,
      vacancies: false,
      details: false,
      id: id
    });
  }
  
  update() {
    const { id } = this.state;
    const db = firebase.firestore();

    const name = document.getElementById("name").value;
    const profile = document.getElementById("profile").value;
    const salary = document.getElementById("salary").value;
    const criteria = document.getElementById("criteria").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;

    if (!name || !profile || !salary || !criteria || !email || !number) {
      swal("Fill all the fields", "", "error");
    } else {
      db.collection("vacancies")
        .doc(id)
        .update({
          name,
          profile,
          salary,
          criteria,
          email,
          number
        })
        .then(res => {
          this.setState({ data: true, vacancies: true, details: false, update: false });
          swal("Updated Successfully", "", "success");
        })
        .catch(err => {
          swal(err, "", "error");
        });
      }
    }

  deleteDetail(id) {
    const db = firebase.firestore();

    db.collection("stdDetails")
      .doc(id)
      .delete()
      .then(function () {
        debugger;
      })
      .then(res => {
        this.setState({
          data: true,
          details: true 
        });
        swal("Document successfully deleted!", "", "success");
      })
      .catch(error => {
        swal("Error removing document: ", "", error);
      });
  }

  updated(id) {
    debugger;
    this.setState({
      data: true,
      detailUpdate: true,
      vacancies: false,
      details: false,
      id: id
    });
  }

  updateDetail() {
    const { id } = this.state;
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
    if (document.getElementById("radio1").checked) {
      gender = 'Male';
    }
    else if (document.getElementById("radio2").checked) {
      gender = "Female";
    } else { gender = "Not Specified" }

    if (!FName || !LName || !email || !number || !city || !age) {
      swal('Fill the required fields', '', 'error');
    } else {
      db.collection("stdDetails")
        .doc(id)
        .update({
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
        })
        .then(res => {
          this.setState({ data: true, details: true, vacancies: false, detailUpdate: false });
          swal("Updated Successfully", "", "success");
        })
        .catch(err => {
          swal(err, "", "error");
        });
    }
  }
    


  renderDetails() {
    const db = firebase.firestore();
    var th = this;
    
    db.collection("stdDetails")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          var data = document.getElementById("data");
          var div = document.createElement("div");
          var button = document.createElement("input");
          var button2 = document.createElement("input");
          var center2 = document.createElement("center");
          var hr = document.createElement("hr");

          button.setAttribute("type", "button");
          button.setAttribute("value", "Delete");
          button.setAttribute("class", "btn btn-danger ml-4");
          button2.setAttribute("type", "button");
          button2.setAttribute("value", "Update");
          button2.setAttribute("class", "btn btn-warning text-white");
          
          button.addEventListener("click", () => th.deleteDetail(doc.id));
          button2.addEventListener("click", () => th.updated(doc.id));
          data.appendChild(center2);
          center2.appendChild(div);
          center2.appendChild(button2);
          center2.appendChild(button);
          data.appendChild(hr);

          div.innerHTML =
            "<div><b>First Name: </b>" +
            doc.data().FName +
            "<br /><b>Last Name: </b>" +
            doc.data().LName +
            "<br /><b>Age: </b>" +
            doc.data().age +
            "<br /><b>City: </b>" +
            doc.data().city +
            "<br /><b>Gender: </b>" +
            doc.data().gender +
            "<br /><b>Email: </b>" +
            doc.data().email +
            "<br /><b>Number: </b>" +
            doc.data().number +
            "<br /><b>School: </b>" +
            doc.data().matric +
            "<br /><b>Aggregate: </b>" +
            doc.data().matricaggregate +
            "<br /><b>College: </b>" +
            doc.data().college +
            "<br /><b>Aggregate: </b>" +
            doc.data().collegeaggregate +
            "<br /><b>University: </b>" +
            doc.data().university +
            "<br /><b>Aggregate: </b>" +
            doc.data().universityaggregate + "</div>"

        });
      });

    return <div className="row mt-4">
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="card card-info">
            <div className="card-header text-white text-center bg-primary">
              <span style={{ fontSize: "28px" }}>Student Details</span>
            </div>
            <div className="card-body mt-3">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-8 align-center" id="data">
                  {/* Data will be rendered here */}
                </div>
                <div className="col-md-1" />
              </div>
              <center>
                <button className="btn btn-info mt-4" onClick={this.back}>
                  Back
                </button>
              </center>
            </div>
          </div>
        </div>
        <div className="col-md-4" />
      </div>;
  }

  renderUpdateDetails(){
    return <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card" id="signup">
            <div className="card-header text-white text-center bg-primary">
              <h2>Details</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>First Name:*</label>
                <input type="text" className="form-control" id="FName" placeholder="First Name" required />
              </div>
              <div className="form-group">
                <label>Last Name:*</label>
                <input type="text" className="form-control" id="LName" placeholder="Last Name" required />
              </div>
              <div className="form-group">
                <label>Gender:*</label>
                <br />
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" id="radio1" name="radio" value="Male" />
                    Male
                  </label>
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" id="radio2" name="radio" value="Female" />
                    Female
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Email:*</label>
                <input type="email" className="form-control" id="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <label>Contact No:*</label>
                <input type="number" className="form-control" id="number" placeholder="Number" required />
              </div>
              <div className="form-group">
                <label>City:*</label>
                <input type="text" className="form-control" id="city" placeholder="City" required />
              </div>
              <div className="form-group">
                <label>Age:*</label>
                <input type="number" className="form-control" id="age" placeholder="Age" required />
              </div>
              <div className="form-group">
                <label>School:</label>
                <input type="text" className="form-control" id="matric" placeholder="School Name" />
              </div>
              <div className="form-group">
                <label>Aggregate:</label>
                <input type="text" className="form-control" id="matricaggregate" placeholder="Grade" />
              </div>
              <div className="form-group">
                <label>College:</label>
                <input type="text" className="form-control" id="college" placeholder="College Name" />
              </div>
              <div className="form-group">
                <label>Aggregate:</label>
                <input type="text" className="form-control" id="collegeaggregate" placeholder="Grade" />
              </div>
              <div className="form-group">
                <label>University:</label>
                <input type="text" className="form-control" id="university" placeholder="University Name" />
              </div>
              <div className="form-group">
                <label>Aggregate:</label>
                <input type="text" className="form-control" id="universityaggregate" placeholder="G.P.A" />
              </div>

              <button className="btn btn-primary" onClick={this.updateDetail}>
                Submit
              </button>
              <button className="btn btn-danger float-right" onClick={this.detailBack}>
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>;
  }

  renderVacancies() {
    const db = firebase.firestore();
    var th = this;

    db.collection("vacancies")
      .get()
      .then(res => {
        res.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var data = document.getElementById("data");
          var div = document.createElement("div");
          var button = document.createElement("input");
          var button2 = document.createElement("input");
          var center2 = document.createElement("center");
          var hr = document.createElement("hr");

          button.setAttribute("type", "button");
          button.setAttribute("value", "Delete");
          button.setAttribute("class", "btn btn-danger ml-4");
          button2.setAttribute("type", "button");
          button2.setAttribute("value", "Update");
          button2.setAttribute("class", "btn btn-warning text-white");

          center2.appendChild(div);
          center2.appendChild(button2);
          center2.appendChild(button);
          data.appendChild(center2);
          data.appendChild(hr);
          button.addEventListener("click", () => th.deleteVacancies(doc.id));
          button2.addEventListener("click", () => th.updateVacancies(doc.id));

          div.innerHTML =
            "<div><b>Name: </b>" +
            doc.data().name +
            "<br /><b>Profile: </b>" +
            doc.data().profile +
            "<br /><b>Salary: </b>" +
            doc.data().salary +
            "<br /><b>Criteria: </b>" +
            doc.data().criteria +
            "<br /><b>Email: </b>" +
            doc.data().email +
            "<br /><b>Number: </b>" +
            doc.data().number +
            "</div>";
        });
      });

    return (
      <div className="row mt-4">
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="card card-info">
            <div className="card-header text-white text-center bg-primary">
              <span style={{ fontSize: "28px" }}>Vacancies</span>
            </div>
            <div className="card-body mt-3">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-8 align-center" id="data">
                  {/* Data will be rendered here */}
                </div>
                <div className="col-md-1" />
              </div>
              <center>
                <button className="btn btn-info mt-4" onClick={this.back}>
                  Back
                </button>
              </center>
            </div>
          </div>
        </div>
        <div className="col-md-4" />
      </div>
    );
  };

  renderUpdate() {

    return <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card" id="signup">
            <div className="card-header text-white text-center bg-primary">
              <h2>Update Vacancies</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Company Name:</label>
                <input type="text" className="form-control" id="name" placeholder="Name" required />
              </div>
              <div className="form-group">
                <label>Job Profile:</label>
                <input type="text" className="form-control" id="profile" placeholder="Profile" required />
              </div>
              <div className="form-group">
                <label>Salary:</label>
                <input type="number" className="form-control" id="salary" placeholder="Salary" required />
              </div>
              <div className="form-group">
                <label>Eligibility criteria:</label>
                <input type="text" className="form-control" id="criteria" placeholder="Enter criteria" required />
              </div>
              <div className="form-group">
                <label>Company Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <label>Company number:</label>
                <input type="number" className="form-control" id="number" placeholder="Number" required />
              </div>
              <button className="btn btn-primary" onClick={this.update}>
                Submit
              </button>
              <button className="btn btn-danger float-right" onClick={this.updateBack}>
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>;
  }

  renderSelect() {
    const { logOut } = this.props;

    return (
      <div className="row mt-4">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-header text-white text-center bg-primary">
              <span style={{ fontSize: "28px" }}>Admin Dashboard</span>
            </div>
            <div className="card-body mt-5">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-4">
                  <span
                    className="btn btn-outline-primary d-block"
                    onClick={this.seeDetails}
                  >
                    See students details
                  </span>
                </div>
                <div className="col-md-4">
                  <span
                    className="btn btn-outline-primary d-block"
                    onClick={this.seeVacancies}
                  >
                    See vacancies
                  </span>
                </div>
                <div className="col-md-2" />
              </div>
              <center>
                <button
                  className="btn btn-danger mt-5"
                  onClick={() => logOut()}
                >
                  Logout <i className="fa fa-sign-out" />
                </button>
              </center>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    );
  }

  render() {
    const { data, vacancies, details, update, detailUpdate } = this.state;
 
    return (
      <div>
        {!data && this.renderSelect()}
        {data && vacancies && this.renderVacancies()}
        {data && details && this.renderDetails()}
        {data && update && this.renderUpdate()}
        {data && detailUpdate && this.renderUpdateDetails()}
      </div>
    );
  }
}

export default AdminDashboard;
