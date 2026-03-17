import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { Observable, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  categoryName: string = '';
  products$: Observable<Product[]> | undefined;
  filteredProducts$: Observable<Product[]> | undefined;
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products$ = this.route.paramMap.pipe(
      map(params => params.get('category') || ''),
      switchMap(name => {
        this.categoryName = name;
        return this.productService.getProductsByCategory(name);
      })
    );
    this.filteredProducts$ = this.products$;
  }

  filterProducts(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredProducts$ = this.products$?.pipe(
      map(products => products.filter(p => 
        p['Product Name'].toLowerCase().includes(this.searchTerm)
      ))
    );
  }
}
