import { Component } from '@angular/core';
import { Toolbar } from '../../shared/reusableComponent/toolbar/toolbar';
import { Header } from '../../shared/reusableComponent/header/header';

@Component({
  selector: 'app-whiteboard',
  imports: [Toolbar, Header],
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard { }
