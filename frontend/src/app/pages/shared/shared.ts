import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderHome } from '../../shared/reusableComponent/header/header-home/header-home';
import { SearchService } from '../../core/services/search/searchService';
import { API_URL, Whiteboard, WhiteboardService } from '../whiteboard/services/whiteboard-service';

@Component({
  selector: 'app-shared',
  imports: [CommonModule, RouterModule, HeaderHome],
  providers: [
    WhiteboardService,
    { provide: API_URL, useValue: 'http://localhost:8080/whiteboards/shared' },
  ],
  templateUrl: './shared.html',
  styleUrl: './shared.css',
})
export class Shared implements OnInit {
  sharedBoards: Whiteboard[] = [];

  constructor(
    private router: Router,
    public searchService: SearchService,
    private whiteboardService: WhiteboardService,
  ) {}

  ngOnInit() {
    this.loadBoards();
    this.searchService.query$.subscribe((q) => {
      this.whiteboardService.search(q, '').subscribe((boards) => {
        this.sharedBoards = boards;
      });
    });
  }

  openBoard(id: number) {
    this.router.navigate(['/whiteboard', id]);
  }

  loadBoards() {
    this.whiteboardService.getAllWhiteboards().subscribe((boards) => {
      this.sharedBoards = boards;
      console.log('Loaded boards:', this.sharedBoards);
    });
  }
}
