import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Choose from './components/Choose/Choose';

const Routes = () => {
  return (<BrowserRouter>
    <Switch>
      <Route exact="exact" path="/" component={Choose}/>
      <Route path="/choose" component={Choose}/>
    </Switch>
  </BrowserRouter>)
}
export default Routes;

// export default () => (
// <BrowserRouter>
//     <Switch>
//       <Route exact path="/" component={Choose}/>
//     </Switch>
// </BrowserRouter>
// );
