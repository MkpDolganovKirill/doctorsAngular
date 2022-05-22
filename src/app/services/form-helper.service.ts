import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormHelperService {
  private invalidDoublePassword: boolean | null = null;

  constructor(private formBuilder: FormBuilder) {}

  createSignUpForm(minFieldLength: number, maxFieldLength: number): FormGroup {
    return this.formBuilder.group(
      {
        login: new FormControl('', [
          Validators.required,
          Validators.pattern(`^(?=.*[a-zA-Z])[a-zA-Z0-9]{${minFieldLength},${maxFieldLength}}`),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{${minFieldLength},${maxFieldLength}}$`,
          ),
        ]),
        doublePassword: new FormControl(''),
      },
      { validator: this.validateDoublePassword },
    );
  }

  validateDoublePassword(form?: AbstractControl): { invalid: any } | null {
    const doublePasswordErrors = form?.get('doublePassword')?.errors;
    if (form?.get('password')?.value !== form?.get('doublePassword')?.value) {
      form
        ?.get('doublePassword')
        ?.setErrors({ ...doublePasswordErrors, invalidDoublePassword: true });
      return { invalid: true };
    } else {
      form?.get('doublePassword')?.setErrors(null);
    }
    return null;
  }

  createSingInForm(minFieldLength: number, maxFieldLength: number): FormGroup {
    return this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(minFieldLength),
        Validators.maxLength(maxFieldLength),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(minFieldLength),
        Validators.maxLength(maxFieldLength),
      ]),
    });
  }

  creatingOrderForm() {
    return this.formBuilder.group({
      name: new FormControl(''),
      // doctors: this.formBuilder.array([this.formBuilder.control('')]),
      date: new FormControl(''),
      complaints: new FormControl(''),
    });
  }
}
