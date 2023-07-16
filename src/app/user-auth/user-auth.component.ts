import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Login, Product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true
  authError = ""
  userForm!: FormGroup;
  userLoginForm!: FormGroup;

  todaysDate: Date = new Date();
  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
    private product:ProductService
  ) { }

  ngOnInit(): void {
    this.buildCreateUserForm();
    this.buildLoginUserForm();
    this.userService.UserAuthReload();
  }

  buildCreateUserForm() {
    this.userForm = this.formBuilder.group({
      // userId: null,
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      // addedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      addedDate: this.todaysDate.toISOString(),
      // updatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      updatedDate: this.todaysDate.toISOString()
    });
  }

  buildLoginUserForm() {
    this.userLoginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  openLogin() {
    this.showLogin = true
  }
  openSignup() {
    this.showLogin = false
  }

  onSubmit() {
    // console.log(this.userForm.value)
    this.userService.UserSignUp(this.userForm.value).subscribe((result) => {
      if (result) {
        //console.log(result);
        localStorage.setItem('user', JSON.stringify(result))
        this.router.navigate(['/'])
      }
    });
  }

  userLogin() {
    this.authError = ""
    this.userService.userLogin(this.userLoginForm.value).subscribe({
      next: (result: any) => {
        console.log(result)
        if (result && result.length) {
          // console.log(result)
          this.invalidUserAuth.emit(false)
          localStorage.setItem('user', JSON.stringify(result))
          this.router.navigate(['/'])
        }
        else {
          this.invalidUserAuth.emit(true)
          this.authError = "Please Enter Correct Email and Password"
          //console.log("Please Enter Correct Email and Password")
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // localCartToRemoteCart(){
  //   let data = localStorage.getItem('localCart');
  //   let user = localStorage.getItem('user');
  //   let userId= user && JSON.parse(user).id;
  //   if(data){
  //    let cartDataList:Product[]= JSON.parse(data);
   
  //    cartDataList.forEach((product:product, index)=>{
  //      let cartData:cart={
  //        ...product,
  //        productId:product.id,
  //        userId
  //      }
  //      delete cartData.id;
  //      setTimeout(() => {
  //        this.product.addToCart(cartData).subscribe((result)=>{
  //          if(result){
  //            console.warn("data is stored in DB");
  //          }
  //        })
  //      }, 500);
  //      if(cartDataList.length===index+1){
  //        localStorage.removeItem('localCart')
  //      }
  //    })
  //   }
 
  //   setTimeout(() => {
  //    this.product.getCartList(userId)
  //   }, 2000);
     
  //  }


}
