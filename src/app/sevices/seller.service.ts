import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // userSignUp(data: SignUp) {
  //   this.http
  //   .post('http://localhost:3000/seller', data, { observe?: 'responce' })
  //   .subscribe((result) =>{
  //     console.warn('result',result)
  //   });
  //   return false
  // }


  userSignUp(model: SignUp): Observable<SignUp> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    this.isSellerLoggedIn.next(true)
    return this.http.post<SignUp>(`${environment.apiUrl}/seller`, model, options);
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(model: Login): Observable<Login> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
      .append('email', model.email)
      .append('password', model.password)
    }
    // this.isSellerLoggedIn.next(true)
    return this.http.get<Login>(`${environment.apiUrl}/seller`, options);    
  }

}
