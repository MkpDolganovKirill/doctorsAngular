import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { MainService } from 'src/app/services/main.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { OrderService } from 'src/app/services/order.service';
import { dateForSendOnBackEnd } from 'src/constants/format-date.constants';

@Component({
  selector: 'create-order-component',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent {
  @ViewChild('selectDoctor') selectDoctor: MatSelect | undefined;
  public dateLimit = {
    min: new Date(),
    max: new Date(9999, 0, 1),
  };
  public creatingForm: FormGroup;
  public isDatePickerOpen = false;
  public isSelectOpen = false;

  constructor(
    private formBuilder: FormHelperService,
    private datePipe: DatePipe,
    private orderService: OrderService,
    public mainService: MainService,
    public doctorService: DoctorService,
  ) {
    this.creatingForm = this.formBuilder.creatingOrderForm();

    this.creatingForm.valueChanges.subscribe((res) => {
      this.isDatePickerOpen = !!res.doctorId && !res.ordersdate;

      return res.patient?.length > 6 && !res.doctorId
        ? this.selectDoctor?.open()
        : this.selectDoctor?.close();
    });
  }

  public onSubmit() {
    const addingValues = {
      ...this.creatingForm.value,
      ordersdate: this.datePipe.transform(this.creatingForm.value.ordersdate, dateForSendOnBackEnd),
    };
    this.orderService.createOrder(addingValues);
    this.creatingForm.reset();
  }
}
