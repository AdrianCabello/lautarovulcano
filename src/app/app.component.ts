import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { LucideModule } from './shared/lucide.module';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    FooterComponent,
    LucideModule
  ],
})
export class AppComponent implements OnInit {
  title = 'lautarovulcano';
  isMobileMenuOpen = false;

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Lautaro Vulcano - Portfolio de Diseño Gráfico',
      description: 'Portfolio profesional de Lautaro Vulcano, diseñador gráfico especializado en identidad visual, comunicación en redes y diseño web. Descubre mis proyectos y servicios.',
      image: 'https://adriancabello.github.io/lautarovulcano/assets/perfil.png',
      url: 'https://adriancabello.github.io/lautarovulcano/'
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
