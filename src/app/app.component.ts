import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { LucideModule } from './shared/lucide.module';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, RouterLink, LucideModule],
})
export class AppComponent implements OnInit {
  title = 'lautarovulcano';
  isMobileMenuOpen = false;

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Lautaro Vulcano - Diseño gráfico y comunicación visual',
      description: 'Diseño gráfico para marcas que necesitan comunicar mejor. Identidad visual, contenido digital y piezas comerciales pensadas para vender con más claridad.',
      image: 'https://lautarovulcano.com/assets/perfil.png',
      url: 'https://lautarovulcano.com/'
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
