import { Injectable } from '@angular/core';
import { Observable, of, from, map } from 'rxjs';
import { Place } from '../models/place.model';
import { Firestore, collection, addDoc, deleteDoc, updateDoc, query, where, orderBy, doc } from '@angular/fire/firestore';
import { collectionData, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private places: Place[] = [
    {
      id: '1',
      name: 'Balatonfüred',
      description: 'Gyönyörű parti sétány és híres borvidék.',
      imageUrl: 'images/balatonfureds.jpg',
      rating: 4.7,
      comments: [],
      createdBy: { id: 1, username: 'balatonfan', email: 'fan@balaton.hu' }
    },
    {
      id: '2',
      name: 'Tihany',
      description: 'Apátság, levendulamezők és csodás kilátás.',
      imageUrl: 'images/tihany.jpg',
      rating: 4.9,
      comments: [],
      createdBy: { id: 2, username: 'tihanyfan', email: 'tihany@fan.hu' }
    }
  ];

  private collectionName = 'places';

  constructor(private firestore: Firestore) {}

  async addPlace(placeData: Omit<Place, 'id'>): Promise<void> {
    const placesRef = collection(this.firestore, this.collectionName);
    await addDoc(placesRef, placeData);
  }

  getPlaces(): Observable<Place[]> {
    const placesRef = collection(this.firestore, this.collectionName);
    return collectionData(placesRef, { idField: 'id' }) as Observable<Place[]>;
  }

  getPlaceById(id: string): Observable<Place | undefined> {
    const placeRef = doc(this.firestore, this.collectionName, id);
    return docData(placeRef, { idField: 'id' }) as Observable<Place>;
  }

  updatePlace(id: string, place: Partial<Place>): Observable<void> {
    const placeRef = doc(this.firestore, this.collectionName, id);
    return from(updateDoc(placeRef, place as any));
  }

  deletePlace(id: string): Observable<void> {
    const placeRef = doc(this.firestore, this.collectionName, id);
    return from(deleteDoc(placeRef));
  }


  getPlacesByRating(minRating: number): Observable<Place[]> {
    return of(this.places.filter(p => p.rating >= minRating));
  }

  getPlacesByUser(userId: number): Observable<Place[]> {
    return of(this.places.filter(p => p.createdBy.id === userId));
  }

  getTopRatedPlaces(limit: number): Observable<Place[]> {
    return of([...this.places]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit));
  }

  searchPlaces(queryStr: string): Observable<Place[]> {
    const placesRef = collection(this.firestore, this.collectionName);
    const searchQuery = queryStr.toLowerCase();
    return collectionData(placesRef, { idField: 'id' }).pipe(
      map((places: any[]) =>
        (places as Place[])
          .filter(place =>
            place.name.toLowerCase().startsWith(searchQuery) ||
            place.description.toLowerCase().startsWith(searchQuery)
          )
          .slice(0, 5)
      )
    );
  }
}
