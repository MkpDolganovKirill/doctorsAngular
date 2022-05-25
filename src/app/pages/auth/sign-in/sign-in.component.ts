import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { MainService } from 'src/app/services/main.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public signInForm: FormGroup;
  public hidePassword = true;

  constructor(
    private newSignInForm: FormHelperService,
    private authService: AuthService,
    private router: Router,
    public mainService: MainService,
  ) {
    this.signInForm = this.newSignInForm.createSingInForm();
  }

  onSubmit(): void {
    this.authService.authenticateUser(this.signInForm.value);
  }

  redirectOnRegister(): void {
    this.router.navigate(['/auth/registration']);
  }
}
