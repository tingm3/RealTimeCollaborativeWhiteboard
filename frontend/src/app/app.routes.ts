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
import { Settings } from './pages/home/settings/settings';
import { authGuard } from './core/guards/auth.guard';
import { Shared } from './pages/shared/shared';

export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeContent },
      { path: 'settings', component: Settings },
    ],
  },
  { path: 'shared', component: Shared, canActivate: [authGuard] },
  { path: 'settings', component: Settings, canActivate: [authGuard] },
  { path: 'whiteboard', component: Whiteboard }, //this is for guests users
  { path: 'whiteboard/:id', component: Whiteboard, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }, // this catches any undefined url and redirects to the landing page
];
