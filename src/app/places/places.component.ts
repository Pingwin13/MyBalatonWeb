import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Place } from '../models/place.model';
import { RatingStarsPipe } from '../pipes/rating-stars.pipe';
import { PlaceCountPipe } from '../pipes/place-count.pipe';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RatingStarsPipe,
    PlaceCountPipe
  ],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe(places => {
      this.places = places;
      this.sortByName();
    });
  }

  sortByName(): void {
    this.places.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (this.sortDirection === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
}
