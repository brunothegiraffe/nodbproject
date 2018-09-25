const axios = require('axios');

let ownedGames = [];

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
        const { search } = req.query;
        console.log(req.query);
        console.log('hit the endpoint');
        
        console.log(`Querying GB api with string: ${search}`);
        return axios.get(`https://www.giantbomb.com/api/search/`,
            {
                params: {
                    "api_key": process.env.GB_KEY,
                    "resources": 'game',
                    "query": search,
                    "limit": 20,
                    "format": 'JSON'
                }
            })
        .then(response => {
            // console.log(response.data.results);
            
            res.status(200).send(response.data.results)
        })
        .catch(err => {
            console.log(err);
            res.status(err.response.status).send(err.response.data);
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
        // console.log();
        let gameIndex = ownedGames.findIndex(game => req.params.id === game.id)
        ownedGames.splice(gameIndex, 1)
        console.log(`Deleting item from owned games: ${req.params.id}`);
        res.status(200).send(ownedGames)
    },
    changeName: (req, res) =>{
        const {id} = req.params;
        const {name} = req.body;
        console.log('hit change name');
        

        let nameIndex= ownedGames.findIndex(game=> {            
            return game.id===Number(id)
        })
        console.log(nameIndex);

        ownedGames[nameIndex].name = name;
        res.status(200).send(ownedGames)
    }



}