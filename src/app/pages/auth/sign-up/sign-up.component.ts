import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { MainService } from 'src/app/services/main.service';

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
  public minFieldLength: number = 6;
  public maxFieldLength: number = 40;

  constructor(
    private newSignUpForm: FormHelperService,
    private http: HttpHelperService,
    private mainService: MainService,
    private router: Router,
  ) {
    this.signUpForm = this.newSignUpForm.createSignUpForm(this.minFieldLength, this.maxFieldLength);
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signUpForm);
    console.log(this.signUpForm.value);
    const result = this.http.createUser(this.signUpForm.value);
    console.log(result);
  }

  redirectOnRegister() {
    this.router.navigateByUrl('/auth');
  }
}
