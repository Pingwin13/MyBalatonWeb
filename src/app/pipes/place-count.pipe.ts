import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../models/place.model';

@Pipe({
  name: 'placeCount',
  standalone: true,
})
export class PlaceCountPipe implements PipeTransform {
  transform(places: Place[]): number {
    return places.length;
  }
}
