import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/reusableComponent/header/header';
import { Content } from './content/content';
import { Footer } from './shared/reusableComponent/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Content, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RealTimeCollaborativeWhiteboard');
}
