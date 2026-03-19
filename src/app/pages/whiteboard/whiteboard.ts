import { Component } from '@angular/core';
import { Toolbar } from '../../shared/reusableComponent/toolbar/toolbar';
import { HeaderWhiteboard } from '../../shared/reusableComponent/header/header-whiteboard/header-whiteboard';

@Component({
  selector: 'app-whiteboard',
  imports: [Toolbar, HeaderWhiteboard,],
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard { }
