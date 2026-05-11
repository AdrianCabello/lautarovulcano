import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './approach.component.html'
})
export class ApproachComponent {}
