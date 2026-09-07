import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebProjectsComponent } from '../web-projects/web-projects.component';
import { BehanceArchiveComponent } from '../behance-archive/behance-archive.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [CommonModule, WebProjectsComponent, BehanceArchiveComponent, FooterComponent],
  template: `
    <main class="flex-grow">
      <app-web-projects></app-web-projects>
      <app-behance-archive></app-behance-archive>
    </main>
    <app-footer></app-footer>
  `,
})
export class WorkPageComponent {}
