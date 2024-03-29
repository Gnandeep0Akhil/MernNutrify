import React, { Component } from 'react'

class AddOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mName: null,
      mType: null,
      mDescription: null,
      mCalorie: null,
      status: this.props.status
    };
  }

  handleChangeMn = (event) => {
    this.setState({ mName: event.target.value });
  };

  handleChangeMt = (event) => {
    this.setState({ mType: event.target.value });
  };

  handleChangeMd = (event) => {
    this.setState({ mDescription: event.target.value });
  };

  handleChangeMc = (event) => {
    this.setState({ mCalorie: event.target.value });
  };

  handleSubmit = (event) => {
    this.props.mealAdd(this.state);
    this.props.changeTrigger2(false);
    event.preventDefault();
  };

  fetchData = () => {
    this.setState({ status: null });
    var query = {
      query: this.state.mName,
    };

    fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-app-id": "2419c525",
        "x-app-key": "9a2ebddf0e4bcc604f3dbab551b2165d",
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ mCalorie: data.foods[0].nf_calories });
      })
      .catch((err) => {
        this.setState({ status: err.toString() }
      )})
  }

  render() {
    if(this.state.status){
      return (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={() => this.props.changeTrigger2(false)}>
              close
            </button>
            <p>{this.state.status}</p>
          </div>
        </div>
      );
    }else{
      return (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={() => this.props.changeTrigger2(false)}>
              close
            </button>
            <form onSubmit={this.handleSubmit}>
              <label>
                Meal name:
                <input
                  type="text"
                  name="mName"
                  value={this.state.mName || ""}
                  onChange={this.handleChangeMn}
                />
              </label>
              <label>
                Meal type:
                <input
                  type="text"
                  name="mType"
                  value={this.state.mType || ""}
                  onChange={this.handleChangeMt}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="mDescription"
                  value={this.state.mDescription || ""}
                  onChange={this.handleChangeMd}
                />
              </label>
              <label>
                Calories:
                <div className="shortOne">
                  <input
                    type="number"
                    name="mCalorie"
                    value={this.state.mCalorie || ""}
                    onChange={this.handleChangeMc}
                  />
                  <span onClick={this.fetchData} className="fetch">
                    {" "}
                    Fetch{" "}
                  </span>
                </div>
              </label>
              <br />
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default AddOne
