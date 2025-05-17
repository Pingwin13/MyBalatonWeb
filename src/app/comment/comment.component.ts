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
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
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
