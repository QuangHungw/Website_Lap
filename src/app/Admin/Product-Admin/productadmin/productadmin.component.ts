import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from './productadmin.module';
import { ProductadminService } from './productadmin.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-productadmin',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './productadmin.component.html',
  styleUrl: './productadmin.component.scss',
})
export class ProductadminComponent implements OnInit{
  products: Product[] = [];
  constructor(private productadminService: ProductadminService) {}
  ngOnInit(): void {
    this.productadminService.getProduct().subscribe((data: Product) => {
      this.products = this.products?.concat(data);
      //console.log(data)
    });
  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
