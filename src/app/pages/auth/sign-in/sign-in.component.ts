import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { HttpService } from 'src/app/services/http.service';
import { MainService } from 'src/app/services/main.service';

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
    private http: HttpService,
    private router: Router,
    public mainService: MainService,
  ) {
    this.signInForm = this.newSignInForm.createSingInForm(this.minFieldLength, this.maxFieldLength);
  }

  onSubmit() {
    console.log(this.signInForm.value);
    this.http.authenticateUser(this.signInForm.value);
  }

  redirectOnRegister() {
    this.router.navigateByUrl('/auth/registration');
  }
}
