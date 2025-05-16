import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingStars',
  standalone: true,
})
export class RatingStarsPipe implements PipeTransform {
  transform(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
  }
} 