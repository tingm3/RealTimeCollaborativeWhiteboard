import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderHome],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
