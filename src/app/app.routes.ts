import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoryProductsComponent } from './category-products/category-products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category', component: CategoryProductsComponent },
  { path: 'become-customer', redirectTo: '' },
  { path: '**', redirectTo: '' }
];
