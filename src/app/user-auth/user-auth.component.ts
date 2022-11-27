import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  userForm!: FormGroup;

  todaysDate: Date = new Date();

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildCreateUserForm();
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

  onSubmit() {
    console.log(this.userForm.value)
  }

}
