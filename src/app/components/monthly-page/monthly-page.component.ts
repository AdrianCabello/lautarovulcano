import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './monthly-page.component.html',
})
export class MonthlyPageComponent {}
