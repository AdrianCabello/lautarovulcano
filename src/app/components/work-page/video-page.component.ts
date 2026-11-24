import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaComponent } from '../cta/cta.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  imports: [RouterLink, CtaComponent, FooterComponent],
  templateUrl: './video-page.component.html',
})
export class VideoPageComponent {}
