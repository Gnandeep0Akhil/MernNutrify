import React, { Component } from 'react'

export class MealCard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
          <div className="Card">
            <div className="content">
              <div className="mName"><span>Meal:</span><br/>{this.props.display.mName}</div>
              <div className="mType"><span>Type:</span><br/>{this.props.display.mType}</div>
              <div className="mDescription">
                <span>Description:</span><br/>{this.props.display.mDescription}
              </div>
              <div className="mCalorie"><span>Calories:</span><br/>{this.props.display.mCalorie}</div>
            </div>
            <div className="button">
              <button
                onClick={() =>
                  this.props.changeTrigger3(true, this.props.display)
                }
              >
                Edit
              </button><br/>
              <button
                onClick={() => {
                  this.props.deleteCard(this.props.display._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
    }
}

export default MealCard
