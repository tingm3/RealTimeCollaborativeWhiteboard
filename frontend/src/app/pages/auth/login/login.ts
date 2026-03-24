import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderHome } from '../../../shared/reusableComponent/header/header-home/header-home';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderHome],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  username = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  signIn(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.status === 401
            ? 'Invalid username or password'
            : 'Something went wrong. Please try again.';
        }
      });
    }
  }
}
