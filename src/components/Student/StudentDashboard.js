import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';

class StudentDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
          showVacancies: false
        }

      this.showVacancies = this.showVacancies.bind(this);
      this.back = this.back.bind(this);
    }

  showVacancies(){
    this.setState({showVacancies: true});
  }

  back(){
    this.setState({showVacancies: false});
  }

  renderDashboard() {
    const { logOut, detail } = this.props;

    return <div className="row mt-4">
      <div className="col-md-1" />
      <div className="col-md-10">
        <div className="card card-info">
          <div className="card-header text-white text-center bg-primary">
            <span style={{ "fontSize": "28px" }}>
              Student Dashboard
                  </span>
          </div>
          <div className="card-body mt-5">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-4">
                <span className="btn btn-outline-success d-block" onClick={() => detail()}>
                  Details
                      </span>
              </div>
              <div className="col-md-4">
                <span className="btn btn-outline-success d-block" onClick={this.showVacancies}>
                  See vacancies
                      </span>
              </div>
              <div className="col-md-2" />
            </div>
            <center>
              <button className="btn btn-danger mt-5" onClick={() => logOut()}>
                Logout <i className="fa fa-sign-out" />
              </button>
            </center>
          </div>
        </div>
      </div>
      <div className="col-md-1" />
    </div>;
  }

  renderVacancies() {
    const db = firebase.firestore();

    db.collection("vacancies")
      .get()
      .then(querySnapshot => {
        document.getElementById("data").innerHTML = "";
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
      });


    return <div className="row mt-4">
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="card card-info">
            <div className="card-header text-white text-center bg-primary">
              <span style={{ fontSize: "28px" }}>Vacancies</span>
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
      </div>;
  }

  render() {
    const { showVacancies } = this.state;

    return <div>
      {!showVacancies && this.renderDashboard()}
      {showVacancies && this.renderVacancies()}
    </div>;
  }
}

export default StudentDashboard;
