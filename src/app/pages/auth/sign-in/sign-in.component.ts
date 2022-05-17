import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public signInForm: FormGroup;
  public hide = true;

  constructor(private newSignInForm: FormHelperService, private router: Router) {
    this.signInForm = this.newSignInForm.createSingInForm();
  }

  onSubmit() {
    console.log(this.signInForm.value);
  }

  redirectOnRegister() {
    this.router.navigateByUrl('/auth/registration');
  }
}
