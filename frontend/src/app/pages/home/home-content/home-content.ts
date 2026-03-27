import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  API_URL,
  Whiteboard,
  WhiteboardService,
} from '../../whiteboard/services/whiteboard-service';
import { ArtistService } from '../../../core/services/artist/artist-service';
import { SearchService } from '../../../core/services/search/searchService';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [
    WhiteboardService,
    { provide: API_URL, useValue: 'http://localhost:8080/whiteboards' },
  ],
  templateUrl: './home-content.html',
  styleUrls: ['./home-content.css'],
})
export class HomeContent implements OnInit {
  boards: Whiteboard[] = [];
  searchTitle = '';
  searchArtist = '';

  constructor(
    private whiteboardService: WhiteboardService,
    private artistService: ArtistService,
    private router: Router,
    public searchService: SearchService,
  ) {}

  ngOnInit() {
    this.loadBoards();
    this.searchService.query$.subscribe((q) => {
      this.whiteboardService.search(q, '').subscribe((boards) => {
        const myBoards = boards.filter(
          (board) => board.createdBy?.id === Number(localStorage.getItem('artistId')),
        );
        this.boards = myBoards;
      });
    });
  }

  createBoard() {
    const name = prompt('Enter name of whiteboard:') || 'New Board';
    const artistId = Number(localStorage.getItem('artistId'));
    // fetch the artist first
    this.artistService.getArtistById(artistId).subscribe({
      next: (artist) => {
        const newBoard: Whiteboard = {
          name: name,
          collaborators: [artist],
        };
        // create the whiteboard
        this.whiteboardService.createWhiteboard(newBoard).subscribe({
          next: (createdBoard) => {
            console.log('Created board ID:', createdBoard.id);
            this.loadBoards(); // refresh board list
            this.router.navigate(['/whiteboard', createdBoard.id]);
          },
          error: (err) => console.error('Failed to create board', err),
        });
      },
      error: (err) => console.error('Failed to get artist', err),
    });
  }

  loadBoards() {
    this.whiteboardService.getAllWhiteboards().subscribe((boards) => {
      console.log('Retrieved boards:', this.boards);
      const myBoards = boards.filter(
        (board) => board.createdBy?.id === Number(localStorage.getItem('artistId')),
      );
      this.boards = myBoards;
      console.log('Loaded boards:', this.boards);
    });
  }

  openBoard(board: Whiteboard) {
    this.router.navigate(['/whiteboard', board.id]);
  }

  deleteBoard(event: Event, board: Whiteboard) {
    event.stopPropagation(); // prevent opening the board
    if (!confirm(`Delete "${board.name}"?`)) return;
    this.whiteboardService.deleteWhiteboard(board.id!).subscribe({
      next: () => (this.boards = this.boards.filter((b) => b.id !== board.id)),
      error: (err) => console.error('Failed to delete board', err),
    });
  }
}
