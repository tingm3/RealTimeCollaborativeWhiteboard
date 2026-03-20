import { Component, ElementRef, ViewChild } from '@angular/core';
import { Toolbar } from '../../shared/reusableComponent/toolbar/toolbar';
import { HeaderWhiteboard } from '../../shared/reusableComponent/header/header-whiteboard/header-whiteboard';

@Component({
  selector: 'app-whiteboard',
  imports: [Toolbar, HeaderWhiteboard],
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D; // store context as class property

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!; // save context
    this.resizeCanvas(canvas);

    window.addEventListener('resize', () => {
      this.resizeCanvas(canvas);
    });

    this.drawDottedGrid(this.ctx, canvas.width, canvas.height, 20);
  }

  drawDottedGrid(ctx: CanvasRenderingContext2D, width: number, height: number, spacing: number) {
    ctx.fillStyle = '#ccc';
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2); // small dot
        ctx.fill();
      }
    }
  }

  resizeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.drawDottedGrid(this.ctx!, canvas.width, canvas.height, 20);
  }
}
