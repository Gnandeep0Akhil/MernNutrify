import React, { Component } from 'react'
import Main from './Main';
import Trackable from './Trackable';

class Body extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }
    

    render() {
        return (
          <div className="Body">
            <Trackable 
              calorie={this.props.calorie} 
              calories={this.props.calories}
              setprofile={this.props.setprofile} 
            />
            <Main
              display={this.props.display}
              deleteCard={this.props.deleteCard}
              changeTrigger3={this.props.changeTrigger3}
            />
          </div>
        );
    }
}

export default Body
