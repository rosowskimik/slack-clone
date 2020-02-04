import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

interface Props {}

export const Routes: React.FC<Props> = () => (
  <BrowserRouter>
    <Switch></Switch>
  </BrowserRouter>
);
