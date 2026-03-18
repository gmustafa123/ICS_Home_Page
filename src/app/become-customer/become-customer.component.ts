import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-become-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './become-customer.component.html',
  styleUrl: './become-customer.component.css'
})
export class BecomeCustomerComponent {
  steps = [
    { title: 'Contact Details', description: 'Fill in your personal and business contact information.' },
    { title: 'Business Profile', description: 'Tell us about your business type and requirements.' },
    { title: 'Approval', description: 'Our team will review within 24 hours.' }
  ];
}
