import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="
        'px-6 py-2 rounded-lg font-medium transition-colors ' +
        (variant === 'outline'
          ? 'border border-emerald-400 text-emerald-400 hover:bg-emerald-400/10'
          : 'bg-emerald-500 text-white hover:bg-emerald-600') +
        (disabled ? ' opacity-50 cursor-not-allowed' : '')
      "
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'outline' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
} 