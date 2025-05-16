import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatFormField,
    MatButton,
    MatError,
    NgIf
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordMismatch: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    const { password, confirmPassword } = this.registerForm.value;
    this.passwordMismatch = password !== confirmPassword;

    if (this.registerForm.valid && !this.passwordMismatch) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(err => {
          this.error = 'A regisztráció sikertelen!';
        });
    }
  }
}
