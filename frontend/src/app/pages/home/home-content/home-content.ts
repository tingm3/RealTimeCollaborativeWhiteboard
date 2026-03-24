import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-content.html',
  styleUrls: ['./home-content.css']
})
export class HomeContent {
  boards = [
    { name: 'Board 1', shared: false },
    { name: 'Board 2', shared: true },
  ];
}
