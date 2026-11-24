import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebProjectsComponent } from '../web-projects/web-projects.component';
import { BehanceArchiveComponent } from '../behance-archive/behance-archive.component';
import { CtaComponent } from '../cta/cta.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [RouterLink, WebProjectsComponent, BehanceArchiveComponent, CtaComponent, FooterComponent],
  template: `
    <main class="lv">
      <section class="wrap hero-sub" style="padding-top: 72px; padding-bottom: 40px">
        <h1 class="d in d1" style="font-size: clamp(56px, 8.2vw, 118px); line-height: .92; color: var(--accent)">Trabajos</h1>
        <div class="in d3" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px">
          <a [routerLink]="[]" fragment="web" class="btn" style="color: #F4EFE6">Diseño web</a>
          <a [routerLink]="[]" fragment="flyers-eventos" class="btn" style="color: #F4EFE6">Eventos y flyers</a>
          <a [routerLink]="[]" fragment="trabajos-realizados" class="btn" style="color: #F4EFE6">Archivo visual</a>
        </div>
      </section>
      <app-web-projects></app-web-projects>
      <app-behance-archive></app-behance-archive>
      <app-cta></app-cta>
    </main>
    <app-footer></app-footer>
  `,
})
export class WorkPageComponent {}
