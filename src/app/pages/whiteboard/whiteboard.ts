import { Component } from '@angular/core';
import { Toolbar } from '../../shared/reusableComponent/toolbar/toolbar';

@Component({
  selector: 'app-whiteboard',
  imports: [Toolbar],
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard { }
