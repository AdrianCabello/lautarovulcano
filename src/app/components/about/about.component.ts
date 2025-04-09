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
      name: 'Photoshop',
      description: 'Edición y composición de imágenes',
      icon: 'image'
    },
    {
      name: 'Illustrator',
      description: 'Vectorización y diseño de logotipos',
      icon: 'pen-tool'
    },
    {
      name: 'After Effects',
      description: 'Animaciones y motion graphics',
      icon: 'film'
    },
    {
      name: 'Premiere Pro',
      description: 'Edición de video y montaje',
      icon: 'video'
    },
    {
      name: 'Figma',
      description: 'Diseño de interfaces y prototipos',
      icon: 'layout'
    }
  ];
} 