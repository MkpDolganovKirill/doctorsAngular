import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { ApiService } from 'src/app/services/api.service';
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
    private http: ApiService,
    private router: Router,
    public mainService: MainService,
  ) {
    this.signInForm = this.newSignInForm.createSingInForm(this.minFieldLength, this.maxFieldLength);
  }

  onSubmit() {
    this.http.authenticateUser(this.signInForm.value);
  }

  redirectOnRegister() {
    this.router.navigate(['/auth/registration']);
  }
}
