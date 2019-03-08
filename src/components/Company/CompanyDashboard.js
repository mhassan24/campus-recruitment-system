import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';

class StudentDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      detail: false
    }

    this.stddetail = this.stddetail.bind(this);
    this.back = this.back.bind(this);
  }

  stddetail(){
    this.setState({detail: true});
  }

  back(){
    this.setState({detail: false});
  }

  renderDetail() {

    const db = firebase.firestore();
    db.collection("stdDetails")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          var data = document.getElementById("data");
          var div = document.createElement("div");
          var hr = document.createElement('hr');
          div.setAttribute('id','detail');

          div.innerHTML = document.getElementById("data").innerHTML = "<b>First Name: </b>" + doc.data().FName + "<br /><b>Last Name: </b>" + doc.data().LName + "<br /><b>Age: </b>" + doc.data().age + "<br /><b>City: </b>" + doc.data().city + "<br /><b>Gender: </b>" + doc.data().gender + "<br /><b>Email: </b>" + doc.data().email + "<br /><b>Number: </b>" + doc.data().number + "<br /><b>School: </b>" + doc.data().matric + "<br /><b>Aggregate: </b>" + doc.data().matricaggregate + "<br /><b>College: </b>" + doc.data().college + "<br /><b>Aggregate: </b>" + doc.data().collegeaggregate + "<br /><b>University: </b>" + doc.data().university + "<br /><b>Aggregate: </b>" + doc.data().universityaggregate;

          data.appendChild(hr);
          data.appendChild(div);
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

  renderDashboard() {
    const { logOut, vacancies} = this.props;

    return <div className="row mt-4">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card card-info">
            <div className="card-header text-white text-center bg-primary">
              <span style={{ fontSize: "28px" }}>Company Dashboard</span>
            </div>
            <div className="card-body mt-5">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-4">
                  <span className="btn btn-outline-primary d-block" onClick={this.stddetail}>
                    See students details
                  </span>
                </div>
                <div className="col-md-4">
                  <span className="btn btn-outline-primary d-block" onClick={() => vacancies()}>
                    Vacancies
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

  render() {
    const {detail} = this.state;

    return <div>
      {!detail && this.renderDashboard()}
      {detail && this.renderDetail()}
    </div>;
  }
}

export default StudentDashboard;
