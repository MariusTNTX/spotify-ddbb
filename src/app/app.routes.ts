import { Routes } from '@angular/router';
import { MainManagerComponent } from './main-manager/main-manager.component';

export const routes: Routes = [
  { path: 'home', title: 'Spotify HAR to DDBB', component: MainManagerComponent },
  { path: '**', redirectTo: 'home' }
];
