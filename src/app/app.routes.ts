import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Whiteboard } from './pages/whiteboard/whiteboard';
import { Home } from './pages/home/home';
import { Landing } from './pages/landing/landing';
import { Privacy } from './pages/privacy/privacy';
import { Terms } from './pages/terms/terms';
import { Contact } from './pages/contact/contact';
import { Favorites } from './pages/favorites/favorites';
import { Settings } from './pages/home/settings/settings';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'home', component: Home, canActivate: [] },
  { path: 'favorites', component: Favorites, canActivate: [] },
  { path: 'whiteboard', component: Whiteboard, canActivate: [] }, //TODO: add auth guard and /id after whiteboard
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' } // this catches any undefined url and redirects to the landing page
];
