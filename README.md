# MyBalaton
# Projekt téma : Balatoni látnivalók

A felhasználó bejelentkezés nélkül tud böngészni a látnivalók között. Regisztráció és bejelentkezés után tud látnivalót feltölteni,kommentelni,értékelni.
A látnivalóknál megvalósulnak a teljes CRUD műveletek, Kommenteknél csak CRD.

# Egy kis segítség az értékeléshez:

## 1.Fordítási hiba nincs (ng serve kiadásakor nincs hiba)
## 2.Futtatási hiba nincs (böngésző konzol részében nincs hiba)
## 3.Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában       (ugyanennyi kollekció))
 Place,User,Comment,Rating
## 4.Reszponzív, mobile-first felület (minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is)
  Material Design + saját SCSS, mobilbarát elrendezés.
## 5.Legalább 4, de 2 különböző attribútum direktíva használata
  *ngIf, *ngFor, [ngSwitch], [ngSwitchCase] 
## 6.Legalább 4, de 2 különböző beépített vezérlési folyamat használata (if, switch, for)
  if(profil,place,navbar)
  switch(place)
  for(profil,places,place,comment)
  if-else(place)
## 7.Adatátadás szülő és gyermek komponensek között (legalább 3 @Input és 3 @Output)
  comment.component.ts 86.sorától
  A szülő komponens (PlaceComponent) átadja a hozzászólásokat és a felhasználó azonosítót
  A gyermek komponens (CommentComponent) visszaküldi az új hozzászólásokat, törlési kéréseket és a hozzászólások számának változását
## 8.Legalább 10 különböző Material elem helyes használata.
  MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,     
  MatDividerModule, MatLabel, MatError, MatCardHeader, MatCardTitle, stb.
## 9.Legalább 2 saját Pipe osztály írása és használata
  PlaceCountPipe
  RatingStarsPipe
## 10.Adatbevitel Angular form-ok segítségével megvalósítva (legalább 4)
  login.component.ts + .html //
  register.component.ts + .html //
  profil.component.ts + .html //
  comment.component.ts
## 11.Legalább 2 különböző Lifecycle Hook használata
  ngOnInit, ngOnDestroy:
    place.component.ts
    profil.component.ts
## 12.CRUD műveletek mindegyike megvalósult legalább a projekt fő entitásához (Promise, Observable használattal)
place.service.ts
  Promise: addPlace
  Observable: getPlaces,getPlaceByID, updatePlace, deletePlace
## 13.CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek
  place.service.ts és storage.service.ts
## 14.Legalább 4 komplex Firestore lekérdezés megvalósítása (where, rendezés, léptetés, limitálás)
  látnivalók oldalon a név szerinti rendezés (places.component.ts 38.sortól)
  Profilba a felhasználó látnivalói (profil.component.ts 63.sor)
  navbar-ba a keresés név szerint limitálással( place.service.ts 76.sortól)
## 15.Legalább 4 különböző route a különböző oldalak eléréséhez
  app.routes.ts
## 16.AuthGuard implementációja
  auth.guard.ts
## 17.Legalább 2 route levédése azonosítással (AuthGuard)
  app.routes.ts
    Profil
    Add
## 18.Szubjektív pontozás a projekt egészére vonatkozólag
  Ebbe nemtudok segíteni, ahogy neked tetszik!

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
