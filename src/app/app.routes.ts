import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'edicion-de-video', title: 'Edición de video | Lautaro Vulcano', loadComponent: () => import('./components/work-page/video-page.component').then(m => m.VideoPageComponent) },
  { path: 'servicio-mensual', title: 'Servicio mensual | Lautaro Vulcano', loadComponent: () => import('./components/monthly-page/monthly-page.component').then(m => m.MonthlyPageComponent) },
  { path: 'flyers', title: 'Flyers y motion | Lautaro Vulcano', loadComponent: () => import('./components/work-page/flyers-page.component').then(m => m.FlyersPageComponent) },
  { path: 'trabajos/:id', loadComponent: () => import('./components/work-gallery/work-gallery.component').then(m => m.WorkGalleryComponent) },
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'trabajos', title: 'Trabajos | Lautaro Vulcano', loadComponent: () => import('./components/work-page/work-page.component').then(m => m.WorkPageComponent) },
  { path: 'proyecto/:id', loadComponent: () => import('./components/project-detail/project-detail.component').then(m => m.ProjectDetailComponent) },
  { path: '**', redirectTo: '' }
];
