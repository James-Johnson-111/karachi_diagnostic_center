import { lazy, Suspense } from 'react';
import './App.css';

import { Redirect, Route, Switch } from "react-router-dom";

// IMPORT COMPONENTS AND PAGES
const Login = lazy( () => import('./pages/Login/Login') );
const Dashboard = lazy( () => import('./pages/Dashboard/Dashboard') );
const GetToken = lazy( () => import('./pages/GetToken/GetToken') );
const TokenStatus = lazy( () => import('./pages/TokenStatus/TokenStatus') );
const CandidateForm = lazy( () => import('./pages/CandidateForm/CandidateForm') );

const App = () => {

  const Sus = ( props ) => {

    return <Suspense fallback={ <div>Loading...</div> }> { props.content } </Suspense>

  }

  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" render={ () => <Sus content={ <Login /> } /> } />
        <Route exact path="/dashboard" render={ () => <Sus content={ <Dashboard /> } /> } />
        <Route exact path="/candidate" render={ () => <Sus content={ <Dashboard /> } /> } />
        <Route exact path="/report" render={ () => <Sus content={ <Dashboard /> } /> } />
        <Route exact path="/candidate/view=:view" render={ () => <Sus content={ <Dashboard /> } /> } />
        <Route exact path="/users/view=:view" render={ () => <Sus content={ <Dashboard /> } /> } />

        
        <Route exact path="/tokenstatus" render={ () => <Sus content={ <TokenStatus /> } /> } />
        <Route exact path="/gettoken" render={ () => <Sus content={ <GetToken /> } /> } />
        <Route exact path="/candidate/view=:view/:token" render={ () => <Sus content={ <CandidateForm /> } /> } />
      </Switch>
    </>
  );

}

export default App;
