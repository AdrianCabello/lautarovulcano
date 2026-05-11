import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ApproachComponent } from '../approach/approach.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    PortfolioComponent,
    ApproachComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <main class="flex-grow">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-portfolio></app-portfolio>
      <app-approach></app-approach>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
