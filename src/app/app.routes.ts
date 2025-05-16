import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlacesComponent } from './places/places.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeComponent } from './home/home.component';
import { PlaceComponent } from './place/place.component';
import { AuthGuard } from './auth/auth.guard';
import { AddPlaceComponent } from './add-place/add-place.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: 'main', 
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'places', 
    component: PlacesComponent
  },
  { 
    path: 'place/:id', 
    component: PlaceComponent
  },
  { 
    path: 'profil', 
    component: ProfilComponent,
    canActivate: [AuthGuard]
  },
  { path: 'add', component: AddPlaceComponent, canActivate: [AuthGuard] },
];
