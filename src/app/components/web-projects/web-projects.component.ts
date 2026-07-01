import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

interface WebProject {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

@Component({
  selector: 'app-web-projects',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './web-projects.component.html',
})
export class WebProjectsComponent {
  readonly projects: WebProject[] = [
    {
      title: 'Rakium',
      description: 'Diseño y desarrollo web para el sitio de Rakium.',
      image: 'assets/projects/rakium-web.png',
      url: 'https://rakium.dev',
    },
    {
      title: 'Eventloop',
      description: 'Diseño y desarrollo web para una plataforma de eventos y ticketing.',
      image: 'assets/projects/eventloop-web.jpg',
      url: 'https://eventloop.ar/',
    },
    {
      title: 'Medieval',
      description: 'Diseño y desarrollo web para Atelier Medieval.',
      image: 'assets/projects/medieval-web.jpg',
      url: 'https://atelier-medieval-http.187.77.41.247.sslip.io/',
    },
  ];
}
