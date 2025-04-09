import { Component } from '@angular/core';
import { Place } from '../models/place.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    CommonModule,
    MatCardModule,
    MatCardImage
  ],
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent {
  places: Place[] = [
    {
      id: 1,
      name: 'Balatonfüred',
      description: 'Gyönyörű parti sétány és híres borvidék.',
      imageUrl: 'images/balatonfured.jpg',
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
}

const user1: User = {
  id: 1,
  username: 'balatonfan',
  email: 'fan@balaton.hu'
};

const newComment = new Comment(1, user1, 'Nagyon szép hely!', new Date());

const samplePlace: Place = {
  id: 101,
  name: 'Tihanyi Apátság',
  description: 'Csodálatos kilátás és történelmi helyszín.',
  imageUrl: 'assets/tihany.jpg',
  rating: 4.8,
  comments: [newComment],
  createdBy: user1
};
