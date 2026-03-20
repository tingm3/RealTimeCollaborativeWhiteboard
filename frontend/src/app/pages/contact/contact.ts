import { Component } from '@angular/core';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';
import { Footer } from '../../shared/reusableComponent/footer/footer';

@Component({
  selector: 'app-contact',
  imports: [HeaderHome, Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact { }
