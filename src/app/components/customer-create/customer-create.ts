import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer-service';

@Component({
  selector: 'app-customer-create',
  standalone:true,
  imports: [

    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './customer-create.html',
  styleUrl: './customer-create.css'
})
export class CustomerCreate  implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
   private customerService:CustomerService,
   
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customerService.post(this.customerForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

