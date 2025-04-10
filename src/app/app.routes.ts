import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlacesComponent } from './places/places.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeComponent } from './home/home.component';
import { PlaceComponent } from './place/place.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'place/:id', component: PlaceComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'home', component: HomeComponent },
];
