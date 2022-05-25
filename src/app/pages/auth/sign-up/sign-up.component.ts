import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { MainService } from 'src/app/services/main.service';
import * as FieldsLength from 'src/constants/fields-length.constants';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public hidePassword = {
    password: true,
    doublePassword: true,
  };
  public signUpForm: FormGroup;
  public minLoginFieldLength = FieldsLength.minLengthLoginField;
  public maxLoginFieldLength = FieldsLength.maxLengthLoginField;
  public minPasswordFieldLength = FieldsLength.minLengthPasswordField;
  public maxPasswordFieldLength = FieldsLength.maxLengthPasswordField;

  constructor(
    private newSignUpForm: FormHelperService,
    private authService: AuthService,
    public mainService: MainService,
    private router: Router,
  ) {
    this.signUpForm = this.newSignUpForm.createSignUpForm();
  }
  onSubmit() {
    this.authService.createUser(this.signUpForm.value);
  }

  redirectOnRegister() {
    this.router.navigate(['/auth']);
  }
}
