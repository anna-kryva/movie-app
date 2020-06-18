import React from 'react';
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from './components/HomePage';
import MovieForm from './components/MovieForm';
import MovieCard from './components/MovieCard';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/create" component={ MovieForm } />
        <Route path="/movies/:id" component={ MovieCard } />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
