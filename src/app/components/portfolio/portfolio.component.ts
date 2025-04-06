import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { LucideModule } from '../../shared/lucide.module';

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideModule],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent {
  portfolioItems: PortfolioItem[] = [
    {
      title: 'Change',
      description: 'Rediseño de identidad para Change, una empresa de consultoría financiera. El concepto se basa en la transformación y el crecimiento.',
      image: 'assets/images/placeholder.svg',
      tags: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma']
    },
    {
      title: 'ParraBurgers',
      description: 'Identidad completa para una hamburguesería premium. El diseño combina elementos rústicos con un toque moderno y elegante.',
      image: 'assets/images/placeholder.svg',
      tags: ['Adobe Illustrator', 'Adobe InDesign']
    },
    {
      title: 'CannaS',
      description: 'Branding para una marca de productos de cannabis medicinal. El diseño transmite naturalidad, bienestar y profesionalismo.',
      image: 'assets/images/placeholder.svg',
      tags: ['Adobe Illustrator', 'Adobe Photoshop']
    }
  ];
} 