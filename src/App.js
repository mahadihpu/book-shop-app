import "./App.css";
import './custom.scss';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import React, { createContext, useState } from "react";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";

export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
    <Router>
       <Switch>
         <Route path="/admin">
           <Admin></Admin>
         </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  </UserContext.Provider>
  );
}

export default App;
