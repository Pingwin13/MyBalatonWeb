import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../models/place.model';
import { Comment } from '../models/comment.model';

@Pipe({
  name: 'placeCount',
  standalone: true,
})
export class PlaceCountPipe implements PipeTransform {
  transform(value: Place[] | Comment[] | undefined): number {
    if (!value) return 0;
    return value.length;
  }
}
