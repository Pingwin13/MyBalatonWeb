import { Component, OnInit } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  imports: [
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: any = {
    name: 'Balaton Rajongó',
    email: 'rajongo@balaton.hu',
    registrationDate: new Date(2023, 5, 15),
    avatar: 'images/avatar.jpg',
    favoriteLocations: [
      { id: 1, name: 'Balatonfüred' },
      { id: 2, name: 'Tihany' }
    ],
    contributions: 5
  };

  //constructor(private authService: AuthService) {}

  ngOnInit(): void {
   // this.user = this.authService.getUser();
  }

  logout(): void {
   // this.authService.logout();
  }
}
