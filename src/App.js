import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Game from './Components/Game';
import Owned from './Components/Owned';

class App extends Component {
  constructor(){
    super()

    this.state = {
      gamesToDisplay: [],
      gamesOwned: [],
      searchResults: [],
      query: '',
    }

    this.handleRandom = this.handleRandom.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addToOwned = this.addToOwned.bind(this)
  }

  componentDidMount(){
    this.handleRandom();
  }

  handleRandom(event){
    let randomNum = Math.floor(Math.random() * 20000)

    axios.get(`/api/gb/games/${randomNum}`)
    .then(res => {

      this.setState({
        gamesToDisplay: res.data,
      })
      return console.log(res.data);
      
    })
    .catch(err => {
      return console.log('Not getting data', err);
      
    })
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSearch(e, query) {
    e.preventDefault();
    let search = this.state.query;
    console.log(`Searching: ${search}`);
    return axios.get(`/api/gb/search`, {params: { query: search }})
      .then(response => {
        console.log(response.data);
        this.setState({
          searchResults: response.data
        })
      })
      .catch(err => {
        return console.log('Not getting data', err);
      })

  }
  addToOwned(e, game){
    console.log(game);
    e.preventDefault();
    console.log(`Adding to owned to list: ${game.id}`);
    return axios.post('/api/ownedList', game)
    .then(response => {
      this.setState({
        gamesOwned: response.data,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render(){
    const games = this.state.searchResults.map((game, id) => (
        <Game
        {...game} 
        key={id}
        index={id}
        addToOwned={this.addToOwned}

        />

    ))
    return(
      
      <div className = 'App'>
        <button onClick = {this.handleRandom}>Get a Random Game</button>
        {/* {games} */}
        <input onChange={this.handleChange} name="query" type='text' value={this.state.query} />
        <button
          type='submit'
          onClick={(e) => this.handleSearch(e, this.state.query)}>Search</button>
        {games}
        <Owned ownedList={this.state.gamesOwned} />
      </div>
    )
  }
}

export default App;
