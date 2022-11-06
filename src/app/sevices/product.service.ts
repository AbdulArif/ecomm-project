import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }


  addProduct(model: Product): Observable<Product> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<Product>(`${environment.apiUrl}/products`, model, options);
  }


}
