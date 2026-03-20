import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderHome } from '../../../shared/reusableComponent/header/header-home/header-home';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderHome],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';

  signIn(form: any) {
    if (form.valid) {
      console.log('User logged in:', form.value);
    }
  }
}
