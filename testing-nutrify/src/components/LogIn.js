import React, { Component } from 'react'
import { Link } from "react-router-dom";
import FirstComponent from './FirstComponent';

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      loginStatus: false,
      error: null
    };
  }

  handleChangeE = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangeP = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    fetch("/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.email){
          sessionStorage.setItem("sessionId", data.email);
          this.setState({ loginStatus: true });
          this.props.history.push("/");
        }else{
          this.setState({ error: data.message });
        }
      })
      .catch((err) => {
        this.setState({ error: err.toString() });
      });
    event.preventDefault();
  };

  render() {
    return (
      <>
      <FirstComponent />
      <div className="login">
        <h1>Login.</h1>
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
          <br></br>
          <br></br>
          <input
            type="submit"
          />
        </form>
        <div>
          <h3>{this.state.error}</h3>
        </div>
        <Link to="/signUp">
          <button>SignUp</button>
        </Link>
      </div>
      </>
    );
  }
}

export default LogIn
