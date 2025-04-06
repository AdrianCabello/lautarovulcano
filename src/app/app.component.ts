import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { LucideModule } from './shared/lucide.module';

@Component({
  selector: 'app-root',
  standalone: true,
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
  template: `
    <div class="min-h-screen flex flex-col">
      <nav class="fixed top-0 left-0 right-0 z-50 bg-[#071a14]/80 backdrop-blur-sm">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            <a href="#" class="text-xl font-bold text-emerald-400">LV</a>
            <div class="hidden md:flex space-x-8">
              <a href="#about" class="text-gray-300 hover:text-emerald-400 transition-colors">Sobre mí</a>
              <a href="#portfolio" class="text-gray-300 hover:text-emerald-400 transition-colors">Portfolio</a>
              <a href="#contact" class="text-gray-300 hover:text-emerald-400 transition-colors">Contacto</a>
            </div>
            <button class="md:hidden text-gray-300 hover:text-emerald-400 transition-colors">
              <lucide-icon name="menu" [size]="24"></lucide-icon>
            </button>
          </div>
        </div>
      </nav>

      <main class="flex-grow">
        <app-hero></app-hero>
        <app-about></app-about>
        <app-portfolio></app-portfolio>
        <app-contact></app-contact>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent {
  title = 'lautarovulcano';
}
