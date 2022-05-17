import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public hide = {
    password: true,
    doublePassword: true,
  };
  public signUpForm: FormGroup;

  constructor(private newSignUpForm: FormHelperService, private router: Router) {
    this.signUpForm = this.newSignUpForm.createSignUpForm();
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signUpForm.value);
  }

  redirectOnRegister() {
    this.router.navigateByUrl('/auth');
  }
}
