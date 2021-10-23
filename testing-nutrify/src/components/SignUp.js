import React, { Component } from 'react'
import { Link } from "react-router-dom";
import FirstComponent from './FirstComponent';

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      dpassword: null,
      calories: null,
      error: null,
    };
  }

  handleChangeE = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangeP = (event) => {
    this.setState({ password: event.target.value });
  };
  handleChangedP = (event) => {
    this.setState({ dpassword: event.target.value });
  };

  handleChangeC = (event) => {
    this.setState({ calories: event.target.value });
  };

  handleSubmit = (event) => {
    if( this.state.password === this.state.dpassword ){
      fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(this.state),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.signup) {
            this.props.history.push("/logIn");
          }
        })
        .catch((err) => {
          this.setState({ error: err.toString() });
        });
      event.preventDefault();
    } else {
      this.setState({ error: "Passwords do not match!" });
      event.preventDefault();
    }
    
  };

  render() {
    return (
      <>
        <FirstComponent />
        <div className="signup">
          <h1>Signup.</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email || ""}
                onChange={this.handleChangeE}
              />
            </label>
            <label>
              password:
              <input
                type="password"
                name="password"
                value={this.state.password || ""}
                onChange={this.handleChangeP}
              />
            </label>
            <label>
              Re-enter password:
              <input
                type="password"
                name="password"
                value={this.state.dpassword || ""}
                onChange={this.handleChangedP}
              />
            </label>
            <label>
              Calories:
              <input
                type="number"
                name="calories"
                value={this.state.calories || ""}
                onChange={this.handleChangeC}
              />
            </label>
            <br></br>
            <br></br>
            <input
              type="submit"
            />
          </form>
          <div>
            <h3>{this.state.error}</h3>
          </div>
          <div className="loginB">
            <Link to="/logIn">
              <button>Back to Login.</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp
