import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';
import { Footer } from '../../shared/reusableComponent/footer/footer';

@Component({
  selector: 'app-home',
  imports: [HeaderHome, RouterLink, NgClass, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  boards = [
    { name: 'Q3 Sprint Planning', shared: true },
    { name: 'App Redesign Flow', shared: true },
    { name: 'Weekly Retro', shared: false },
    { name: 'Brainstorm Session', shared: false },
  ];
}
