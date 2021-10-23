import React, { Component } from 'react'
import AddOne from './AddOne';
import Body from './Body';
import EditCard from './EditCard';
import FirstComponent from './FirstComponent';
import Profile from './Profile';
import ThirdComponent from './ThirdComponent';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: "Home",
      trigger1: false,
      trigger2: false,
      trigger3: false,
      editId: null,
      calorie: null,
      calories: null,
      qDate: null,
      status: null,
      profile: [],
    };
  }

  componentDidMount() {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var D = d.getDate();
    var date = y + "-" + m + "-" + D;
    this.setState({ qDate: date });
    var sessionId = sessionStorage.getItem("sessionId");
    var query = {
      date: date,
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
        var values = data.value;
        var calorie = data.data;
        var calories = data.calories;
        this.setState({ profile: [...values] });
        this.setState({ calorie: calorie });
        this.setState({ calories: calories });
      })
      .catch((err) => {
        this.setState({ status: err.toString() });
      });
  }

  setProfile = (data, date) => {
    var values = data.value;
    var calorie = data.data;
    var calories = data.calories;
    this.setState({ profile: [...values] });
    this.setState({ calorie: calorie });
    this.setState({ calories: calories });
    this.setState({ qDate: date });
  };

  ChangeTrigger1 = (value) => {
    this.setState({ trigger1: value });
  };

  ChangeTrigger2 = (value) => {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var D = d.getDate();
    var date = y + "-" + m + "-" + D;
    if(this.state.qDate === date){
      this.setState({ trigger2: value });
      this.setState({ status: null });
    }else{
      this.setState({ trigger2: value });
      this.setState({ status: "Cannot Add Meal To The Past!" });
    }
  };

  ChangeTrigger3 = (value1, value2) => {
    this.setState({ trigger3: value1 });
    this.setState({ editId: value2 });
  };

  ProfileUpdate = (value) => {
    var sessionId = sessionStorage.getItem("sessionId");
    var item = {
      email: value.email,
      password: value.password,
      calorie: value.calorie,
    };
    var query = {
      sessionId: sessionId,
      ...item,
    };

    fetch("/home/updateProfile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(query),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.updateProfileStatus) {
          this.setState({calorie: value.calorie});
          sessionStorage.clear();
          sessionStorage.setItem("sessionId", value.email);
        }
      })
      .catch((err) => {
        this.setState({ status: err.toString() });
      });

  };

  MealAdd = (value) => {
    var sessionId = sessionStorage.getItem("sessionId");
    var item = {
      mName: value.mName,
      mType: value.mType,
      mDescription: value.mDescription,
      mCalorie: value.mCalorie,
    };
    var query = {
      sessionId: sessionId,
      ...item,
    };

    fetch("/home/addOne", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(query),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.addMealStatus) {
          this.setState({ profile: [...this.state.profile, ...data.value] });
          this.setState({
            calories: parseInt(this.state.calories) + parseInt(value.mCalorie),
          });
        }
      })
      .catch((err) => {
        this.setState({ error: err.toString() });
      });
  };

  MealUpdate = (value) => {
    var item = {
      mName: value.mName,
      mType: value.mType,
      mDescription: value.mDescription,
      mCalorie: value.mCalorie,
    };
    var query = {
      _id: value._id,
      ...item,
    };

    fetch("/home/updateMeal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(query),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.editStatus) {
          let id = this.state.editId;
          let condition = this.state.profile;
          let tempArr = [];
          for (let i = 0; i < condition.length; i++) {
            if (condition[i]._id === id._id) {
              tempArr.push(query);
              this.setState({
                calories:
                  parseInt(this.state.calories) -
                  parseInt(condition[i].mCalorie) +
                  parseInt(value.mCalorie),
              });
            } else {
              tempArr.push(condition[i]);
            }
          }
          this.setState({ profile: [...tempArr] });
        }
      })
      .catch((err) => {
        this.setState({ status: err.toString() });
      });
  };

  DeleteCard = (value) => {
    fetch("/home/deleteMeal", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ _id: value }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.deleteStatus) {
          let pro = this.state.profile;
          let len = pro.length;
          let tempArr = [];
          let calories = 0;
          for (let i = 0; i < len; i++) {
            if (pro[i]._id !== value) {
              tempArr.push(pro[i]);
              calories = calories + parseInt(pro[i].mCalorie);
            }
          }
          this.setState({ profile: [...tempArr] });
          this.setState({ calories: calories });
        }
      })
      .catch((err) => {
        this.setState({ status: err.toString() });
      });
  };

  render() {
    if (
      this.state.init === "Home" &&
      this.state.trigger1 === false &&
      this.state.trigger2 === false &&
      this.state.trigger3 === false
    ) {
      return (
        <>
          <div>{this.state.status}</div>
          <FirstComponent />
          <Body
            display={this.state.profile}
            calorie={this.state.calorie}
            calories={this.state.calories}
            setprofile={this.setProfile}
            deleteCard={this.DeleteCard}
            changeTrigger3={this.ChangeTrigger3}
          />
          <ThirdComponent
            changeTrigger1={this.ChangeTrigger1}
            changeTrigger2={this.ChangeTrigger2}
          />
        </>
      );
    } else if (this.state.trigger1 === true) {
      return (
        <>
          <div>{this.state.status}</div>
          <FirstComponent />
          <Body
            display={this.state.profile}
            calorie={this.state.calorie}
            calories={this.state.calories}
            setprofile={this.setProfile}
            deleteCard={this.DeleteCard}
            changeTrigger3={this.ChangeTrigger3}
          />
          <ThirdComponent
            changeTrigger1={this.ChangeTrigger1}
            changeTrigger2={this.ChangeTrigger2}
          />
          <Profile
            changeTrigger1={this.ChangeTrigger1}
            profileUpdate={this.ProfileUpdate}
          />
        </>
      );
    } else if (this.state.trigger2 === true) {
      return (
        <>
          <div>{this.state.status}</div>
          <FirstComponent />
          <Body
            display={this.state.profile}
            calorie={this.state.calorie}
            calories={this.state.calories}
            setprofile={this.setProfile}
            deleteCard={this.DeleteCard}
            changeTrigger3={this.ChangeTrigger3}
          />
          <ThirdComponent
            changeTrigger1={this.ChangeTrigger1}
            changeTrigger2={this.ChangeTrigger2}
          />
          <AddOne changeTrigger2={this.ChangeTrigger2} mealAdd={this.MealAdd} status={this.state.status}/>
        </>
      );
    } else if (this.state.trigger3 === true) {
      return (
        <>
          <div>{this.state.status}</div>
          <FirstComponent />
          <Body
            display={this.state.profile}
            calorie={this.state.calorie}
            calories={this.state.calories}
            setprofile={this.setProfile}
            deleteCard={this.DeleteCard}
            changeTrigger3={this.ChangeTrigger3}
          />
          <ThirdComponent
            changeTrigger1={this.ChangeTrigger1}
            changeTrigger2={this.ChangeTrigger2}
          />
          <EditCard
            editId={this.state.editId}
            changeTrigger3={this.ChangeTrigger3}
            mealUpdate={this.MealUpdate}
          />
        </>
      );
    } else {
      return "Something went wrong!";
    }
  }
}

export default Home
