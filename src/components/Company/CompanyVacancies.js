import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';
import swal from 'sweetalert';

class StudentDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
      form: false
    };

    this.back = this.back.bind(this);
    this.addVacancies = this.addVacancies.bind(this);
    this.vacancyForm = this.vacancyForm.bind(this);
    this.seeVacancies = this.seeVacancies.bind(this);
  }

  addVacancies() {
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
        .add({
          name,
          profile,
          salary,
          criteria,
          email,
          number,
          uid: firebase.auth().currentUser.uid
        })
        .then(res => {
          swal("Data Successfully Inserted", "", "success");
          this.setState({ data: true });
          document.getElementById("name").value = "";
          document.getElementById("profile").value = "";
          document.getElementById("salary").value = "";
          document.getElementById("criteria").value = "";
          document.getElementById("email").value = "";
          document.getElementById("number").value = "";
        })
        .catch(err => {
          swal(err, "", "error");
        });
    }
  }

  seeVacancies() {
    this.setState({data: true, form: false});
  }

  vacancyForm(){
      this.setState({
        data: true,
        form: true
      })
  }

  back(){
      this.setState({data: false});
  }

  renderData() {
    const db = firebase.firestore();

    db.collection("vacancies")
          .where("uid", "==", firebase.auth().currentUser.uid)
          .get()
          .then(querySnapshot => {
              if (querySnapshot.size > 0) {
                  querySnapshot.forEach(function (doc) {
                      // doc.data() is never undefined for query doc snapshots
                      var data = document.getElementById("data");
                      var div = document.createElement("div");
                      var hr = document.createElement('hr');
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
                          doc.data().number + "</div>"
                      data.appendChild(div);
                      data.appendChild(hr);
                  });
              } else {
                  document.getElementById("data").innerHTML = "No vacancies posted";
              }
          }).catch(function (error) {
              swal("Error getting documents", "", "error");
          });
    return (
      <div className="row mt-4">
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="card card-info">
            <div className="card-header text-white text-center bg-primary">
              <span style={{ fontSize: "28px" }}>Vacancies Details</span>
            </div>
            <div className="card-body mt-3">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-8 text-monospace" id="data">
                    {/* Data will be rendered here */}
                </div>
                <div className="col-md-1" />
              </div>
              <center>
                <button className="btn btn-danger mt-4" onClick={this.back}>
                  Back
                </button>
              </center>
            </div>
          </div>
        </div>
        <div className="col-md-4" />
      </div>
    );
  }

  renderForm() {

    return (
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card" id="signup">
            <div className="card-header text-white text-center bg-primary">
              <h2>Add Vacancies</h2>
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
              <button className="btn btn-primary" onClick={this.addVacancies}>
                Submit
              </button>
              <button className="btn btn-danger float-right" onClick={this.back}>
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    );
  }

  renderSelect() {
    const { back} = this.props;

    return (
      <div className="row mt-4">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-body mt-5">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-4">
                  <span className="btn btn-outline-primary d-block" onClick={this.vacancyForm}>
                    Post vacancies
                  </span>
                </div>
                <div className="col-md-4">
                  <span className="btn btn-outline-primary d-block" onClick={this.seeVacancies}>
                    See vacancies
                  </span>
                </div>
                <div className="col-md-2" />
              </div>
              <center>
                <button className="btn btn-danger mt-4" onClick={() => back()}>
                  Back
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
    const { data, form } = this.state;

    return (
      <div>
        {!data && this.renderSelect()}
        {data && form && this.renderForm()}
        {data && !form && this.renderData()}
      </div>
    );
  }
}

export default StudentDashboard;
