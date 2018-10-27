import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, authed, user, ...rest}) => (
  <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} user={user}/>
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />
      }
    />
);

export default PrivateRoute;

