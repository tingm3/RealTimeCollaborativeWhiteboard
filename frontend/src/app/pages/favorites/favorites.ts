import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';

@Component({
  selector: 'app-favorites',
  imports: [HeaderHome, RouterLink, NgFor, NgIf, NgClass],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css', '../home/home.css']
})
export class Favorites {
  boards = [
    { name: 'Q3 Sprint Planning', shared: true },
    { name: 'App Redesign Flow', shared: true },
  ];
}
