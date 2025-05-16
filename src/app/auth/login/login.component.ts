import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    NgIf,
    MatCard,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatButton
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.error = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(err => {
          if (err && err.code) {
            if (err.code === 'auth/wrong-password') {
              this.error = 'Hibás jelszó!';
            } else if (err.code === 'auth/user-not-found') {
              this.error = 'Ez az email cím nem található!';
            } else if (err.code === 'auth/invalid-email') {
              this.error = 'Hibás email formátum!';
            } else {
              this.error = 'Bejelentkezési hiba!';
            }
          } else {
            this.error = 'Bejelentkezési hiba!';
          }
        });
    }
  }
}
