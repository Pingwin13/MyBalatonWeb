import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  imports: [
    DatePipe,
    MatButton,
    MatIcon,
  ],
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: any;

  //constructor(private authService: AuthService) {}

  ngOnInit(): void {
   // this.user = this.authService.getUser();
  }

  logout(): void {
   // this.authService.logout();
  }
}
