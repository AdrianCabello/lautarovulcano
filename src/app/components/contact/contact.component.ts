import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {} 