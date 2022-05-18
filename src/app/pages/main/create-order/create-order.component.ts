import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'create-order-component',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent {
  public doctors = [
    { value: '1', viewValue: 'Иван' },
    { value: '2', viewValue: 'Иван' },
    { value: '3', viewValue: 'Иван' },
    { value: '4', viewValue: 'Иван' },
  ];
  public creatingForm: FormGroup;

  constructor(private formBuilder: FormHelperService) {
    this.creatingForm = this.formBuilder.creatingOrderForm();
  }
}
