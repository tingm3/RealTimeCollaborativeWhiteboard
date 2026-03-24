import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Whiteboard } from './pages/whiteboard/whiteboard';
import { Home } from './pages/home/home';
import { HomeContent } from './pages/home/home-content/home-content';
import { Landing } from './pages/landing/landing';
import { Privacy } from './pages/privacy/privacy';
import { Terms } from './pages/terms/terms';
import { Contact } from './pages/contact/contact';
import { Favorites } from './pages/favorites/favorites';
import { Settings } from './pages/home/settings/settings';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeContent },
      { path: 'settings', component: Settings }
    ]
  },
  { path: 'favorites', component: Favorites, canActivate: [authGuard] },
  { path: 'settings', component: Settings, canActivate: [authGuard] },
  { path: 'whiteboard', component: Whiteboard, canActivate: [authGuard] }, //TODO: add auth guard and /id after whiteboard
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }, // this catches any undefined url and redirects to the landing page
];
