import { Component } from '@angular/core';

interface WebProject {
  title: string;
  /** Descripción partida en tres para resaltar la parte central. */
  before: string;
  strong: string;
  after: string;
  image: string;
  url: string;
}

@Component({
  selector: 'app-web-projects',
  standalone: true,
  templateUrl: './web-projects.component.html',
  styles: [':host { display: block; }'],
})
export class WebProjectsComponent {
  readonly projects: WebProject[] = [
    {
      title: 'Eventloop',
      before: 'Experiencia para ',
      strong: 'descubrir eventos',
      after: ', consultar fechas y acceder a la compra de entradas.',
      image: 'assets/lv/web-eventloop.jpg',
      url: 'https://eventloop.ar/',
    },
    {
      title: 'Rakium',
      before: '',
      strong: 'Sitio institucional',
      after: ' para ordenar servicios digitales, casos de trabajo y vías de contacto.',
      image: 'assets/lv/web-rakium.png',
      url: 'https://rakium.dev',
    },
    {
      title: 'Medieval',
      before: '',
      strong: 'Vidriera digital',
      after: ' para Atelier Medieval, enfocada en sus prendas, estilo y propuesta de autor.',
      image: 'assets/lv/web-medieval.jpg',
      url: 'https://atelier-medieval-http.187.77.41.247.sslip.io/',
    },
    {
      title: 'Change Trade',
      before: 'Plataforma para ',
      strong: 'presentar la academia',
      after: ', sus programas y una propuesta de formación directa.',
      image: 'assets/lv/web-change.png',
      url: 'https://changetrade.online/',
    },
  ];
}
