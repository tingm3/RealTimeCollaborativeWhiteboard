import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, ChangePasswordRequest, ChangeUsernameRequest } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings {
  activeTab: string = 'account';
  expandedPanel: string | null = null;

  currentUsername: string = localStorage.getItem('username') || '';

  newUsername: string = '';
  usernameError: string = '';
  usernameSuccess: string = '';
  isUsernameLoading: boolean = false;

  currentPassword: string = '';
  newPassword: string = '';
  passwordError: string = '';
  passwordSuccess: string = '';
  isPasswordLoading: boolean = false;

  theme: string = localStorage.getItem('appTheme') || 'light';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  togglePanel(panel: string | null) {
    this.expandedPanel = this.expandedPanel === panel ? null : panel;
    this.usernameError = '';
    this.usernameSuccess = '';
    this.passwordError = '';
    this.passwordSuccess = '';
  }

  updateUsername() {
    if (!this.newUsername.trim()) return;

    this.isUsernameLoading = true;
    this.usernameError = '';
    this.usernameSuccess = '';

    const data: ChangeUsernameRequest = {
      newUsername: this.newUsername
    };

    this.authService.changeUsername(data).subscribe({
      next: (res) => {
        this.isUsernameLoading = false;
        this.currentUsername = res.username;
        this.usernameSuccess = 'Username updated';
        this.newUsername = '';
        this.expandedPanel = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isUsernameLoading = false;
        this.usernameError = err.status === 409
          ? 'Username already taken'
          : 'Something went wrong. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  updatePassword() {
    if (!this.currentPassword || !this.newPassword) return;

    this.isPasswordLoading = true;
    this.passwordError = '';
    this.passwordSuccess = '';

    const data: ChangePasswordRequest = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.authService.changePassword(data).subscribe({
      next: () => {
        this.isPasswordLoading = false;
        this.passwordSuccess = 'Password updated';
        this.currentPassword = '';
        this.newPassword = '';
        this.expandedPanel = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isPasswordLoading = false;
        this.passwordError = err.status === 401
          ? 'Current password is incorrect'
          : 'Something went wrong. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  updateTheme() {
    localStorage.setItem('appTheme', this.theme);
  }

  deleteAccount() {
    const confirmed = window.confirm('Are you sure? This cannot be undone.');
    if (!confirmed) return;

    this.authService.deleteAccount().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete account. Please try again.');
      }
    });
  }
}
