import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PlaceService } from '../services/place.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-add-place',
  standalone: true,
  templateUrl: './add-place.component.html',
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
    private storageService: StorageService
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
      const filePath = `places/${Date.now()}_${this.selectedFile.name}`;
      const imageUrl = await this.storageService.uploadFile(this.selectedFile, filePath);

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
