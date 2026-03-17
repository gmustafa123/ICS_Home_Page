import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ics-homepage';
  isSearchExpanded = false;
  isMobileMenuOpen = false;
  currentProductIndex = 0;
  currentCategoryIndex = 0;
  activeDetail: any = null;
  itemsPerView = 3;

  constructor() {
    this.updateItemsPerView();
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
      const itemWidth = 45; // two items with peeks
      const offset = (100 - itemWidth) / 2;
      return offset - (index * itemWidth);
    }
    return -(index * (100 / this.itemsPerView));
  }

  showDetail(title: string, description: string, image?: string) {
    this.activeDetail = { title, description, image };
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }

  closeDetail() {
    this.activeDetail = null;
    document.body.style.overflow = 'auto'; // Restore scroll
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
    { name: 'Drinks', image: 'assets/images/coke_can_1773747638382.png' },
    { name: 'Bakery', image: 'assets/images/bakery_basket_1773747677485.png' },
    { name: 'Breading', image: 'assets/images/media__1773747127703.png' },
    { name: 'Frozen Foods', image: 'assets/images/media__1773747127602.png' },
    { name: 'Packaging', image: 'assets/images/media__1773747127646.png' },
    { name: 'Condiments', image: 'assets/images/media__1773747433917.png' }
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

  navLinks = [
    { name: 'Home', path: '#' },
    { name: 'Products', path: '#' },
    { name: 'Our Brands', path: '#brands' },
    { name: 'About Us', path: '#about' },
    { name: 'Become a Customer', path: '#' },
    { name: 'Contact', path: '#contact' }
  ];
}
