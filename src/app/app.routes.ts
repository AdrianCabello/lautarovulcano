import { Routes } from '@angular/router';
import { provideRouter, withHashLocation } from '@angular/router';

export const routes: Routes = [
  // Define your routes here
];

export const routerConfig = provideRouter(routes, withHashLocation());
