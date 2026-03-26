import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';

@Component({
  selector: 'app-shared',
  imports: [CommonModule, RouterModule, HeaderHome],
  templateUrl: './shared.html',
  styleUrl: './shared.css',
})
export class Shared implements OnInit {
  sharedBoards: { id: number; name: string }[] = [];
  loading = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http
      .get<{ id: number; name: string }[]>('http://localhost:8080/whiteboards/shared')
      .subscribe({
        next: (boards) => {
          this.sharedBoards = boards;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  openBoard(id: number) {
    this.router.navigate(['/whiteboard', id]);
  }
}
