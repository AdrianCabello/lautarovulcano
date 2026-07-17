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
      title: 'Change Trade',
      description: 'Plataforma para presentar la academia, sus programas y una propuesta de formación directa.',
      image: 'assets/projects/change-trade-web.png',
      url: 'https://changetrade.online/',
    },
    {
      title: 'Rakium',
      description: 'Sitio institucional para ordenar servicios digitales, casos de trabajo y vías de contacto.',
      image: 'assets/projects/rakium-web.png',
      url: 'https://rakium.dev',
    },
    {
      title: 'Eventloop',
      description: 'Experiencia para descubrir eventos, consultar fechas y acceder a la compra de entradas.',
      image: 'assets/projects/eventloop-web.jpg',
      url: 'https://eventloop.ar/',
    },
    {
      title: 'Medieval',
      description: 'Vidriera digital para Atelier Medieval, enfocada en sus prendas, estilo y propuesta de autor.',
      image: 'assets/projects/medieval-web.jpg',
      url: 'https://atelier-medieval-http.187.77.41.247.sslip.io/',
    },
  ];
}
