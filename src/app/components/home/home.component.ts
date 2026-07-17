import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { MonthlyServiceComponent } from '../monthly-service/monthly-service.component';
import { AboutComponent } from '../about/about.component';
import { WebProjectsComponent } from '../web-projects/web-projects.component';
import { BehanceArchiveComponent } from '../behance-archive/behance-archive.component';
import { ApproachComponent } from '../approach/approach.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    MonthlyServiceComponent,
    AboutComponent,
    WebProjectsComponent,
    BehanceArchiveComponent,
    ApproachComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <main class="flex-grow">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-monthly-service></app-monthly-service>
      <app-web-projects></app-web-projects>
      <app-approach></app-approach>
      <app-behance-archive></app-behance-archive>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
