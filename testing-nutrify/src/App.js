import './App.css';
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/logIn" component={LogIn} />
          <Route path="/signUp" component={SignUp} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App
