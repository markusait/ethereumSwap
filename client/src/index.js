import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import Home from './components/Home';
import Choose from './components/Choose';
import Market from './components/Market';
import CreateOffer from './components/CreateOffer';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {Navbar, NavItem, Icon} from 'react-materialize'


ReactDOM.render(
    <Router>
      <Switch>
        <div>
          <Navbar brand='Etherswaps' right>
            <NavItem><Link to="/choose"> Getting started </Link></NavItem>
            <NavItem><Link to="/createOffer">Create an Offer </Link></NavItem>
            <NavItem><NavItem><Link to="/market"><Icon>view_module</Icon></Link></NavItem></NavItem>
          </Navbar>
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
