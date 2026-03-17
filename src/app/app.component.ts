import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ics-homepage';
  isSearchExpanded = false;
  isMobileMenuOpen = false;

  navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Our Brands', path: '/', fragment: 'brands' },
    { name: 'About Us', path: '/', fragment: 'about' },
    { name: 'Become a Customer', path: '/become-customer' },
    { name: 'Contact', path: '/', fragment: 'contact' }
  ];
}
