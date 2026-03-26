import { NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header-whiteboard',
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './header-whiteboard.html',
  styleUrl: './header-whiteboard.css'
})
export class HeaderWhiteboard {
  boardTitle = 'Project Whiteboard';
  isEditing = false;
  isDropdownOpen = false;

  @Output() onShare = new EventEmitter<void>();

  @ViewChild('titleInput') titleInput!: ElementRef;

  constructor(public authService: AuthService, private router: Router) { }

  get currentUsername(): string {
    return localStorage.getItem('username') || 'Guest';
  }

  get initials(): string {
    return this.currentUsername.slice(0, 1).toUpperCase();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  startEditing() {
    this.isEditing = true;
    setTimeout(() => this.titleInput.nativeElement.focus(), 0);
  }

  onTitleSave() {
    if (!this.boardTitle.trim()) {
      this.boardTitle = 'Project Whiteboard';
    }
    this.isEditing = false;
  }
}
