import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Header } from './shared/reusableComponent/header/header';
import { Home } from './pages/home/home';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Home, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RealTimeCollaborativeWhiteboard');
}
