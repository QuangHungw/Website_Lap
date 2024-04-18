import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-web-lap',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './web-lap.component.html',
  styleUrl: './web-lap.component.scss'
})
export class WebLapComponent {
  onSearchClick(): void {
    window.location.href = "/products";
  }
}
