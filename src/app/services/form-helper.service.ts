import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormHelperService {
  constructor(private formBuilder: FormBuilder) {}

  createSignUpForm(): FormGroup {
    return this.formBuilder.group(
      {
        login: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,40}$'),
        ]),
        doublePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
      { validator: this.validateDoublePassword },
    );
  }

  createSingInForm(): FormGroup {
    return this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]),
    });
  }

  validateDoublePassword(form?: AbstractControl): { invalid: any } | null {
    if (form?.get('password')?.value !== form?.get('doublePassword')?.value) {
      return { invalid: true };
    }
    return null;
  }
}
