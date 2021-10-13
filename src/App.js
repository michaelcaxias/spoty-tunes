import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/search" component={ Search } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
