import { Pipe, PipeTransform } from '@angular/core';
import { Rating } from '../models/rating.model';

@Pipe({
  name: 'ratingStars',
  standalone: true,
})
export class RatingStarsPipe implements PipeTransform {
  transform(value: number | Rating[]): string {
    if (Array.isArray(value)) {
      if (value.length === 0) return 'Még nincs értékelés';
      const sum = value.reduce((acc, r) => acc + r.value, 0);
      value = Math.round((sum / value.length) * 10) / 10;
    }
    
    const fullStars = Math.floor(value);
    const halfStar = value % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
  }
} 