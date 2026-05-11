import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <header class="container mx-auto py-6 px-4 flex justify-between items-center" data-testid="site-header">
      <a href="#" class="text-3xl font-bold" data-testid="header-logo">LV</a>
      <nav class="hidden md:flex items-center space-x-6">
        <a href="#services" class="hover:text-emerald-400 transition-colors" data-testid="header-services-link">
          Qué hago
        </a>
        <a href="#portfolio" class="hover:text-emerald-400 transition-colors" data-testid="header-portfolio-link">
          Trabajos
        </a>
        <a href="#about" class="hover:text-emerald-400 transition-colors" data-testid="header-about-link">
          Sobre mí
        </a>
        <a href="#contact" class="hover:text-emerald-400 transition-colors" data-testid="header-contact-link">
          Contacto
        </a>
        <a href="#contact" class="inline-flex items-center justify-center px-4 py-2 border border-accent text-accent font-semibold rounded-lg transition-colors hover:bg-accent hover:text-primary" data-testid="header-cta-link">
          Hablemos
        </a>
      </nav>
      <app-button variant="outline" className="md:hidden" data-testid="header-mobile-menu-button">
        Menú
      </app-button>
    </header>
  `
})
export class HeaderComponent {} 
