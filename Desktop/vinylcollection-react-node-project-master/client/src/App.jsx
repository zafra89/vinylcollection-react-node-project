import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/login">
                  <LoginPage/>
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
