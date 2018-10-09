import React, { Component } from 'react';
import './reset.css'
import './App.css';
import axios from 'axios';
// import { HashRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Routes from './Routes'
import Game from './components/Game';
import Owned from './components/Owned';
import Button from './components/Button';

class App extends Component {
  constructor(){
    super()

    this.state = {
      gamesToDisplay: [],
      gamesOwned: [],
      searchResults: [],
      query: '',
      name: ''
    }

    // this.handleRandom = this.handleRandom.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addToOwned = this.addToOwned.bind(this)
    this.removeOwned = this.removeOwned.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  componentDidMount(){
    axios.get('/api/ownedList')
    .then(response => this.setState({
      gamesOwned: response.data
    }))
    .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSearch(e, query) {
    e.preventDefault();
    // let search = this.state.query;
    console.log(`Searching: ${query}`);
    return axios.get(`/api/gb?search=${query}`)
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
  removeOwned(id){
    // e.preventDefault();
    console.log(id);
    
    return axios.delete(`/api/removeFromOwned/${id}`)
    .then(response => {
      this.setState({
        gamesOwned: response.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  nameChange(id){
    const {name} = this.state
    console.log(id, name);
    
    return axios.put(`/api/changeName/${id}`, {name})
    .then(response => this.setState({
      gamesOwned: response.data
    }))
    .catch(err => {
      console.log(err);
    })
  }
  updateName(e){
    this.setState({
      name: e.target.value
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
      <div className='App'>
        <header className='header'>
          <p className='app_title'>Search for a Game</p>
        </header>
        <Button />
        <div className='search'>
          {/* <button
            className='search_info'
            onClick={this.handleRandom}>
            Get a Random Game
        </button> */}
          {/* {games} */}
          <input
            className='search_info'
            onChange={this.handleChange}
            name="query"
            type='text'
            value={this.state.query} />
          <button
            className='search_info'
            type='submit'
            onClick={(e) => this.handleSearch(e, this.state.query)}>
            Search
        </button>
          <h1>Results</h1>
          <div className='displayed_games'>
            {games}
          </div>
          <hr></hr>
              <button>Owned Games</button>
          <div className='owned_games_list'>
              <Owned
              ownedList={this.state.gamesOwned}
              removeOwned={this.removeOwned}
              nameChange={this.nameChange}
              updateName={this.updateName}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
