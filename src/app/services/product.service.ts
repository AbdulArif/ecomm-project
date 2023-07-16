import { query } from '@angular/animations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, Order, Product, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();

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
  GetProducts(): Observable<Product[]> {   //// ProductList
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

  DeleteProduct(id: any) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`)
  }

  GetProductById(id: string): Observable<Product> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('id', id)
    }
    return this.http.get<Product>(`${environment.apiUrl}/products`, options);
  }

  UpdateProduct(model: Product): Observable<Product> {
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

  LocalAddToCart(data: Product) {
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      // this.cartData.emit([data]);
    }
    else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
      // this.cartData.emit([data]);
    }
    this.cartData.emit(cartData)
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: Product[] = JSON.parse(cartData)
      items = items.filter((item: Product) => productId != item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }
  AddToCart(cartData: Cart) {
    return this.http.post(`${environment.apiUrl}/cart`, cartData);
  }
  GetCartList(userId: number) {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete(`${environment.apiUrl}/cart/` + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`${environment.apiUrl}/cart?userId=` + userData.id);
  }

  orderNow(data: Order) {
    return this.http.post(`${environment.apiUrl}/orders`, data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(`${environment.apiUrl}/orders?userId=` + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${environment.apiUrl}/cart/` + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
   cancelOrder(orderId:number){
    return this.http.delete(`${environment.apiUrl}/orders/`+orderId)

  }

}
