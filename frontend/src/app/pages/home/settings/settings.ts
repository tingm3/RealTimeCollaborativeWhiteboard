import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings {
  newPassword: string = '';
  theme: string = 'light'; // default theme

  constructor(private router: Router) {}

  // Called when user submits settings form
  updateSettings(form: NgForm) {
    if (form.invalid) return;

    // Example: Update password
    if (this.newPassword) {
      // TODO: Call the your backend API to update password
      console.log('Password updated:', this.newPassword);
      alert('Password updated successfully!');
      this.newPassword = '';
    }

    // TODO: Call the backend API to update theme
    console.log('Theme selected:', this.theme);
    alert(`Theme changed to ${this.theme}`);

    // Could also save the theme to localStorage
    localStorage.setItem('appTheme', this.theme);
  }

  // Called when user clicks delete account
  deleteAccount() {
    const confirmDelete = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.',
    );
    if (!confirmDelete) return;

    // TODO: Call your backend API to delete account
    console.log('Account deleted');
    alert('Your account has been deleted.');

    // Optionally redirect to homepage or login
    this.router.navigate(['/login']);
  }
}
