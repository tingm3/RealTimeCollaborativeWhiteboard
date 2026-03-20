import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/reusableComponent/footer/footer';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, HeaderHome, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing { }
