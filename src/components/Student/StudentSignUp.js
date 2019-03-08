import React, { Component } from 'react';
import '../../App.css';

class StudentSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { signUp, back } = this.props;

    return (
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-10">
          <div className="card" id="signup">
            <div className="card-header text-white text-center bg-primary">
              <h2>Sign Up</h2>
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
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
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

              <button className="btn btn-primary" onClick={() => signUp()}>
                SignUp
              </button>
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
}

export default StudentSignUp;
