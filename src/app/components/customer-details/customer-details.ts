import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CustomerService } from '../../services/customer-service';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-customer-details',
  standalone:true,
  imports: [
CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails implements OnInit {
  customer?: Customer;
  customerId!: string;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id')!;
    this.loadCustomer(this.customerId);
  }

  loadCustomer(id: string): void {
    this.customerService.getById(id).subscribe({
      next: (data: Customer) => this.customer = data,
      error: (err) => {
        console.error('Failed to load customer', err);
        this.customer = undefined;
      }
    });
  }
}