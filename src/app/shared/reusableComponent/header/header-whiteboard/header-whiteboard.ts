import { NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-whiteboard',
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './header-whiteboard.html',
  styleUrl: './header-whiteboard.css'
})
export class HeaderWhiteboard {
  boardTitle = 'Project Whiteboard';
  isEditing = false;

  @ViewChild('titleInput') titleInput!: ElementRef;

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
