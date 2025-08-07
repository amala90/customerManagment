import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../services/customer-service';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './customer-update.html',
  styleUrl: './customer-update.css'
})
export class CustomerUpdate implements OnInit {
  customerForm!: FormGroup;
  customerId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']
    });

    this.loadCustomerData();
  }

  loadCustomerData(): void {
    this.customerService.getById(this.customerId).subscribe(data => {
      this.customerForm.patchValue(data);
    });
  }

  onUpdate(): void {
    if (this.customerForm.valid) {
      this.customerService.put(this.customerId, this.customerForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
