import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Category } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  categories$: Observable<Category[]>;
  searchQuery: string = '';

  constructor(private productService: ProductService) {
    this.categories$ = this.productService.getCategories();
  }

  ngOnInit(): void {}

  // Placeholder for sidebar filtering logic if needed
  filterSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
  }
}
