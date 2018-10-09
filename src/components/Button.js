import React, { Component } from 'react';
import axios from 'axios';

class Button extends Component{
    constructor() {
        super()

        this.state = {
            random: []
        }
    }

    handleRandom(){
      let randomNum = Math.floor(Math.random() * 20000)
      
      axios.get(`/api/gb/games/${randomNum}`)
      .then(res => {
        
        this.setState({
        random: res.data,
      })
      return console.log(res.data);
      
    })
    .catch(err => {
      return console.log('Not getting data', err);
      
    })
  }

    render() {
        let random = this.state.random.map( ( game, i ) => {
            return(
             <div key={ i }>
                {game.name}
             </div>
            )
        })
        return(
            <div>
                <button
                onClick={() => this.handleRandom()}
                >Get a Random Game</button>
                
                { random }
            </div>
        )
    }
}

export default Button;