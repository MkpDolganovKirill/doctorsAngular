import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { HttpHelperService } from 'src/app/services/http-helper.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public signInForm: FormGroup;
  public hide: boolean = true;
  public minFieldLength: number = 6;
  public maxFieldLength: number = 40;

  constructor(
    private newSignInForm: FormHelperService,
    private http: HttpHelperService,
    private router: Router,
  ) {
    this.signInForm = this.newSignInForm.createSingInForm(this.minFieldLength, this.maxFieldLength);
  }

  onSubmit() {
    console.log(this.signInForm.value);
    const result = this.http.authenticateUser(this.signInForm.value);
    console.log(result);
  }

  redirectOnRegister() {
    this.router.navigateByUrl('/auth/registration');
  }
}
