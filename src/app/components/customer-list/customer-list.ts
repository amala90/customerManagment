import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CustomerService } from '../../services/customer-service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-customer-list',
standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatPaginator
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerList  implements OnInit {
  customers: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];
   @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
  private customerService:CustomerService,
  private cdr: ChangeDetectorRef,
  private router: Router
) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
  this.customerService.get().subscribe((data: any[]) => {
    this.customers = data;
    this.cdr.detectChanges(); // Notify Angular that change is intentional
  });
}

  deleteCustomer(
    id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.delete(id).subscribe(() => {
        this.fetchCustomers(); // refresh the list after deletion
      });
    }
  }
   viewDetails(id: string): void {
    this.router.navigate(['/customer-details', id]);
  }

  editCustomer(id: string): void {
    this.router.navigate(['/customer-update', id]);
  }
  
}
