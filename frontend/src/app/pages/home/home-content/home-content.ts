import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Whiteboard, WhiteboardService } from '../../whiteboard/services/whiteboard-service';
import { ArtistService } from '../../../core/services/artist/artist-service';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-content.html',
  styleUrls: ['./home-content.css'],
})
export class HomeContent implements OnInit {
  boards: Whiteboard[] = [];

  constructor(
    private whiteboardService: WhiteboardService,
    private artistService: ArtistService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadBoards();
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
}
