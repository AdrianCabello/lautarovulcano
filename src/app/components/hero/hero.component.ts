import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {
  isScrollCueHidden = false;
  heroParallax = 0;

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateScrollCue();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollCue();
  }

  private updateScrollCue(): void {
    if (!this.isBrowser) {
      return;
    }

    this.isScrollCueHidden = window.scrollY > 24;
    this.heroParallax = Math.min(18, window.scrollY * 0.035);
  }
}
