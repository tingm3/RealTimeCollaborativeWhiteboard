import { Component } from '@angular/core';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';
import { Footer } from '../../shared/reusableComponent/footer/footer';

@Component({
  selector: 'app-terms',
  imports: [HeaderHome, Footer],
  templateUrl: './terms.html',
  styleUrl: './terms.css',
})
export class Terms { }
