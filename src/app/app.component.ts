import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebLapComponent } from './Home page/web-lap/web-lap.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'car-rent';
}