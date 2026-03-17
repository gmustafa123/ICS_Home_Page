import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentProductIndex = 0;
  currentCategoryIndex = 0;
  activeDetail: any = null;
  itemsPerView = 3;

  constructor() {
    this.updateItemsPerView();
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      this.currentProductIndex = 1;
      this.currentCategoryIndex = 1;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateItemsPerView();
  }

  updateItemsPerView() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) this.itemsPerView = 2;
      else if (window.innerWidth < 1024) this.itemsPerView = 2;
      else this.itemsPerView = 3;
    }
  }

  getItemsPerView() {
    return this.itemsPerView;
  }

  getTranslateX(index: number) {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const itemWidth = 45; 
      const offset = (100 - itemWidth) / 2;
      return offset - (index * itemWidth);
    }
    return -(index * (100 / this.itemsPerView));
  }

  showDetail(title: string, description: string, image?: string) {
    this.activeDetail = { title, description, image };
    document.body.style.overflow = 'hidden'; 
  }

  closeDetail() {
    this.activeDetail = null;
    document.body.style.overflow = 'auto'; 
  }

  nextProduct() {
    const perView = this.getItemsPerView();
    if (this.currentProductIndex < this.topProducts.length - perView) {
      this.currentProductIndex++;
    } else {
      this.currentProductIndex = 0;
    }
  }

  prevProduct() {
    const perView = this.getItemsPerView();
    if (this.currentProductIndex > 0) {
      this.currentProductIndex--;
    } else {
      this.currentProductIndex = Math.max(0, this.topProducts.length - Math.floor(perView));
    }
  }

  nextCategory() {
    const perView = this.getItemsPerView();
    if (this.currentCategoryIndex < this.categories.length - perView) {
      this.currentCategoryIndex++;
    } else {
      this.currentCategoryIndex = 0;
    }
  }

  prevCategory() {
    const perView = this.getItemsPerView();
    if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
    } else {
      this.currentCategoryIndex = Math.max(0, this.categories.length - Math.floor(perView));
    }
  }
  
  brands = [
    { name: 'AL AMEEN', logo: 'assets/images/media__1773747433892.png' },
    { name: 'EAZI KLEAN', logo: 'assets/images/media__1773747433900.png' },
    { name: 'DOUBLE LUCKY', logo: 'assets/images/media__1773747433910.png' },
    { name: 'PRIMA GOLD', logo: 'assets/images/media__1773747433917.png' },
    { name: 'MANHATTAN TOWN', logo: 'assets/images/media__1773747433975.png' },
    { name: 'MILANO\'S', logo: 'assets/images/media__1773747127602.png' }
  ];

  categories = [
    { name: 'Drinks', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202312151702630679061168906756898800015043.jpg' },
    { name: 'Bakery', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509231758642713550DSC06131.jpg' },
    { name: 'Burger', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509231758637697310DSC00113.jpg' },
    { name: 'Fish & Seafood', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509121757693103379DSC09710.jpg' },
    { name: 'Packaging', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/202509181758197269602DSC06308.jpg' },
    { name: 'Dessert & Ice cream', image: 'https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/images/product/190010018_01.jpg' }
  ];

  topProducts = [
    { name: 'COKE BOTTLES GB X 500ML', category: 'Drinks', quantity: 'Case of 24', image: 'assets/images/coke_can_1773747638382.png', badge: 'New' },
    { name: 'ARTISAN BAGUETTES', category: 'Bakery', quantity: 'Box of 15', image: 'assets/images/bakery_basket_1773747677485.png', badge: 'Popular' },
    { name: 'PREMIUM BREADING MIX', category: 'Coating', quantity: '10kg Sack', image: 'assets/images/media__1773747127703.png', badge: 'New' },
    { name: 'CLING FILM ROLL', category: 'Packaging', quantity: '300m Roll', image: 'assets/images/media__1773747127646.png', badge: 'Essential' },
    { name: 'MAYONNAISE TUB', category: 'Condiments', quantity: '10L Bucket', image: 'assets/images/media__1773747433917.png', badge: 'New' },
    { name: 'FROZEN CHICKEN FILLETS', category: 'Frozen', quantity: '5kg Pack', image: 'assets/images/media__1773747127602.png', badge: 'Bulk' },
    { name: 'EAZI KLEAN SPRAY', category: 'Cleaning', quantity: '6 x 750ml', image: 'assets/images/media__1773747433900.png', badge: 'Eco' },
    { name: 'DOUBLE LUCKY RICE', category: 'Ambient', quantity: '20kg Bag', image: 'assets/images/media__1773747433910.png', badge: 'Bulk' }
  ];
}
