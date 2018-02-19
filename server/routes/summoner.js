'use strict';
const router = require('express').Router();
const axios = require('axios');
const configs = require('../../configs/configs.json'); // Replace with template


router.get('/:summonerName', (req, res, next) => {
  const { summonerName } = req.params;
  console.log('summonerName: ', summonerName);
  const searchSummonerByName = `${configs.riotApiEndpoint}/summoner${configs.apiVersion}/summoners/by-name/${summonerName}${configs.apiQuery}${configs.apiKey}`;
  axios
    .get(searchSummonerByName)
    .then(summonerInfo => {
      res.json(summonerInfo.data);
    })
    .catch(next);
});

module.exports = router;
