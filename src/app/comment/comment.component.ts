import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="comments-section">
      <h3>Hozzászólások</h3>
      
      <div class="new-comment" *ngIf="currentUserId">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Új hozzászólás</mat-label>
          <textarea matInput [(ngModel)]="newComment" rows="3"></textarea>
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="onAddComment()" [disabled]="!newComment">
          Hozzászólás küldése
        </button>
      </div>

      <div class="comments-list">
        <mat-card class="comment-card" *ngFor="let comment of comments">
          <mat-card-content>
            <p>{{ comment.text }}</p>
            <small>- {{ comment.author }}</small>
            <button mat-icon-button color="warn" *ngIf="currentUserId && canDelete(comment)" (click)="onDeleteComment(comment)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .comments-section {
      margin-top: 20px;
    }

    .new-comment {
      margin-bottom: 20px;
    }

    .full-width {
      width: 100%;
    }

    .comments-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .comment-card {
      position: relative;
      
      mat-card-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      button {
        position: absolute;
        top: 8px;
        right: 8px;
      }
    }
  `]
})
export class CommentComponent {
  @Input() comments: Comment[] = [];
  @Input() currentUserId: string = '';
  @Output() addComment = new EventEmitter<string>();
  @Output() deleteComment = new EventEmitter<Comment>();
  @Output() commentCountChange = new EventEmitter<number>();

  newComment: string = '';

  onAddComment(): void {
    if (this.newComment.trim()) {
      this.addComment.emit(this.newComment);
      this.newComment = '';
      this.commentCountChange.emit(this.comments.length + 1);
    }
  }

  onDeleteComment(comment: Comment): void {
    this.deleteComment.emit(comment);
    this.commentCountChange.emit(this.comments.length - 1);
  }

  canDelete(comment: Comment): boolean {
    return comment.authorId === this.currentUserId;
  }
}
