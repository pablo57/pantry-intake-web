import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import WeighOutPage from '../components/WeighOutPage';
import LandingPage from '../components/LandingPage';

import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
  <div>
      <Header />
      <Switch>
            <Route path="/" component={LandingPage} exact={true} />
          <Route path="/dashboard" component={DashboardPage} exact={true} />
          <Route path="/weigh-out" component={WeighOutPage} exact={true} />
          <Route component={NotFoundPage} />
      </Switch>
  </div>
</BrowserRouter>
);

export default AppRouter;
