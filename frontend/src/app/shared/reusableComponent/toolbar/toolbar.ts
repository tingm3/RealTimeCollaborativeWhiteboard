import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
})
export class Toolbar {
  @Output() toolSelected: EventEmitter<string> = new EventEmitter(); // Event emitter
  @Output() undo = new EventEmitter<void>();
  @Output() trash = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  currentTool = 'pen';

  tools = [
    { name: 'select', icon: 'bi-mouse' },
    { name: 'pen', icon: 'bi-pencil' },
    { name: 'rect', icon: 'bi-square' },
    { name: 'circle', icon: 'bi-circle' },
    { name: 'text', icon: 'bi-type' },
    { name: 'note', icon: 'bi-stickies' },
  ];

  constructor() {}

  selectTool(tool: string) {
    this.currentTool = tool;
    this.toolSelected.emit(this.currentTool); // Emit the selected tool
  }

  triggerUndo() {
    this.undo.emit();
  }

  triggerTrash() {
    this.trash.emit();
  }

  triggerSave() {
    this.save.emit();
  }
}
