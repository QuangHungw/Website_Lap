import { Component } from '@angular/core';


@Component({
  selector: 'app-web-lap',
  standalone: true,
  imports: [],
  templateUrl: './web-lap.component.html',
  styleUrl: './web-lap.component.scss'
})
export class WebLapComponent {
  onSearchClick(): void {
    window.location.href = "/products";
  }
}
