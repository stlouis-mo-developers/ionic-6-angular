import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserProvider } from '../../providers/user-provider';
import { UserOptions } from '../../models/user-options';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = {id:'',  username: '', emailaddress: '' };
  submitted = false;

  constructor(
    public router: Router,
    public UserProvider: UserProvider
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.UserProvider.signup(this.signup.username);
      this.router.navigateByUrl('/login');
    }
  }

  onLoginClick() {
    this.router.navigateByUrl('/login');
  }
  
}
