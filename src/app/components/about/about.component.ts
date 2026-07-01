import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

interface EventProducer {
  name: string;
  handle: string;
  url: string;
  avatar?: string;
  initials: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  readonly eventProducers: EventProducer[] = [
    {
      name: 'Positive',
      handle: '@positive.prod',
      url: 'https://www.instagram.com/positive.prod/',
      avatar: 'assets/instagram-avatars/positive-prod.jpg',
      initials: 'P',
    },
    {
      name: 'Markama',
      handle: '@markamaprod',
      url: 'https://www.instagram.com/markamaprod/',
      avatar: 'assets/instagram-avatars/markama.jpg',
      initials: 'M',
    },
  ];

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
