import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  dropdownVisible = false;
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
