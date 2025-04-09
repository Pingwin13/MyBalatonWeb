import {User} from './user.model';
import { Comment } from './comment.model';

export interface Place {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  comments: Comment[];
  createdBy: User;
}
