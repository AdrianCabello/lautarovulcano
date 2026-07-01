import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

interface MonthlyAccount {
  title: string;
  url?: string;
  avatar?: string;
}

@Component({
  selector: 'app-monthly-service',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './monthly-service.component.html',
})
export class MonthlyServiceComponent {
  readonly items = [
    'Estrategia y calendario de publicaciones',
    'Piezas diseñadas y editadas para cada formato',
    'Reels, historias y carruseles con intención comercial',
    'Edición de video y motion graphics',
    'Promociones, lanzamientos y fechas importantes',
    'Dirección visual para mantener coherencia',
    'Ajustes según objetivos, urgencias y oportunidades',
  ];

  readonly monthlyAccounts: MonthlyAccount[] = [
    {
      title: 'Agencia Terminal',
      url: 'https://www.instagram.com/agencia_terminal/',
      avatar: 'assets/instagram-avatars/agencia-terminal.jpg',
    },
    {
      title: 'La Casita Tandil',
      url: 'https://www.instagram.com/lacasitatandil/',
      avatar: 'assets/instagram-avatars/la-casita.jpg',
    },
    {
      title: 'Medieval',
      url: 'https://www.instagram.com/medievalbyaranda/',
      avatar: 'assets/instagram-avatars/medieval.jpg',
    },
    {
      title: 'Tandil Repuestos',
      url: 'https://www.instagram.com/tandil_repuestos/',
      avatar: 'assets/instagram-avatars/tandil-repuestos.jpg',
    },
    {
      title: 'Okapi Viajes',
      url: 'https://www.instagram.com/okapiviajestandil/',
      avatar: 'assets/instagram-avatars/okapi-viajes.jpg',
    },
    {
      title: 'Tony Burger',
      url: 'https://www.instagram.com/tonyburgerstandil/',
      avatar: 'assets/instagram-avatars/tony-burger.jpg',
    },
    {
      title: 'Eventloop',
      url: 'https://www.instagram.com/eventloop.ar/',
      avatar: 'assets/instagram-avatars/eventloop.jpg',
    },
  ];

  readonly monthlyExamples = this.monthlyAccounts;
}
