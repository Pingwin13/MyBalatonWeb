import {User} from './user.model';
import { Comment } from './comment.model';
import { Rating } from './rating.model';

export interface Place {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  ratings?: Rating[];
  comments: Comment[];
  createdBy: User;
}
