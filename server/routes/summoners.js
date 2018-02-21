'use strict';
const router = require('express').Router();
const axios = require('axios');
const configs = require('../../configs/configs.json'); // Replace with template
const models = require('../database/models');
const Summoner = models.Summoner;

router.get('/', (req, res, next) => {
  Summoner
    .findAll({ where: req.query })
    .then(summoners => res.json(summoners))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const summonerName = req.body;
  const searchSummonerByName = `${configs.riotApiEndpoint}/summoner${configs.apiVersion}/summoners/by-name/${summonerName}${configs.apiQuery}${configs.apiKey}`;
  axios
    .get(searchSummonerByName)
    .then(summonerInfo => {
      const data = summonerInfo.data;
      if (data) {
        const retrieveSummonerSoloRank = `${configs.riotApiEndpoint}/league${configs.apiVersion}/positions/by-summoner/${data.id}${configs.apiQuery}${configs.apiKey}`;
        let sumInfo = {
          name: data.name,
          summonerId: data.id,
          accountId: data.accountId
        };
        return axios.get(retrieveSummonerSoloRank)
                    .then(rankedQueues => {
                      if (rankedQueues.length > 0) {
                        rankedQueues.forEach(queue => {
                          if (queue.queueType === 'RANKED_SOLO_5x5'){
                            sumInfo.tier = queue.tier;
                            sumInfo.rank = queue.rank;
                          }
                        });
                      } else {
                        sumInfo.tier = 'Unranked';
                        sumInfo.rank = '';
                      }
                      console.log(sumInfo);
                    })
                    .then(() => {
                      Summoner
                        .create(sumInfo)
                        .then(summoner => res.status(201).json(summoner));
                    });
      } else {
        res.send('Could not find summoner!');
      }
    })
    .catch(next);
});

router.param('accountId', (req, res, next, id) => {
  Summoner
  .findById(id)
  .then(summoner => {
    if (!summoner) {
      const err = Error('Summoner not found!');
      err.status = 404;
      throw err;
    }
    req.summoner = summoner;
    next();
    return null;
  })
  .catch(next);
});

// router.get('/:accountId', (req, res, next) => {
//   res.json(req.student);
//   const { summonerName } = req.params;
//   console.log('summonerName: ', summonerName);
//   const searchSummonerByName = `${configs.riotApiEndpoint}/summoner${configs.apiVersion}/summoners/by-name/${summonerName}${configs.apiQuery}${configs.apiKey}`;
//   axios
//     .get(searchSummonerByName)
//     .then(summonerInfo => {
//       res.json(summonerInfo.data);
//     })
//     .catch(next);
// });

module.exports = router;
