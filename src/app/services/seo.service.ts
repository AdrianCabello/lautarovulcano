import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateMetaTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }) {
    const defaultConfig = {
      title: 'Lautaro Vulcano - Portfolio',
      description: 'Diseñador gráfico especializado en comunicación visual, identidad de marca y diseño web.',
      image: 'assets/perfil.png',
      url: 'https://adriancabello.github.io/lautarovulcano/'
    };

    const finalConfig = { ...defaultConfig, ...config };

    this.title.setTitle(finalConfig.title);

    this.meta.updateTag({ name: 'description', content: finalConfig.description });
    
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: finalConfig.title });
    this.meta.updateTag({ property: 'og:description', content: finalConfig.description });
    this.meta.updateTag({ property: 'og:image', content: finalConfig.image });
    this.meta.updateTag({ property: 'og:url', content: finalConfig.url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: finalConfig.title });
    this.meta.updateTag({ name: 'twitter:description', content: finalConfig.description });
    this.meta.updateTag({ name: 'twitter:image', content: finalConfig.image });
  }
} 