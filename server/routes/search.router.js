const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
// require('dotenv').config();
const router = express.Router();

// GET /text?search=elephants+funny+sfw
// req.query.search // 'elephants funny sfw'

// GET /text?search[]=elephants&search[]=funny&search[]=sfw
// req.query.search // [ 'elephants', 'funny', 'sfw' ];
// return all GIFs from Giphy following the queried paramater
router.get('/text', (req,res) => {
  /**
   * req.body JSON data looks like":
   * 
   * { "search": "elephants" }
   */
  console.log('search GET', req.body);
  console.log('query is', req.query)
  // query GIPHY with an api_key, a search string (q), and set a limit of 10 gifs
  axios.get('https://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: process.env.GIPHY_API_KEY,
      q: req.query,
      limit: 10
    }
  })
  // on success send back GIPHY data to client
    .then(giphyRes => {
      console.log('GIPHY DATA', giphyRes.data)
      res.send(giphyRes.data.data);
    })
    // if not successful send back error
    .catch((error) => {
      console.log('Giphy request failed... ', error);
      
      res.sendStatus(500);
    });
});

module.exports = router;