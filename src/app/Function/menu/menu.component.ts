import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  menuItems: any[] = []; // Define menu items array

  constructor() { }

  ngOnInit(): void {
    this.initializeMenuItems();
    // Logic to initialize menu items
  }

  initializeMenuItems(): void {
    // Thực hiện logic để khởi tạo menu items, nếu cần
  }
  onSearchClick(): void {
    window.location.href = "/products";
  }

  toggleMenu(): void {
    // Toggle menu logic
  }

  adjustMenu(): void {
    // Adjust menu based on window width
  }

  onCheckboxChange(event: any): void {
    // Handle checkbox change event
  }
}