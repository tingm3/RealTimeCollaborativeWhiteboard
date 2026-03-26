import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';
;
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Toolbar } from '../../shared/reusableComponent/toolbar/toolbar';
import { HeaderWhiteboard } from '../../shared/reusableComponent/header/header-whiteboard/header-whiteboard';
import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

@Component({
  selector: 'app-whiteboard',
  imports: [Toolbar, HeaderWhiteboard, CommonModule, FormsModule],
  templateUrl: './whiteboard.html',
  styleUrl: './whiteboard.css',
})
export class Whiteboard {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  private stompClient!: Stomp.Client;
  private clientId = Math.random().toString(36).substr(2, 9); // Unique ID for this client
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  currentTool: string = 'pen';
  whiteboardId!: number;
  showShareModal = false;
  allUsers: { id: number; username: string; email: string }[] = [];
  collaborators: { id: number; username: string; email: string }[] = [];
  searchQuery = '';


  get filteredUsers() {
    const q = this.searchQuery.toLowerCase();
    return this.allUsers.filter(
      (u) =>
        (u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
        !this.collaborators.find((c) => c.id === u.id)
    );
  }
  // Drawing state
  private drawing = false; // Track if currently drawing (for pen, rect, circle)
  private isPanning = false; // Track if the canvas is being dragged
  private startX = 0; // Starting x-coordinate of the drag
  private startY = 0; // Starting y-coordinate of the drag
  private drawings: any[] = []; // for storing all drawn shapes for redraw
  private currentStroke: { x: number; y: number }[] = []; // for storing points of the current pen stroke
  MIN_SCALE = 0.2;
  MAX_SCALE = 5;
  private viewportTransform = {
    x: 0,
    y: 0,
    scale:
      1,
  };

  ngOnInit() {
    this.whiteboardId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('whiteboardId:', this.whiteboardId);
  }

  ngAfterViewInit() {
    this.connect();

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.resizeCanvas(canvas);

    window.addEventListener('resize', () => {
      this.resizeCanvas(canvas);
    });

    this.drawDottedGrid(this.ctx, canvas.width, canvas.height, 20);

    // Mouse events
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    canvas.addEventListener('wheel', (e) => this.onMouseWheel(e));
  }

  onToolSelected(tool: string) {
    this.currentTool = tool;
    if (tool === 'select') {
      this.canvasRef.nativeElement.style.cursor = 'grab'; // Change cursor to move icon
    } else {
      this.canvasRef.nativeElement.style.cursor = 'crosshair'; // Default cursor for drawing
    }
  }

  onUndo() {
    // Find the last shape drawn by this client
    for (let i = this.drawings.length - 1; i >= 0; i--) {
      if (this.drawings[i].clientId === this.clientId) {
        const lastDrawing = this.drawings.splice(i, 1)[0]; // remove it
        this.redrawCanvas();

        // Send erase to server using the ID
        this.stompClient.publish({
          destination: '/app/erase',
          body: lastDrawing.id,
        });
        break; // stop after removing one
      }
    }
  }

  onTrash() {
    if (confirm('Are you sure you want to clear the whiteboard?')) {
      this.drawings = [];
      this.redrawCanvas();
      this.stompClient.publish({
        destination: '/app/erase',
        body: 'ALL',
      });
    }
  }

  onSave() {
    // TODO: Implement save functionality (e.g., export canvas as image or save drawing data)
  }
  openShareModal() {
    this.showShareModal = true;
    this.searchQuery = '';

    this.http
      .get<{ id: number; username: string; email: string }[]>('http://localhost:8080/api/artists')
      .subscribe((users) => (this.allUsers = users));

    this.http
      .get<{ id: number; username: string; email: string }[]>(
        `http://localhost:8080/whiteboards/${this.whiteboardId}/collaborators`  // no /api
      )
      .subscribe((collabs) => (this.collaborators = collabs));
  }


  closeShareModal() {
    this.showShareModal = false;
  }

  addCollaborator(user: { id: number; username: string; email: string }) {
    this.http
      .post(`http://localhost:8080/api/whiteboards/${this.whiteboardId}/collaborators`, {
        userId: user.id,
      })
      .subscribe(() => {
        this.collaborators.push(user);
      });
  }

  removeCollaborator(user: { id: number; username: string; email: string }) {
    this.http
      .delete(`http://localhost:8080/api/whiteboards/${this.whiteboardId}/collaborators/${user.id}`)
      .subscribe(() => {
        this.collaborators = this.collaborators.filter((c) => c.id !== user.id);
      });
  }

  // =========================
  // Mouse Handlers
  // =========================

  onMouseDown(event: MouseEvent) {
    const { offsetX, offsetY } = event;

    this.startX = offsetX;
    this.startY = offsetY;

    if (this.currentTool === 'select') {
      this.isPanning = true;
    }

    const scale = this.viewportTransform.scale;
    const tx = this.viewportTransform.x;
    const ty = this.viewportTransform.y;

    const worldX = (offsetX - tx) / scale;
    const worldY = (offsetY - ty) / scale;

    if (this.currentTool === 'pen') {
      this.drawing = true;
      this.ctx.beginPath();
      this.ctx.moveTo(worldX, worldY);
    }

    if (this.currentTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        const scale = this.viewportTransform.scale;

        // Keep font visually constant on screen
        const fontSize = 16 / scale;

        this.ctx.fillStyle = 'black';
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.fillText(text, worldX, worldY);

        let textObj = {
          type: 'text',
          text: text,
          x: worldX,
          y: worldY,
          font: `${fontSize}px Arial`,
        };

        this.onDraw(textObj);
      }
    }

    if (this.currentTool === 'note') {
      const text = prompt('Enter text:');
      const scale = this.viewportTransform.scale;
      const width = 120 / scale;
      const height = 100 / scale;
      const fontSize = 14 / scale;
      const textOffsetX = 10 / scale;
      const textOffsetY = 20 / scale;

      this.drawNote(text, worldX, worldY, width, height, fontSize, textOffsetX, textOffsetY);

      let note = {
        type: 'note',
        text: text || 'Note',
        x: worldX,
        y: worldY,
        width: width,
        height: height,
        font: `${fontSize}px Arial`,
        textOffsetX: textOffsetX,
        textOffsetY: textOffsetY,
      };

      this.onDraw(note);
    }

    if (['rect', 'circle'].includes(this.currentTool)) {
      this.drawing = true;
    }
  }

  onMouseMove(event: MouseEvent) {
    const { offsetX, offsetY } = event;

    if (this.isPanning) {
      const localX = event.clientX;
      const localY = event.clientY;

      // Calculate the distance moved and update the canvas offset
      const dx = localX - this.startX;
      const dy = localY - this.startY;

      // Update the offset for panning the canvas
      this.viewportTransform.x += dx;
      this.viewportTransform.y += dy;

      // Update start positions for next move
      this.startX = localX;
      this.startY = localY;

      this.redrawCanvas();
    }

    if (!this.drawing) return;

    if (this.currentTool === 'pen') {
      const scale = this.viewportTransform.scale;
      const offsetXTransform = this.viewportTransform.x;
      const offsetYTransform = this.viewportTransform.y;

      // Convert screen to world
      const worldX = (offsetX - offsetXTransform) / scale;
      const worldY = (offsetY - offsetYTransform) / scale;

      this.ctx.lineTo(worldX, worldY);
      this.ctx.stroke();

      // store point in current stroke
      this.currentStroke.push({ x: worldX, y: worldY });
    } else if (['rect', 'circle'].includes(this.currentTool)) {
      // Temporary drawing for preview
      this.redrawCanvas();

      const scale = this.viewportTransform.scale;
      const tx = this.viewportTransform.x;
      const ty = this.viewportTransform.y;

      // Convert start point
      const startWorldX = (this.startX - tx) / scale;
      const startWorldY = (this.startY - ty) / scale;

      // Convert current mouse
      const worldX = (offsetX - tx) / scale;
      const worldY = (offsetY - ty) / scale;

      if (this.currentTool === 'rect') {
        this.drawRect(startWorldX, startWorldY, worldX, worldY);
      } else if (this.currentTool === 'circle') {
        this.drawCircle(startWorldX, startWorldY, worldX, worldY);
      }
    }
  }

  onMouseUp(event: MouseEvent) {
    const { offsetX, offsetY } = event;

    if (this.isPanning) {
      this.isPanning = false;
    }

    if (!this.drawing) return;

    if (this.currentTool === 'pen') {
      let stroke = {
        type: 'pen',
        points: [...this.currentStroke], // you collect points in mousemove
        lineWidth: this.ctx.lineWidth,
      };
      this.onDraw(stroke);
      this.currentStroke = []; // reset for next stroke
    }

    const scale = this.viewportTransform.scale;
    const tx = this.viewportTransform.x;
    const ty = this.viewportTransform.y;

    // Convert start point
    const startWorldX = (this.startX - tx) / scale;
    const startWorldY = (this.startY - ty) / scale;

    // Convert end point
    const worldX = (offsetX - tx) / scale;
    const worldY = (offsetY - ty) / scale;

    if (this.currentTool === 'rect') {
      this.drawRect(startWorldX, startWorldY, worldX, worldY);

      let rect = {
        type: 'rect',
        x1: startWorldX,
        y1: startWorldY,
        x2: worldX,
        y2: worldY,
        lineWidth: this.ctx.lineWidth,
      };

      this.onDraw(rect);
    }

    if (this.currentTool === 'circle') {
      this.drawCircle(startWorldX, startWorldY, worldX, worldY);

      let circle = {
        type: 'circle',
        x1: startWorldX,
        y1: startWorldY,
        x2: worldX,
        y2: worldY,
        lineWidth: this.ctx.lineWidth,
      };

      this.onDraw(circle);
    }

    this.drawing = false;
    this.ctx.beginPath();
  }

  onMouseWheel(ev: WheelEvent) {
    const oldScale = this.viewportTransform.scale;
    const tx = this.viewportTransform.x;
    const ty = this.viewportTransform.y;

    const mouseX = ev.clientX;
    const mouseY = ev.clientY;

    // Exponential zoom (smooth & consistent)
    const zoomIntensity = 0.001;
    const zoom = Math.exp(-ev.deltaY * zoomIntensity);

    let newScale = oldScale * zoom;

    // Clamp scale
    newScale = Math.max(this.MIN_SCALE, Math.min(this.MAX_SCALE, newScale));

    // Stop if no change
    if (newScale === oldScale) return;

    // Convert mouse to world coords BEFORE zoom
    const worldX = (mouseX - tx) / oldScale;
    const worldY = (mouseY - ty) / oldScale;

    // Compute new offset so zoom is centered on cursor
    const newX = mouseX - worldX * newScale;
    const newY = mouseY - worldY * newScale;

    this.viewportTransform.scale = newScale;
    this.viewportTransform.x = newX;
    this.viewportTransform.y = newY;

    this.redrawCanvas();
  }

  // =========================
  // Drawing Tools
  // =========================

  private redrawCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    this.ctx.setTransform(
      this.viewportTransform.scale,
      0,
      0,
      this.viewportTransform.scale,
      this.viewportTransform.x,
      this.viewportTransform.y,
    );
    this.drawDottedGrid(this.ctx, canvas.width, canvas.height, 20); // redraw grid

    for (const shape of this.drawings) {
      if (shape.type === 'rect') {
        this.ctx.lineWidth = shape.lineWidth * 2 || 2;
        this.drawRect(shape.x1, shape.y1, shape.x2, shape.y2);
        this.ctx.lineWidth = 1; // reset line width
      } else if (shape.type === 'circle') {
        this.ctx.lineWidth = shape.lineWidth * 2 || 2;
        this.drawCircle(shape.x1, shape.y1, shape.x2, shape.y2);
        this.ctx.lineWidth = 1; // reset line width
      } else if (shape.type === 'pen') {
        this.ctx.beginPath();
        this.ctx.lineWidth = shape.lineWidth * 2 || 2;

        const points = shape.points;
        if (points.length > 0) {
          this.ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
          }
          this.ctx.stroke();
        }
        this.ctx.beginPath(); // reset path for next shape
        this.ctx.lineWidth = 1; // reset line width
      } else if (shape.type === 'text') {
        this.ctx.fillStyle = 'black';
        this.ctx.font = shape.font;
        this.ctx.fillText(shape.text, shape.x, shape.y);
      } else if (shape.type === 'note') {
        this.drawNote(
          shape.text,
          shape.x,
          shape.y,
          shape.width,
          shape.height,
          shape.font,
          shape.textOffsetX,
          shape.textOffsetY,
        );
      }
    }
  }

  drawRect(x1: number, y1: number, x2: number, y2: number) {
    const width = x2 - x1;
    const height = y2 - y1;
    this.ctx.strokeRect(x1, y1, width, height);
  }

  drawCircle(x1: number, y1: number, x2: number, y2: number) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    this.ctx.beginPath();
    this.ctx.arc(x1, y1, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  drawNote(
    text: string | null,
    worldX: number,
    worldY: number,
    width: number,
    height: number,
    fontSize: number,
    textOffsetX: number,
    textOffsetY: number,
  ) {
    const scale = this.viewportTransform.scale;
    this.ctx.fillStyle = '#fff9a8';
    this.ctx.fillRect(worldX, worldY, width, height);
    this.ctx.strokeStyle = '#e6d200';
    this.ctx.strokeRect(worldX, worldY, width, height);
    this.ctx.fillStyle = '#000';
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillText(text || 'Note', worldX + textOffsetX, worldY + textOffsetY);
    this.ctx.strokeStyle = 'black';
  }

  // =========================
  // Grid & Resize
  // =========================

  drawDottedGrid(ctx: CanvasRenderingContext2D, width: number, height: number, spacing: number) {
    const scale = this.viewportTransform.scale;
    const offsetX = this.viewportTransform.x;
    const offsetY = this.viewportTransform.y;

    ctx.fillStyle = '#ccc';

    // Adjust spacing based on zoom
    const minPixelSpacing = 20; // desired spacing in screen pixels
    const adjustedSpacing =
      spacing * Math.pow(2, Math.round(Math.log2(minPixelSpacing / (spacing * scale))));

    // Convert screen offset → world coordinates
    const worldOffsetX = -offsetX / scale;
    const worldOffsetY = -offsetY / scale;

    // Snap to grid
    const startX = Math.floor(worldOffsetX / adjustedSpacing) * adjustedSpacing;
    const startY = Math.floor(worldOffsetY / adjustedSpacing) * adjustedSpacing;

    // Visible bounds
    const endX = startX + width / scale;
    const endY = startY + height / scale;

    for (let x = startX; x < endX; x += adjustedSpacing) {
      for (let y = startY; y < endY; y += adjustedSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1 / scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  resizeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.redrawCanvas();
  }

  // =========================
  // For backend communication
  // =========================

  private onDraw(shape: any) {
    shape.clientId = this.clientId;
    shape.id = null; // no ID yet

    // Draw locally
    this.drawings.push(shape);
    this.redrawCanvas();

    // Send to server
    this.stompClient.publish({
      destination: '/app/draw',
      body: JSON.stringify(shape),
    });
  }

  private removeShapeById(id: number) {
    const index = this.drawings.findIndex((shape) => shape.id === id);
    if (index !== -1) {
      this.drawings.splice(index, 1);
      this.redrawCanvas();
    }
  }

  private connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket as any, // SockJS instance
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe('/topic/drawings', (message: IMessage) => {
        const shapeFromServer = JSON.parse(message.body);

        const existingIndex = this.drawings.findIndex(
          (s) => s.clientId === this.clientId && !s.id, // local shape waiting for ID
        );

        if (existingIndex !== -1) {
          // Update local shape with server-assigned ID
          this.drawings[existingIndex].id = shapeFromServer.id;
          return;
        }

        // Otherwise, add new remote shape
        if (shapeFromServer.clientId !== this.clientId) {
          this.drawings.push(shapeFromServer);
        }

        console.log('Received shape from server:', shapeFromServer);
        this.redrawCanvas();
      });
      this.stompClient.subscribe('/topic/erase', (message: IMessage) => {
        const body = message.body;
        if (body === 'ALL') {
          this.drawings = [];
        } else {
          const id = Number(body);
          this.removeShapeById(id);
        }
        this.redrawCanvas();
      });
    };

    this.stompClient.activate();
  }
}
