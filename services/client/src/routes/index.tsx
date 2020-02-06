import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
