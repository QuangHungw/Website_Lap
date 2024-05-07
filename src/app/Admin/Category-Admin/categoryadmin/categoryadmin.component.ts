import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from './categoryadmin.module';
import { CategoryadminService } from './categoryadmin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoryadmin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categoryadmin.component.html',
  styleUrl: './categoryadmin.component.scss',
})
export class CategoryadminComponent  implements OnInit{
  categories: Category[] = [];
  constructor(private categoryadminService: CategoryadminService) {}

  ngOnInit(): void {
    this.categoryadminService.getCategory().subscribe((data: Category) => {
      this.categories = this.categories?.concat(data);
    //  console.log(data)
    });
  }
}
