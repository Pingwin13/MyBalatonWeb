import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Place } from '../models/place.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlaceService } from '../services/place.service';
import { RatingStarsPipe } from '../pipes/rating-stars.pipe';
import { PlaceCountPipe } from '../pipes/place-count.pipe';
import { Subscription } from 'rxjs';
import { CommentComponent } from '../comment/comment.component';
import { Comment } from '../models/comment.model';
import { AuthService } from '../services/auth.service';
import { Rating } from '../models/rating.model';

type ViewType = 'info' | 'comments' | 'map';

@Component({
  selector: 'app-place',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    PlaceCountPipe,
    CommentComponent
  ],
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent implements OnInit, OnDestroy {
  place: Place | undefined;
  placeId: string = '';
  currentView: ViewType = 'info';
  currentUserId: string = '';
  private subscription: Subscription = new Subscription();
  userRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUserId = user ? user.uid : '';
      if (this.place && this.place.ratings) {
        const found = this.place.ratings.find(r => r.userId === this.currentUserId);
        this.userRating = found ? found.value : 0;
      }
    });
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.placeId = params['id'];
        this.loadPlace();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadPlace(): void {
    this.subscription.add(
      this.placeService.getPlaceById(this.placeId).subscribe(place => {
        this.place = place;
      })
    );
  }

  switchView(view: ViewType): void {
    this.currentView = view;
  }

  onAddComment(text: string): void {
    if (this.place) {
      const newComment: Comment = {
        id: Date.now(),
        text,
        author: this.authService.currentUser?.email || 'Anonim',
        authorId: this.currentUserId,
        date: new Date(),
        placeId: this.placeId
      };
      const updatedComments = [...(this.place.comments || []), newComment];
      this.placeService.updatePlace(this.place.id, { comments: updatedComments }).subscribe(() => {
        this.place!.comments = updatedComments;
      });
    }
  }

  onDeleteComment(comment: Comment): void {
    if (this.place) {
      const updatedComments = this.place.comments.filter(c => c.id !== comment.id);
      this.placeService.updatePlace(this.place.id, { comments: updatedComments }).subscribe(() => {
        this.place!.comments = updatedComments;
      });
    }
  }

  onCommentCountChange(count: number): void {
    console.log('Comment count changed:', count);
  }

  get averageRating(): number {
    if (!this.place || !this.place.ratings || this.place.ratings.length === 0) return 0;
    const sum = this.place.ratings.reduce((acc, r) => acc + r.value, 0);
    return Math.round((sum / this.place.ratings.length) * 10) / 10;
  }

  onRate(value: number): void {
    if (!this.place || !this.currentUserId) return;
    let ratings = this.place.ratings ? [...this.place.ratings] : [];
    const idx = ratings.findIndex(r => r.userId === this.currentUserId);
    if (idx !== -1) {
      ratings[idx].value = value;
    } else {
      ratings.push({ userId: this.currentUserId, value });
    }
    this.placeService.updatePlace(this.place.id, { ratings }).subscribe(() => {
      this.userRating = value;
    });
  }
}
