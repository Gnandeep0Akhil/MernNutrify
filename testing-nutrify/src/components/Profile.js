import React, { Component } from 'react'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      dpassword: null,
      calorie: null,
      error: null,
    };
  }

  componentDidMount() {
    var sessionId = sessionStorage.getItem("sessionId");
    var query = {
      sessionId: sessionId
    };
    fetch("/home/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(query),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        var email = data.email;
        var calorie = data.calorie;
        this.setState({ email: email });
        this.setState({ calorie: calorie });
      })
      .catch((err) => {
        this.setState({ status: err.toString() });
      });
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
    this.setState({ calorie: event.target.value });
  };

  handleSubmit = (event) => {
    if (this.state.password === this.state.dpassword) {
      this.props.profileUpdate(this.state);
      this.props.changeTrigger1(false);
      event.preventDefault();
    } else {
      this.setState({ error: "Passwords do not match!" });
      event.preventDefault();
    }
  };

  render() {

    if (this.state.error) {
      return (
        <div className="popup">
          <div className="popup-inner">
            <button
              onClick={() => this.props.changeTrigger1(false)}
            >
              close
            </button>
            <p>{this.state.error}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={() => this.props.changeTrigger1(false)}>
              close
            </button>
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
                Calories:
                <input
                  type="number"
                  name="calorie"
                  value={this.state.calorie || ""}
                  onChange={this.handleChangeC}
                />
              </label>
              <br />
              <br />
              <br />
              <strong>(Wish to update password?)</strong>
              <br />
              <br />
              <label>
                New password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password || ""}
                  onChange={this.handleChangeP}
                />
              </label>
              <label>
                Re-enter new password:
                <input
                  type="password"
                  name="dpassword"
                  value={this.state.dpassword || ""}
                  onChange={this.handleChangedP}
                />
              </label>
              <br></br>
              <br></br>
              <input type="submit" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Profile
