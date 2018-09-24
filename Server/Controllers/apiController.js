const axios = require('axios');

const ownedGames = [];

module.exports = {
    getIgdbGame: (req, res) => {
        const { id } = req.params;
        console.log(`fetching game id: ${id}`);
        let randomNum = Math.floor(Math.random() * 100001)
    
        return axios.get(`https://api-endpoint.igdb.com/games/${randomNum}?fields=*`, {
            headers: {
                "user-key": process.env.IGDB_KEY,
                Accept: "application/json"
            }
        })
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => {
            res.status(err.response.status).send(err.response.data);
            console.log(err);
          })
    },
    getGbGame: (req, res) => {
        const { id } = req.params;
        console.log(`fetching game id: ${id}`);
        return axios.get(`https://www.giantbomb.com/api/games/`, 
        {
            params: {
                "api_key": process.env.GB_KEY,
                "filter": `id:${id}`,
                "format": 'JSON'
            }
        })
        .then(response => {
           
            
            res.status(200).send(response.data.results)
        })
        .catch(err => {
            res.status(err.response.status).send(err.response.data);
            console.log(err);
          })
    },
    searchGb: (req, res) => {
        const { query } = req.query;
        console.log(req.query);
        
        console.log(`Querying GB api with string: ${query}`);
        return axios.get(`https://www.giantbomb.com/api/search/`, 
        {
            params: {
                "api_key": process.env.GB_KEY,
                "resources": 'game',
                "query": query,
                "limit": 10,
                "format": 'JSON'
            }
        })
        .then(response => {
            // console.log(response.data.results);
            
            res.status(200).send(response.data.results)
        })
        .catch(err => {
            res.status(err.response.status).send(err.response.data);
            console.log(err);
          })
    },
    getOwned: (req, res) => {
        res.status(200).send(ownedGames);
    },
    addOwned: (req, res) => {
        ownedGames.push(req.body)
        console.log(`Adding new game to list: ${req.body.id}`);
        res.status(201).send(ownedGames);
        
    },
    removeFromOwned: (req, res) =>{
        ownedGames.splice(ownedGames[id], 1)
        console.log(`Deleting item from owned games: ${req.body.id}`);
        res.status(200).send(ownedGames)
    }



}