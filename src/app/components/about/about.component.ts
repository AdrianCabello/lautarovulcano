import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  skills = [
    {
      name: 'Adobe Illustrator',
      description: 'Vectorización y diseño de logotipos',
      icon: 'pen-tool'
    },
    {
      name: 'Adobe Photoshop',
      description: 'Edición y retoque de imágenes',
      icon: 'image'
    },
    {
      name: 'Adobe InDesign',
      description: 'Diseño editorial y maquetación',
      icon: 'book-open'
    },
    {
      name: 'Figma',
      description: 'Diseño de interfaces y prototipado',
      icon: 'layout'
    }
  ];
} 