import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private api = "http://localhost:3000/api/customers";
  constructor(
private http : HttpClient
  ){}
// crud operation for customer mamagment

  get():Observable<Customer[]>{
return this.http.get<Customer[]>(this.api);

  }
getById(id: string):Observable<Customer>{

  return this.http.get<Customer>(this.api + '/' + id);
}

  
post(customer:Customer):Observable<Customer>{
return this.http.post<Customer>(this.api, customer);

}
  put(id:string, customer:Customer):Observable<Customer>{
return this.http.put<Customer>(this.api + '/' + id, customer);
  }
  delete(id:string):Observable<Customer>{

    return this.http.delete<Customer>(this.api + '/' + id);
  }
  
}

  


