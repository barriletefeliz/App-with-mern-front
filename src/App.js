import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Components/Authentication/Login/Login';
import SignUp from './Components/Authentication/SignUp/SignUp';
import Projects from './Components/Projects/Projects';

import ProjectState from './Context/Projects/projectState'
import TaskState from './Context/TaskContext/TaskState'
import AlertState from './Context/alerts/alertState'
import AuthState from './Context/authContext/authState'
import tokenAuth from "./config/token";
import HigherOrderComp from './Components/rutas/HigherOrderComp'

//Revisar si hay un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
} 

function App() {

 
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <HigherOrderComp exact path='/projects' component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
