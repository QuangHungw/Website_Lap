import { Component } from '@angular/core';

@Component({
  selector: 'app-newcustomer',
  standalone: true,
  imports: [],
  templateUrl: './newcustomer.component.html',
  styleUrl: './newcustomer.component.scss'
})
export class NewcustomerComponent {
  onSearchClick(): void {
    window.location.href = "/products";
  }
}
