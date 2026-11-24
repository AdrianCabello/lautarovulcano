import { Component } from '@angular/core';
import { BehanceArchiveComponent } from '../behance-archive/behance-archive.component';
import { CtaComponent } from '../cta/cta.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-flyers-page',
  standalone: true,
  imports: [BehanceArchiveComponent, CtaComponent, FooterComponent],
  template: `
    <main class="lv">
      <app-behance-archive [eventsOnly]="true" />
      <app-cta />
    </main>
    <app-footer />
  `,
})
export class FlyersPageComponent {}
