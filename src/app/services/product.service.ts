import { query } from '@angular/animations';
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

  GetProducts(): Observable<Product[]> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.get<Product[]>(`${environment.apiUrl}/products`, options);
  }

  // DeleteProduct(id: any): Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders().append('Content-Type', 'application/json'),
  //     params: new HttpParams()
  //     .append('id',id)
  //   }
  //   return this.http.delete<any>(`${environment.apiUrl}/products`, options);
  // }

  DeleteProduct(id:any){
   return this.http.delete(`${environment.apiUrl}/products/${id}`)
  }

  GetProductById(id: string): Observable<Product> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
      .append('id',id)
    }
    return this.http.get<Product>(`${environment.apiUrl}/products`, options);
  }

  UpdateProduct(model: Product): Observable<Product>{
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.put<Product>(`${environment.apiUrl}/products/${model.id}`, model, options);
  }

  PropularProducts(): Observable<Product[]> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.get<Product[]>(`${environment.apiUrl}/products?_limit=4`, options);
  }

  SearchProducts(query: string): Observable<Product[]> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.get<Product[]>(`${environment.apiUrl}/products?q=${query}`, options);
  }
  LocalAddToCart(data:Product){
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
    }
    else{
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))

    }
  }

}
