import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { SearchService } from '../../../../core/services/search/searchService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-home',
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './header-home.html',
  styleUrl: './header-home.css',
})
export class HeaderHome {
  @Input() variant: 'landing' | 'home' | 'auth' = 'home';

  isDropdownOpen = false;
  searchQuery = '';

  constructor(private authService: AuthService, private router: Router, public searchService: SearchService) { }

  get username(): string {
    return localStorage.getItem('username') ?? 'U';
  }

  get initials(): string {
    return this.username.slice(0, 1).toUpperCase();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  onSearchInput() {
    this.searchService.setQuery(this.searchQuery);
  }
}
