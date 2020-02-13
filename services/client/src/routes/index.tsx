import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateTeam from './create-team/create-team.route';
import Login from './login/login.route';
import Register from './register/register.route';
import Home from './home/home.route';

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/create-team' component={CreateTeam} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
