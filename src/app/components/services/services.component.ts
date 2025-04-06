import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 relative">
          <span class="text-emerald-400">Mis</span> servicios
          <span class="block h-1 w-20 bg-emerald-400 mt-4"></span>
        </h2>
      </div>
    </section>
  `
})
export class ServicesComponent {
  // Add any necessary component logic here
} 