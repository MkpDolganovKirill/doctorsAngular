import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { IOrder } from '../interfaces/orders.interfaces';
import * as FieldsLength from 'src/constants/fields-length.constants';
import { sortMethodOptions, sortTypeOptions } from 'src/constants/sort-method.constants';

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
          Validators.pattern(
            `^(?=.*[a-zA-Z])[a-zA-Z0-9]{${FieldsLength.minLengthLoginField},${FieldsLength.maxLengthLoginField}}`,
          ),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{${FieldsLength.minLengthPasswordField},${FieldsLength.maxLengthPasswordField}}$`,
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

  createSingInForm(): FormGroup {
    return this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(FieldsLength.minLengthLoginField),
        Validators.maxLength(FieldsLength.maxLengthLoginField),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(FieldsLength.minLengthPasswordField),
        Validators.maxLength(FieldsLength.maxLengthPasswordField),
      ]),
    });
  }

  creatingOrderForm(): FormGroup {
    return this.formBuilder.group({
      patient: new FormControl('', Validators.required),
      doctorId: new FormControl('', Validators.required),
      ordersdate: new FormControl('', Validators.required),
      complaints: new FormControl('', Validators.required),
    });
  }

  creatingEditForm(element: IOrder): FormGroup {
    return this.formBuilder.group({
      patient: new FormControl(element.patient, Validators.required),
      doctorId: new FormControl(element.doctorId, Validators.required),
      ordersdate: new FormControl(new Date(element.ordersdate), Validators.required),
      complaints: new FormControl(element.complaints, Validators.required),
    });
  }

  creatingSortingForm(): FormGroup {
    return this.formBuilder.group({
      sortMethod: new FormControl(sortMethodOptions[0].id, Validators.required),
      sortType: new FormControl(sortTypeOptions[0].id, Validators.required),
      dateWith: new FormControl(''),
      dateFor: new FormControl(''),
    });
  }
}
