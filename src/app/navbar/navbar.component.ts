import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatDivider} from '@angular/material/divider';
import { AuthService } from '../services/auth.service';
import { Subscription, combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { PlaceService } from '../services/place.service';
import { Place } from '../models/place.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSuffix,
    MatFormField,
    MatButton,
    NgIf,
    MatToolbar,
    NgClass,
    RouterLinkActive
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  isLoggedIn: boolean | null = null;
  menuOpen: boolean = false;
  private authSub: Subscription | undefined;
  searchResults: Place[] = [];
  showResults: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private placeService: PlaceService
  ) {}

  ngOnInit() {
    this.authSub = combineLatest([
      this.authService.user$,
      this.authService.loading$
    ]).subscribe(([user, loading]) => {
      if (!loading) {
        this.isLoggedIn = !!user;
      }
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  onSearch() {
    if (this.searchQuery.trim().length > 0) {
      this.placeService.searchPlaces(this.searchQuery).subscribe(places => {
        this.searchResults = places;
        this.showResults = true;
      });
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
  }

  onResultClick(place: Place) {
    this.router.navigate(['/place', place.id]);
    this.clearSearch();
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
