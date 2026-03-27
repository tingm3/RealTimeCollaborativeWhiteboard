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
}
