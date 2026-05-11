import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { LucideModule } from './shared/lucide.module';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterModule, RouterLink, LucideModule],
})
export class AppComponent implements OnInit {
  title = 'lautarovulcano';
  isMobileMenuOpen = false;

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Lautaro Vulcano - Portfolio de Diseño Gráfico',
      description: 'Portfolio profesional de Lautaro Vulcano, diseñador gráfico especializado en identidad visual, comunicación en redes y diseño web. Descubre mis proyectos y servicios.',
      image: 'https://lautarovulcano.com/assets/perfil.png',
      url: 'https://lautarovulcano.com/'
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
