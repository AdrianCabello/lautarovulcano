import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      title: 'Change',
      description: 'Rediseño de identidad para Change, una academia de trading enfocada en la transformación financiera. Se desarrolló la marca, la identidad visual, las redes sociales y la web institucional.',
      image: '../../assets/projects/change.png',
      tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'After Effects'],
      url: 'https://lautarovulcano.myportfolio.com/change-academia-de-trading-social-media'
    },
    {
      title: 'Positive',
      description: 'Diseño de identidad visual y gestion de redes sociales para fecha especial de música electrónica. Se creó la gráfica completa y se gestionó la comunicación para generar alcance y atraer al público. También se realizaron animaciones para video y contenido dinámico.',
      image: '../../assets/projects/positive.png',
      tags: ['Adobe Illustrator', 'Adobe InDesign'],
      url: 'https://lautarovulcano.myportfolio.com/evento-positive-new-year-social-media'
    },
    {
      title: 'Gold Phone',
      description: 'Gestión de redes sociales y desarrollo visual para Gold Phone, tienda especializada en la venta de iPhones y accesorios. El enfoque estuvo en crear piezas claras y directas orientadas a la conversión.',
      image: '../../assets/projects/gold-phone.png',
      tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
      url: 'https://lautarovulcano.myportfolio.com/gold-phone-gestion-de-redes'
    },
    {
      title: 'Marita Polifroni',
      description: 'Diseño de branding e identidad visual para Marita Polifroni, médica especializada en cannabis medicinal, género y salud integral. Se desarrolló la identidad de marca y se gestiona el contenido en redes sociales con foco en la venta de consultas, buscando visibilidad y conexión con su comunidad.',
      image: '../../assets/projects/marita-polifroli.png',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      url: 'https://lautarovulcano.myportfolio.com/social-media-cannabis-genero-drmarita-polifroni'
    },
    {
      title: 'Mis panas pizzas',
      description: 'Identidad visual y gestión de redes para Mis Panas Pizza. Se diseñó contenido visual atractivo y cercano, enfocado en resaltar el sabor y la buena onda de la marca.',
      image: '../../assets/projects/mis-panas-pizza.png',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      url: 'https://lautarovulcano.myportfolio.com/sabores-pizzas-trabajo-para-mis-panas-pizza-insta'
    },
    {
      title: 'Eventloop',
      description: 'Diseño de marca, redes sociales y página web para Eventloop, una plataforma de ticketing y organización de eventos. El concepto refleja la naturaleza cíclica e innovadora del proyecto.',
      image: '../../assets/projects/eventloop.png',
      tags: ['Adobe Illustrator', 'Adobe Photoshop'],
      url: 'https://lautarovulcano.myportfolio.com/eventloop-social-media'
    }
  ];

  getTagIcon(tag: string): string {
    const iconMap: Record<string, string> = {
      'Adobe Illustrator': 'pen-tool',
      'Adobe Photoshop': 'image',
      'Adobe InDesign': 'book-open',
      'Figma': 'layout',
      'After Effects': 'film'
    };

    return iconMap[tag] || 'code';
  }
} 