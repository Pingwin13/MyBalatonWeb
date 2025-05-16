import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ref, uploadBytes, getDownloadURL, Storage } from '@angular/fire/storage';
import { PlaceService } from '../services/place.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-place',
  standalone: true,
  template: `
    <div class="add-place-container">
      <mat-card class="add-place-card">
        <mat-card-header>
          <mat-card-title>Új látnivaló hozzáadása</mat-card-title>
          <mat-card-subtitle>Töltsd ki az alábbi űrlapot a látnivaló hozzáadásához</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="placeForm" (ngSubmit)="onSubmit()" class="form-container">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Név</mat-label>
              <input matInput formControlName="name" required>
              <mat-error *ngIf="placeForm.get('name')?.hasError('required')">
                A név megadása kötelező
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Leírás</mat-label>
              <textarea matInput formControlName="description" rows="4" required></textarea>
              <mat-error *ngIf="placeForm.get('description')?.hasError('required')">
                A leírás megadása kötelező
              </mat-error>
            </mat-form-field>

            <div class="full-width">
              <label for="fileInput" class="file-input-label">Kép kiválasztása:</label>
              <input id="fileInput" type="file" (change)="onFileSelected($event)" accept="image/*" required>
              <div *ngIf="selectedFile" class="image-preview">
                <img [src]="imagePreviewUrl" alt="Előnézet">
              </div>
            </div>

            <div *ngIf="error" class="error">{{ error }}</div>
          </form>
        </mat-card-content>

        <mat-card-actions class="actions">
          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="placeForm.invalid || !selectedFile || loading"
                  (click)="onSubmit()">
            <mat-icon>add_location</mat-icon>
            Hozzáadás
          </button>
          <button mat-button type="button" routerLink="/places">
            <mat-icon>arrow_back</mat-icon>
            Vissza
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['./add-place.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddPlaceComponent {
  placeForm: FormGroup;
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Kép előnézet létrehozása
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onSubmit() {
    if (this.placeForm.invalid || !this.selectedFile) return;
    this.loading = true;
    this.error = null;
    try {
      // 1. Kép feltöltése Firebase Storage-ba
      const filePath = `places/${Date.now()}_${this.selectedFile.name}`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, this.selectedFile);
      const imageUrl = await getDownloadURL(fileRef);
      
      // 2. Látnivaló mentése (Firestore)
      const user = this.authService.currentUser;
      await this.placeService.addPlace({
        name: this.placeForm.value.name,
        description: this.placeForm.value.description,
        imageUrl,
        rating: 0,
        comments: [],
        createdBy: user ? { id: 0, username: user.displayName || '', email: user.email || '' } : { id: 0, username: '', email: '' }
      });
      
      this.router.navigate(['/places']);
    } catch (err) {
      this.error = 'Hiba történt a feltöltés során!';
    } finally {
      this.loading = false;
    }
  }
} 