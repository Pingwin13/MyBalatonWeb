import { Component, OnInit } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';
import { PlaceService } from '../services/place.service';
import { Place } from '../models/place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  user: User | null = null;
  myPlaces: Place[] = [];
  editingPlace: Place | null = null;
  editForm: FormGroup | null = null;
  editError: string | null = null;
  editSelectedFile: File | null = null;
  editLoading = false;
  showDeleteProfileConfirm = false;
  deleteProfileError: string | null = null;
  deleteProfileLoading = false;

  constructor(
    private authService: AuthService,
    private placeService: PlaceService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user && user.email) {
        this.placeService.getPlaces().subscribe(places => {
          this.myPlaces = places.filter(p => p.createdBy.email === user.email);
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  deletePlace(place: Place): void {
    if (place.id) {
      this.placeService.deletePlace(place.id).subscribe();
      this.myPlaces = this.myPlaces.filter(p => p.id !== place.id);
    }
  }

  editPlace(place: Place): void {
    this.editingPlace = place;
    this.editForm = this.fb.group({
      name: [place.name, Validators.required],
      description: [place.description, Validators.required]
    });
    this.editError = null;
    this.editSelectedFile = null;
    this.editLoading = false;
  }

  cancelEdit(): void {
    this.editingPlace = null;
    this.editForm = null;
    this.editError = null;
  }

  onEditFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.editSelectedFile = input.files[0];
    }
  }

  async saveEdit() {
    if (!this.editingPlace || !this.editForm || this.editForm.invalid) return;
    this.editLoading = true;
    try {
      let imageUrl = this.editingPlace.imageUrl;
      if (this.editSelectedFile) {
        const filePath = `places/${Date.now()}_${this.editSelectedFile.name}`;
        imageUrl = await this.storageService.uploadFile(this.editSelectedFile, filePath);
      }
      await this.placeService.updatePlace(this.editingPlace.id, {
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        imageUrl
      }).toPromise();
      this.myPlaces = this.myPlaces.map(p =>
        p.id === this.editingPlace!.id ? { ...p, ...this.editForm!.value, imageUrl } : p
      );
      this.cancelEdit();
    } catch (err) {
      this.editError = 'Hiba történt a mentés során!';
    } finally {
      this.editLoading = false;
    }
  }

  async deleteProfile() {
    this.deleteProfileError = null;
    this.deleteProfileLoading = true;
    try {
      await this.authService.deleteCurrentUser();
      this.router.navigate(['/']);
    } catch (err) {
      this.deleteProfileError = 'A profil törlése nem sikerült. Jelentkezz be újra, majd próbáld meg ismét.';
    } finally {
      this.deleteProfileLoading = false;
    }
  }
}
