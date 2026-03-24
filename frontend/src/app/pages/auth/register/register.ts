import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderHome } from '../../../shared/reusableComponent/header/header-home/header-home';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderHome],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }


  register(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.register({ username: this.username, password: this.password }).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.status === 400
            ? 'Username already exists'
            : 'Something went wrong. Please try again.';
        }
      });
    }
  }
}
