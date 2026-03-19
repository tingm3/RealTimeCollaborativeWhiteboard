import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  name = '';
  email = '';
  password = '';

  register(form: any) {
    if (form.valid) {
      console.log('User Registered:', form.value);
    }
  }
}
