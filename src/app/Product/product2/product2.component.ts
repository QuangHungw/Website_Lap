import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product2.component.html',
  styleUrl: './product2.component.scss'
})
export class Product2Component {
  onSearchClick(): void {
    window.location.href = "/products";
  }
}
