import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { BecomeCustomerComponent } from './become-customer/become-customer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category', component: CategoryProductsComponent },
  { path: 'become-customer', component: BecomeCustomerComponent },
  { path: '**', redirectTo: '' }
];
