import {User} from './user.model';

export interface Comment {
  id: number;
  text: string;
  author: string;
  authorId: string;
  date: Date;
  placeId: string;
}
