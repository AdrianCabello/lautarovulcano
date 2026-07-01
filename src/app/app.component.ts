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
      title: 'Lautaro Vulcano — Diseño gráfico, identidad y comunicación visual',
      description: 'Diseñador gráfico enfocado en comunicación visual, identidad, contenido digital, diseño web y piezas comerciales para marcas, negocios y proyectos comerciales.',
      image: 'https://lautarovulcano.com/assets/perfil.png',
      url: 'https://lautarovulcano.com/'
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
