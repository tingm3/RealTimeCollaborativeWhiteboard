import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Artist } from '../../../core/services/artist/artist-service';

export interface Whiteboard {
  id?: number;
  name: string;
  createdBy?: Artist;
  shapes?: any[];
  collaborators: Artist[];
}

export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable()
export class WhiteboardService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {}

  createWhiteboard(board: Whiteboard): Observable<Whiteboard> {
    return this.http.post<Whiteboard>(this.apiUrl, board);
  }

  updateWhiteboard(id: number, shapes: any[]): Observable<Whiteboard> {
    return this.http.put<Whiteboard>(`${this.apiUrl}/${id}/shapes`, shapes);
  }

  getAllWhiteboards(): Observable<Whiteboard[]> {
    return this.http.get<Whiteboard[]>(this.apiUrl);
  }

  deleteWhiteboard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(title?: string, artist?: string): Observable<Whiteboard[]> {
    const params: any = {};
    if (title) params.title = title;
    if (artist) params.artist = artist;
    console.log(
      'Whiteboards retrieved with search:',
      this.http.get<Whiteboard[]>(`${this.apiUrl}/search`, { params }),
    );
    return this.http.get<Whiteboard[]>(`${this.apiUrl}/search`, { params });
  }

  getCollaborators(whiteboardId: number): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrl}/${whiteboardId}/collaborators`);
  }

  addCollaborator(whiteboardId: number, artistId: number): Observable<Artist[]> {
    return this.http.post<Artist[]>(`${this.apiUrl}/${whiteboardId}/collaborators`, { artistId });
  }

  removeCollaborator(whiteboardId: number, artistId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${whiteboardId}/collaborators/${artistId}`);
  }

  getWhiteboardById(id: number): Observable<Whiteboard> {
    return this.http.get<Whiteboard>(`${this.apiUrl}/${id}`);
  }

  getDrawings(whiteboardId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${whiteboardId}/shapes`);
  }
}
