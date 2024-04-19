import { Component } from '@angular/core';
import { CartComponent } from '../../Function/cart/cart.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  onSearchClick(): void {
    window.location.href = "/products";
}
}
