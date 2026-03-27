import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artist {
  id: number;
  username: string;
  passwordHash?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'http://localhost:8080/artists';

  constructor(private http: HttpClient) {}

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }

  getArtistByUsername(username: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/by-username/${username}`);
  }

  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }
}
