'use strict';
const router = require('express').Router();
const axios = require('axios');
const configs = require('../../configs/configs.json'); // Replace with template


router.get('/:accountId', (req, res, next) => {
  const { accountId } = req.params;
  console.log('accountId: ', accountId);
  const recentMatchlist = `${configs.riotApiEndpoint}/match${configs.apiVersion}/matchlists/by-account/${accountId}/recent${configs.apiQuery}${configs.apiKey}`;
  axios
    .get(recentMatchlist)
    .then(summonerInfo => {
      res.json(summonerInfo.data);
    })
    .catch(next);
});

module.exports = router;

