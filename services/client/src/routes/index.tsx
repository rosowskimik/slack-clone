import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './register/register.route';

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
