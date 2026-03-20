import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home',
  imports: [RouterLink, NgIf],
  templateUrl: './header-home.html',
  styleUrl: './header-home.css',
})
export class HeaderHome {
  @Input() variant: 'landing' | 'home' | 'auth' = 'home';
}
