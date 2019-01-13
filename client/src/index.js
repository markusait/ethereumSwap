import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Choose from './components/Choose/Choose';
import Market from './components/Market/Market';
import CreateOffer from './components/CreateOffer/CreateOffer';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/choose" component={Choose} />
        <Route exact path="/market" component={Market} />
        <Route exact path="/createOffer" component={CreateOffer} />
      </Switch>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
