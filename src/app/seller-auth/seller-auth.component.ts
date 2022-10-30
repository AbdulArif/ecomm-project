import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SellerService } from '../sevices/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  sellerForm!: FormGroup;
  todaysDate: Date = new Date();


  constructor(
    private formBuilder: UntypedFormBuilder,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.buildCreateSellerForm();
  }



  buildCreateSellerForm(): void {
    this.sellerForm = this.formBuilder.group({
      // sellerId: null,
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      // addedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      // addedDate: this.todaysDate.toISOString(),
      // updatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      // updatedDate: this.todaysDate.toISOString()
    });
  }


  onSubmit() {
    console.log(this.sellerForm.value)
    this.sellerService.userSignUp()
  }
}
