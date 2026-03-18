import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'], // fixed typo
})
export class Toolbar implements OnInit {
  currentTool = 'pen';

  tools = [
    { name: 'select', icon: 'bi-mouse' }, // 🖱️
    { name: 'pen', icon: 'bi-pencil' }, // ✏️
    { name: 'rect', icon: 'bi-square' }, // ▭
    { name: 'circle', icon: 'bi-circle' }, // ⚪
    { name: 'text', icon: 'bi-type' }, // 🔤
    { name: 'note', icon: 'bi-stickies' }, // 🗒️
  ];

  constructor() { }

  ngOnInit(): void { }

  selectTool(tool: string) {
    this.currentTool = tool;
    console.log('Selected tool:', this.currentTool);
  }
}
