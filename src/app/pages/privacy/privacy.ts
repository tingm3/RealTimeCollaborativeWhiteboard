import { Component } from '@angular/core';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';
import { Footer } from '../../shared/reusableComponent/footer/footer';

@Component({
  selector: 'app-privacy',
  imports: [HeaderHome, Footer],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class Privacy { }
