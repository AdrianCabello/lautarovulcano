import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

interface Reel {
  id: string;
  name: string;
  title: string;
  instagram?: string;
  instagramOnly?: boolean;
}

@Component({
  standalone: true,
  imports: [FooterComponent],
  template: `
    <main class="screen">
      <section class="feature">
        <div class="intro">
          <p class="kicker">Portfolio audiovisual</p>
          <h1 class="font-display">Edición de video</h1>
          <p class="summary">Una selección de mis reels y de las piezas que edité para marcas y artistas.</p>
          <a class="browse" href="#reels-clientes" (click)="scrollToWork($event)">Ver reels de clientes</a>
        </div>
        @for (reel of highlights; track reel.id) {
          <figure class="featured-reel">
            <video #player controls playsinline preload="none" [poster]="'assets/reels/' + reel.id + '.jpg'"
              [attr.aria-label]="reel.title" (play)="onPlay(player)" [src]="'assets/reels/' + reel.id + '.mp4'"></video>
            <figcaption><small>{{ reel.name }}</small><h2>{{ reel.title }}</h2>@if (reel.instagram) { <a class="instagram" [href]="reel.instagram" target="_blank" rel="noopener noreferrer">Ver en Instagram</a> }</figcaption>
          </figure>
        }
      </section>
      @for (group of groups; track group.id) {
        <section class="collection" [id]="group.id">
          <h2 class="font-display">{{ group.label }}</h2>
          <div class="reels" [class.wide]="group.id === 'youtube'">
            @for (reel of group.reels; track reel.id) {
              <figure>
                @if (reel.instagramOnly) {
                  <a [href]="reel.instagram" target="_blank" rel="noopener noreferrer"><img class="external-cover" loading="lazy" [src]="'assets/reels/' + reel.id + '.jpg'" [alt]="reel.title"></a>
                } @else {
                <video #clip controls playsinline preload="none" [attr.aria-label]="reel.title"
                  [poster]="'assets/reels/' + reel.id + '.jpg'" [src]="'assets/reels/' + reel.id + '.mp4'" (play)="onPlay(clip)"></video>
                }
                <figcaption><small>{{ reel.name }}</small><h3>{{ reel.title }}</h3>@if (reel.instagram) { <a class="instagram" [href]="reel.instagram" target="_blank" rel="noopener noreferrer">Ver en Instagram</a> }</figcaption>
              </figure>
            }
          </div>
        </section>
      }
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host { display:block; color:#f5f8f6; }
    .screen { width:min(1160px,90%); margin:auto; padding:6.5rem 0 5rem; }
    .feature { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:clamp(1rem,3vw,3rem); align-items:start; padding-bottom:3.5rem; }
    .intro { grid-column:1/-1; }
    .intro h1 { max-width:none; }
    .kicker, small { color:#91e7b7; font-size:.85rem; letter-spacing:.09em; font-weight:600; }
    h1 { font-size:clamp(3.5rem,8vw,7.5rem); line-height:.94; letter-spacing:-.055em; max-width:8ch; margin:1.2rem 0; }
    .instagram { display:inline-block; padding:.4rem 0; color:#a6f3c5; text-decoration:underline; text-underline-offset:.2em; }
    .external-cover { display:block; width:100%; aspect-ratio:9/16; object-fit:cover; border-radius:1rem; }
    .summary, figcaption p { color:#bac7c0; }
    .summary { font-size:clamp(1.05rem,2vw,1.35rem); max-width:34ch; }
    .browse { display:inline-block; margin-top:1.8rem; color:#a6f3c5; text-decoration:underline; text-underline-offset:.35em; }
    .featured-reel { width:100%; min-width:0; }
    video { display:block; width:100%; aspect-ratio:9/16; background:#080e0b; object-fit:contain; border-radius:1rem; }
    figcaption { margin-top:.8rem; }
    figcaption h2, figcaption h3 { font-size:1.35rem; font-weight:650; }
    .collection { border-top:1px solid #ffffff26; padding-top:2rem; scroll-margin-top:5.5rem; }
    .collection > h2 { font-size:clamp(2.2rem,5vw,4rem); line-height:1.1; letter-spacing:-.035em; margin-bottom:1.8rem; }
    .reels { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1.25rem; }
    .collection + .collection { margin-top:3rem; }
    .wide { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .wide video { aspect-ratio:16/9; }
    @media(min-width:601px) and (max-width:1150px) { .feature { grid-template-columns:repeat(2,minmax(0,1fr)); } .intro { grid-column:1/-1; } }
    @media(max-width:850px) { .reels { grid-template-columns:repeat(2,minmax(0,1fr)); } }
    @media(max-width:600px) { .screen { padding-top:6rem; } .feature { grid-template-columns:1fr; } .featured-reel { width:100%; } .wide { grid-template-columns:1fr; } }
    @media(max-width:440px) { .reels { grid-template-columns:1fr; } }
  `]
})
export class VideoPageComponent {
  readonly highlights: Reel[] = [
    { id: 'precios', instagram: 'https://www.instagram.com/reel/DdZ7TobTJth/', name: 'Lautaro Vulcano', title: 'Cómo se lee un precio' },
    { id: 'okapi', name: 'Okapi Viajes', title: 'Tu viaje' },
    { id: 'eventloop', instagram: 'https://www.instagram.com/reel/DXaOiYFE6tx/', name: 'Eventloop', title: 'Una plataforma para organizar eventos' },
    { id: 'mikel-ad', name: 'Mikel', title: 'Anuncio de entrenamiento' },
    { id: 'varek-tienda', name: 'VAREK', title: 'La tienda online' }
  ];
  readonly groups: { id: string; label: string; reels: Reel[] }[] = [
    { id: 'personales', label: 'Reels personales', reels: [
      { id: 'tipografias', instagram: 'https://www.instagram.com/reel/Db8-QSTz8zg/', name: 'Lautaro Vulcano', title: 'Tipografías para subtítulos' },
      { id: 'lautaro', instagram: 'https://www.instagram.com/reel/DcQ5Xj6JZTN/', name: 'Lautaro Vulcano', title: 'La estrategia de Agencia Terminal' }
    ] },
    { id: 'reels-clientes', label: 'Reels de clientes', reels: [
      { id: 'casita-sabores', name: 'La Casita Tandil', title: 'Seis sabores', instagram: 'https://www.instagram.com/p/DVuWp-REVXS/' },
      { id: 'mikel-ad1', name: 'Mikel', title: '¿Entrenás más que nadie?' },
      { id: 'terminal-desde-casa', name: 'Agencia Terminal', title: '¿Querés jugar desde casa?', instagram: 'https://www.instagram.com/p/Da0PyK0hH4C/' },
      { id: 'quiniela', name: 'Agencia Terminal', title: '¿Nunca jugaste a la quiniela?' },
      { id: 'mikel-confianza', name: 'Mikel', title: 'Confianza' },
      { id: 'terminal', name: 'Agencia Terminal', title: 'Una historia por WhatsApp' },
      { id: 'mikel-ad3', name: 'Mikel', title: 'Del escritorio al entrenamiento' },
      { id: 'terminal-cifras', name: 'Agencia Terminal', title: '¿Cuánto paga la quiniela?', instagramOnly: true, instagram: 'https://www.instagram.com/p/DWjNzgWDVBz/' },
      { id: 'terminal-extracto', name: 'Agencia Terminal', title: 'Cómo leer el extracto', instagramOnly: true, instagram: 'https://www.instagram.com/p/DVwJaAAgJgS/' }
    ] },
    { id: 'youtube', label: 'YouTube · Texto en movimiento', reels: [
      { id: 'youtube-supermercado', name: 'Vlog · Indonesia', title: 'Supermercado en Indonesia' },
      { id: 'youtube-tetebatu', name: 'Vlog · Indonesia', title: 'Tetebatu' }
    ] }
  ];
  private playing?: HTMLVideoElement;

  onPlay(player: HTMLVideoElement): void {
    if (this.playing !== player) this.playing?.pause();
    this.playing = player;
  }

  scrollToWork(event: Event): void {
    event.preventDefault();
    document.getElementById('reels-clientes')?.scrollIntoView();
  }
}
