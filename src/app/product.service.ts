import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

export interface Product {
  'Product Image Url'?: string;
  'Product Image'?: string;
  'Product Name': string;
  'pack size'?: string;
  'Delivery type'?: string;
  'Price'?: string;
  'Price (USD)'?: string;
  'Rating'?: number;
  'Rating (Max 5)'?: string | number;
  'category'?: string;
}

export interface Category {
  name: string;
  fileName: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonPath = 'assets/images/json/';
  
  private categoriesMap: Category[] = [
    { name: 'Drinks', fileName: 'Drinks.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202312151702630679061168906756898800015043.jpg' },
    { name: 'Bakery', fileName: 'real-bakery.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509231758642713550DSC06131.jpg' },
    { name: 'Burger', fileName: 'Burger.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509231758637697310DSC00113.jpg' },
    { name: 'Chicken & Poultry', fileName: 'Chicken and Poultry.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202507091752072275999DSC06581.jpg' },
    { name: 'Cooking Ingredients', fileName: 'Cooking Ingredients.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202508131755083524502DSC06667.jpg' },
    { name: 'Dairy & Egg', fileName: 'Dairy & Egg.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202508111754914206287DSC06698.jpg' },
    { name: 'Dessert & Ice cream', fileName: 'Dessertand Ice cream.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/190010018_01.jpg' },
    { name: 'Doners & Kebabs', fileName: 'Doners & Kebabs.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/200010024_01.jpg' },
    { name: 'Fish & Seafood', fileName: 'Fish and Seafood.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509121757693103379DSC09710.jpg' },
    { name: 'Flour', fileName: 'Flour.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/20250618175024192582920055_(1)[1].jpg' },
    { name: 'Fruits & Nuts', fileName: 'Fruits and Nuts.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509221758554794446DSC00343.jpg' },
    { name: 'Kitchen Equipments', fileName: 'Kitchen Equipments.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/270030001_01.jpg' },
    { name: 'Meat', fileName: 'Meat.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509231758625513376DSC06100.jpg' },
    { name: 'Oil', fileName: 'Oil.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509101757489305423DSC08775.jpg' },
    { name: 'Packaging', fileName: 'Packaging.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509181758197269602DSC06308.jpg' },
    { name: 'Pastry', fileName: 'Pastry.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/310020001_01.jpg' },
    { name: 'Potato', fileName: 'Potato.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509221758541231648DSC06259.jpg' },
    { name: 'Rice, Pasta & Dried Foods', fileName: 'Rice, pasta & Dried Foods.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509081757348612475DSC08596.jpg' },
    { name: 'Sauces, Dressings & Relishes', fileName: 'Sauces Dressing and Relishes.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202508111754920523527DSC05794.jpg' },
    { name: 'Sugar & Sweeteners', fileName: 'Sugar and Sweeterners.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202507091752065938418DSC06503.jpg' },
    { name: 'Vegetables', fileName: 'Vegetables.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509161758010735322DSC09479.jpg' },
    { name: 'Chocolates & Snacks', fileName: 'chocolates and snacks.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202508111754911302179DSC05153.jpg' },
    { name: 'Stationery', fileName: 'stationery.json', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202508121754986550938DSC04760.jpg' }
  ];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return of(this.categoriesMap);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    const cat = this.categoriesMap.find(c => c.name === categoryName);
    if (!cat) return of([]);
    return this.http.get<any[]>(`${this.jsonPath}${cat.fileName}`).pipe(
      map(products => products.map(p => {
        // Normalize keys and values
        const product: Product = {
          'Product Name': p['Product Name'] || p['productName'] || 'Unknown Product',
          'Product Image Url': p['Product Image Url'] || p['Product Image'] || p['productImage'] || '',
          'pack size': p['pack size'] || p['packSize'] || '',
          'Delivery type': p['Delivery type'] || p['deliveryType'] || p['Product Type'] || '',
          'Price': p['Price'] || (p['Price (USD)'] ? '£' + p['Price (USD)'] : '') || '',
          'Rating': p['Rating'] || (p['Rating (Max 5)'] ? Number(p['Rating (Max 5)']) : 5),
          'category': categoryName
        };
        return product;
      }))
    );
  }

  getAllProducts(): Observable<Product[]> {
    // This could be very heavy, maybe just for search?
    // For now, let's just implement category-based fetching.
    return of([]);
  }
}
