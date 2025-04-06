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
      description: 'Rediseño de identidad para Change, una empresa de consultoría financiera. El concepto se basa en la transformación y el crecimiento.',
      image: '../../assets/projects/change.png',
      tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
      url: 'https://lautarovulcano.myportfolio.com/change-academia-de-trading-social-media'
    },
    {
      title: 'ParraBurgers',
      description: 'Identidad completa para una hamburguesería premium. El diseño combina elementos rústicos con un toque moderno y elegante.',
      image: '../../assets/projects/parraburgers.png',
      tags: ['Adobe Illustrator', 'Adobe InDesign'],
      url: 'https://lautarovulcano.myportfolio.com/logo-parraburgers-tandil'
    },
    {
      title: 'Eventloop',
      description: 'Diseño de marca para una plataforma de eventos. El concepto refleja la naturaleza cíclica y continua de la innovación.',
      image: '../../assets/projects/eventloop.png',
      tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
      url: 'https://lautarovulcano.myportfolio.com/eventloop-social-media'
    }
  ];
} 