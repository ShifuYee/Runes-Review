import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Summoner from './Summoner';
import configs from '../../configs/configs.json';


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
            <Route path="/summoner" component={Summoner} />
          </Switch>
        </div>
      </Router>
    );
  }
}
