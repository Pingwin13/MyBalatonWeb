import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Place } from '../models/place.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-place',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent implements OnInit {
  place: Place | undefined;
  placeId: number = 0;

  places: Place[] = [
    {
      id: 1,
      name: 'Balatonfüred',
      description: 'Gyönyörű parti sétány és híres borvidék.',
      imageUrl: 'images/balatonfureds.jpg',
      rating: 4.7,
      comments: [],
      createdBy: { id: 1, username: 'balatonfan', email: 'fan@balaton.hu' }
    },
    {
      id: 2,
      name: 'Tihany',
      description: 'Apátság, levendulamezők és csodás kilátás.',
      imageUrl: 'images/tihany.jpg',
      rating: 4.9,
      comments: [],
      createdBy: { id: 2, username: 'tihanyfan', email: 'tihany@fan.hu' }
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.placeId = +params['id'];
      this.place = this.places.find(p => p.id === this.placeId);
    });
  }
}
