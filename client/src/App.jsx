import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import UserMenuPage from './pages/UserMenuPage/UserMenuPage';
import AddVinylPage from "./pages/AddVinylPage/AddVinylPage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import PrivateRoute from "./shared/components/PrivateRoute/PrivateRoute";

function App() {
  return (
      <Router>
          <Switch>
              <PrivateRoute component={UserMenuPage} path="/user-menu" exact />
              <PrivateRoute component={CollectionPage} path="/collection" exact />
              <PrivateRoute component={AddVinylPage} path="/add-vinyl" exact />
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
