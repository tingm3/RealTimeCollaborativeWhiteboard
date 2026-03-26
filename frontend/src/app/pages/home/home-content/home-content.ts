import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Whiteboard, WhiteboardService } from '../../whiteboard/services/whiteboard-service';
import { ArtistService } from '../../../core/services/artist/artist-service';
import { SearchService } from '../../../core/services/search/searchService';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    public searchService: SearchService
  ) { }

  ngOnInit() {
    this.loadBoards();
    this.searchService.query$.subscribe(q => {
      this.whiteboardService.search(q, '').subscribe(boards => {
        this.boards = boards;
      });
    });
  }

  createBoard() {
    const name = prompt('Enter name of whiteboard:') || 'New Board';
    const artistId = Number(localStorage.getItem('id'));
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
      this.boards = boards;
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
      next: () => this.boards = this.boards.filter(b => b.id !== board.id),
      error: (err) => console.error('Failed to delete board', err),
    });
  }
  search() {
    this.whiteboardService.search(this.searchTitle, this.searchArtist).subscribe((boards) => {
      this.boards = boards;
    });
  }
}
