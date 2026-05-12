import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {
  isScrollCueHidden = false;

  ngOnInit(): void {
    this.updateScrollCue();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollCue();
  }

  private updateScrollCue(): void {
    this.isScrollCueHidden = window.scrollY > 24;
  }
}
