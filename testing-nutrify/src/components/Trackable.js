import React, { Component } from 'react'

class Trackable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      status: null
    };
  }

  handleChangeD = (event) => {
    this.setState({ date: event.target.value });
  };

  handleSubmit = (event) => {
    var sessionId = sessionStorage.getItem("sessionId");
    var query = {
      date: this.state.date,
      sessionId: sessionId,
    };
    fetch("/home/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(query),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.props.setprofile(data, this.state.date);
      })
      .catch((err) => {
        this.setState({ status: err.toString() });
      });
    event.preventDefault();
  };

  render() {
    var max = this.props.calorie;
    var value = Math.round(this.props.calories);

    if (value >= max) {
      return (
        <div className="Trackable">
            <div className="DateForm">
              <div>{this.state.status}</div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Get Meals On:
                  <br></br>
                  <br></br>
                  <input
                    type="date"
                    name="date"
                    value={this.state.date || ""}
                    onChange={this.handleChangeD}
                  />
                </label>
                <input
                  type="submit"
                />
              </form>
            </div>
            <div className="CalorieMeter">
              <p className="styled">
                <progress
                  value={value}
                  max={max}
                  data-label={value + "/" + max}
                  className="Alert"
                ></progress>
              </p>
            </div>
        </div>
      );
    } else {
      return (
        <div className="Trackable">
            <div className="DateForm">
              <div>{this.state.status}</div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Get Meals On:
                  <br></br>
                  <br></br>
                  <input
                    type="date"
                    name="date"
                    value={this.state.date || ""}
                    onChange={this.handleChangeD}
                  />
                </label>
                <input
                  type="submit"
                />
              </form>
            </div>
            <div className="CalorieMeter">
              <p className="styled">
                <progress
                  value={value}
                  max={max}
                  data-label={value + "/" + max}
                ></progress>
              </p>
            </div>
        </div>
      );
    }
  }
}

export default Trackable
