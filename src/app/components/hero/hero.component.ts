import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { LucideModule } from '../../shared/lucide.module';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {} 