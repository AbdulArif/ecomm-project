import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SellerService } from '../sevices/seller.service';
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  isLoginError = new EventEmitter<boolean>(false)


  showLogin = true
  authError = ''
  sellerForm!: FormGroup;
  sellerLoginForm!: FormGroup;
  todaysDate: Date = new Date();


  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.sellerService.reloadSeller()
    this.buildCreateSellerForm();
    this.buildLoginSellerForm();
  }

  buildCreateSellerForm(): void {
    this.sellerForm = this.formBuilder.group({
      // sellerId: null,
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      // addedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      addedDate: this.todaysDate.toISOString(),
      // updatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      updatedDate: this.todaysDate.toISOString()
    });
  }

  buildLoginSellerForm(): void {
    this.sellerLoginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    // console.log(this.sellerForm.value)
    this.sellerService.userSignUp(this.sellerForm.value).subscribe((result) => {
      if (result) {
        // console.log(result);
        localStorage.setItem('seller', JSON.stringify(result))
        this.router.navigate(['seller-home'])
      }
    });
  }

  openLogin() {
    this.showLogin = true
  }
  openSignup() {
    this.showLogin = false
  }

  login() {
    this.authError = ""
    this.sellerService.userLogin(this.sellerLoginForm.value).subscribe({
      next: (result: any) => {
        if (result && result.length) {
          console.log(result)
          localStorage.setItem('seller', JSON.stringify(result))
          this.router.navigate(['seller-home'])
        }
        else {
          this.isLoginError.emit(true)
          this.authError = "Please Enter Correct Email and Password"
          console.log("Please Enter Correct Email and Password")
        }


      },
      error: (err) => {
        console.log(err)
      }


    })
  }
}
