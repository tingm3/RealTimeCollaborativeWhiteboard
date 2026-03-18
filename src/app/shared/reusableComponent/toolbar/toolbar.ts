import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar implements OnInit {
  currentTool = 'pen';

  ngOnInit(): void {
    // plain DOM method (works for small examples)
    document.querySelectorAll('.tool-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tool-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const tool = btn.getAttribute('data-tool');
        if (tool) this.currentTool = tool;
        console.log('Selected tool:', this.currentTool);
      });
    });
  }
}
