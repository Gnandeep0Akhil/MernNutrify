import React, { Component } from 'react'
import MealCard from './MealCard'

class Main extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        var list = this.props.display;
        if(list.length === 0){
          return (
            <div className="Main">
              <p>Meals not added to display.</p>
            </div>
          );
        }else{
          return (
            <div className="Main">
              {list.map((item) => (
                <MealCard
                  display={item}
                  deleteCard={this.props.deleteCard}
                  changeTrigger3={this.props.changeTrigger3}
                />
              ))}
            </div>
          );
        }
    }
}

export default Main
