import React, { Component } from 'react'
import { Link } from "react-router-dom";

class ThirdComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    clearSession = () => {
      sessionStorage.clear();
    }

    render() {
        return (
          <div className="Navbar">
            <button onClick={() => this.clearSession()} className="logout">
              <Link to="/" style={{ "text-decoration": "none" }}>
                SignOut
              </Link>
            </button>
            <button onClick={() => this.props.changeTrigger1(true)}>
              Profile
            </button>
            <button onClick={() => this.props.changeTrigger2(true)}>
              AddOne
            </button>
          </div>
        );
    }
}

export default ThirdComponent
