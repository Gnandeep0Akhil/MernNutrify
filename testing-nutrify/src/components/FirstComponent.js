import React, { Component } from 'react'
import { Link } from "react-router-dom";

class FirstComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
          <Link to="/">
            <div className="Railing">
              <h1>Nutrify.Me</h1>
            </div>
          </Link>
        );
    }
}

export default FirstComponent
