'use strict';
import axios from 'axios';

/* -----------------    Action Types    ------------*/

const INITIALIZE = 'INITIALIZE_SUMMONER';
const CREATE = 'CREATE_SUMMONER';
const REMOVE = 'REMOVE_SUMMONER';

/* -----------------    Action Creators    --------*/

const init = summoners => ({ type: INITIALIZE, summoners });
const create = summoner => ({ type: CREATE, summoner });
const remove = id => ({ type: REMOVE, id });

/* ------------       THUNK CREATORS     ------------------ */

export const fetchSummoners = () => dispatch => {
  axios
    .get('/summoners')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching summoners failed', err));
};

export const addSummoner = (summoner, history) => dispatch => {
  return axios
    .post('/summoners', summoner)
    .then(res => res.data)
    .then(newSummoner => {
      dispatch(create(newSummoner));
      history.push(`/summoners`);
    })
    .catch(err => console.error(`Creating summoner failed: ${summoner}`, err));
};

export const removeSummoner = (id, history) => dispatch => {
  return axios
    .delete(`/summoner/${id}`)
    .then(() => {
      console.log('This is the history: ', history);
      dispatch(remove(id));
      history.push(`/summoners`);
    })
    .catch(err => console.error(`Removing summoner failed: ${id}`, err));
};

/* -----------------    Reducer    ---------------*/

export default function reducer(summoners = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.summoners;

    case CREATE:
      return [...summoners, action.summoner];

    case REMOVE:
      return summoners.filter(summoner => summoner.id !== action.id);

    default:
      return summoners;
  }
}
