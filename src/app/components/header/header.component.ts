import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <header class="container mx-auto py-6 px-4 flex justify-between items-center">
      <div class="text-3xl font-bold">LV</div>
      <nav class="hidden md:flex space-x-6">
        <a href="#about" class="hover:text-emerald-400 transition-colors">
          Sobre mí
        </a>
        <a href="#services" class="hover:text-emerald-400 transition-colors">
          Servicios
        </a>
        <a href="#portfolio" class="hover:text-emerald-400 transition-colors">
          Portfolio
        </a>
        <a href="#contact" class="hover:text-emerald-400 transition-colors">
          Contacto
        </a>
      </nav>
      <app-button variant="outline" className="md:hidden">
        Menú
      </app-button>
    </header>
  `
})
export class HeaderComponent {} 