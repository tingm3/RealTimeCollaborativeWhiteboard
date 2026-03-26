import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../../core/services/artist/artist-service';

export interface Whiteboard {
  id?: number;
  name: string;
  createdBy?: Artist;
  shapes?: any[];
  collaborators: Artist[];
}

@Injectable({
  providedIn: 'root',
})
export class WhiteboardService {
  private apiUrl = 'http://localhost:8080/whiteboards';

  constructor(private http: HttpClient) { }

  createWhiteboard(board: Whiteboard): Observable<Whiteboard> {
    return this.http.post<Whiteboard>(this.apiUrl, board);
  }

  getAllWhiteboards(): Observable<Whiteboard[]> {
    return this.http.get<Whiteboard[]>(this.apiUrl);
  }
  deleteWhiteboard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
