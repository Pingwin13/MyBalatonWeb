import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

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

  constructor(private fb: FormBuilder) {
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
      const { name, email } = this.registerForm.value;
      console.log('Sikeres regisztráció:', name, email, password);
      // itt jöhet a backend hívás vagy további feldolgozás
    }
  }
}
