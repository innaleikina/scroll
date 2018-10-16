

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/pages/Main";


const App = () => (
  <Router>
    <div>
  
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/search" component={Main} />
        <Route exact path="/published" component={Main} />
        <Route exact path="/user" component={Main} />
  
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
