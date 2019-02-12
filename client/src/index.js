import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import Home from './components/Home';
import Choose from './components/Choose';
import Market from './components/Market';
import CreateOffer from './components/CreateOffer';
import AppNavbar from './components/AppNavbar'
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


ReactDOM.render(
    <Router>
      <Switch>
        <div>
        <AppNavbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/choose" component={Choose} />
        <Route exact path="/createOffer" component={CreateOffer} />
        <Route path="/market" component={Market} />
        </div>
      </Switch>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
