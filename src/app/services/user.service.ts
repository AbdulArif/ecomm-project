import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  UserSignUp(model: SignUp): Observable<SignUp> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    //this.isSellerLoggedIn.next(true)
    return this.http.post<SignUp>(`${environment.apiUrl}/users`, model, options);
  }

  UserAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
  
  userLogin(model: Login): Observable<Login> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('email', model.email)
        .append('password', model.password)
    }
    return this.http.get<Login>(`${environment.apiUrl}/user`, options);
  }

}
