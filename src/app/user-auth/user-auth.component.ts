import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  userForm!: FormGroup;
  userLoginForm!: FormGroup;

  todaysDate: Date = new Date();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private userService: UserService
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
    console.log(this.userLoginForm.value)
  }

}
