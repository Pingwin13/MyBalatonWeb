import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    FormsModule,
    RouterLink,
    MatLabel,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSuffix,
    MatLabel,
    MatFormField,
    MatButton,
    NgIf,
    MatToolbar,
    NgClass,
    MatDivider,
    RouterLinkActive
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  onSearch() {
    console.log("Keresés:", this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
  }



  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
