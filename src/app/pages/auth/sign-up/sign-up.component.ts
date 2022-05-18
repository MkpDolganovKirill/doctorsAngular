import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { HttpService } from 'src/app/services/http.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public hide = {
    password: true,
    doublePassword: true,
  };
  public signUpForm: FormGroup;
  public minFieldLength: number = 6;
  public maxFieldLength: number = 40;

  constructor(
    private newSignUpForm: FormHelperService,
    private http: HttpService,
    public mainService: MainService,
    private router: Router,
  ) {
    this.signUpForm = this.newSignUpForm.createSignUpForm(this.minFieldLength, this.maxFieldLength);
  }
  onSubmit() {
    this.http.createUser(this.signUpForm.value);
  }

  redirectOnRegister() {
    this.router.navigateByUrl('/auth');
  }
}
