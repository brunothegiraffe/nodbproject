import React, { Component } from 'react';
import './reset.css'
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
    this.removeOwned = this.removeOwned.bind(this)
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
  removeOwned(e, game){
    e.preventDefault();
    return axios.delete(`/api/removeFromOnwed`, game)
    .then(response => {
      this.setState({
        gamesOwned: response.data
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
      <header className='header'>
      <p className='app_title'>Search for a Game</p>
      </header>
      <div className='search'>
      <button
        className = 'search_info' 
        onClick = {this.handleRandom}>
        Get a Random Game
        </button>
        {/* {games} */}
        <input
        className = 'search_info' 
        onChange={this.handleChange} 
        name="query" 
        type='text' 
        value={this.state.query} />
        <button
        className = 'search_info'
        type='submit'
        onClick={(e) => this.handleSearch(e, this.state.query)}>
        Search
        </button>
        <h1>Results</h1>
          <div className='displayed_games'>
          {games}  
          </div>
          <hr></hr>
          <div className='owned_list'>
            <Owned
              ownedList={this.state.gamesOwned}
            />
          </div>   

      </div>


      </div>
    )
  }
}

export default App;
