import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import UserMenuPage from './pages/UserMenuPage/UserMenuPage';

function App() {
  return (
      <Router>
          <Switch>
          <Route path="/user-menu">
                  <UserMenuPage/>
              </Route>
              <Route path="/register">
                  <RegisterPage/>
              </Route>
              <Route path="/">
                  <HomePage/>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
