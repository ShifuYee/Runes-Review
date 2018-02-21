import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Summoner from './Summoner';
import MatchHistory from './MatchHistory';


export default class Root extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div id="root" className="container-fluid">
          <h1>Runes Review</h1>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/summoners" component={Summoner} />
            <Route path="/matches" component={MatchHistory} />
          </Switch>
        </div>
      </Router>
    );
  }
}
