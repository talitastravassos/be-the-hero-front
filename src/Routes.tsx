import React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NewIncident from './pages/NewIncident';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { getOngID } from './services/localStorage';

interface Props {
  component: React.ComponentType<RouteProps>;
  path: string;
  exact: boolean;
};

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
  const loggedIn = getOngID();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to='/login'
            />
          );
        }
      }}
    />
  );
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute path='/' exact component={Profile} />
        <ProtectedRoute path='/incidents/new' exact component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}
