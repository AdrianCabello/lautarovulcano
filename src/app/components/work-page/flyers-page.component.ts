import { Component } from '@angular/core';
import { BehanceArchiveComponent } from '../behance-archive/behance-archive.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-flyers-page',
  standalone: true,
  imports: [BehanceArchiveComponent, FooterComponent],
  template: `
    <main class="pt-20">
      <app-behance-archive [eventsOnly]="true" />
    </main>
    <app-footer />
  `,
})
export class FlyersPageComponent {}
