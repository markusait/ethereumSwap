import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Choose from './components/Choose/Choose';
import Market from './components/Market/Market';
import MarketOfferModal from './components/MarketOfferModal/MarketOfferModal';
import CreateContract from './components/CreateContract/CreateContract';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/choose" component={Choose} />
        <Route exact path="/market" component={Market} />
        <Route exact path="/createContract" component={CreateContract} />
        {
          // <Route path="/marketOfferModal" component={MarketOfferModal} />
        }
      </Switch>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
