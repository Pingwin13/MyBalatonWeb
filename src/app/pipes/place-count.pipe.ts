import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeCount',
  standalone: true
})
export class PlaceCountPipe implements PipeTransform {
  transform(value: any[] | undefined | null): number {
    if (!value || !Array.isArray(value)) return 0;
    return value.length;
  }
}
