import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { MainService } from 'src/app/services/main.service';
import { ApiService } from 'src/app/services/api.service';
import { DoctorService } from 'src/app/services/doctor.service';

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
    public mainService: MainService,
    public doctorService: DoctorService,
    private datePipe: DatePipe,
    private http: ApiService,
  ) {
    this.creatingForm = this.formBuilder.creatingOrderForm();

    this.creatingForm.valueChanges.subscribe((res) => {
      this.isDatePickerOpen = res.doctorId && !res.ordersdate ? true : false;

      return res.patient?.length > 6 && !res.doctorId
        ? this.selectDoctor?.open()
        : this.selectDoctor?.close();
    });
  }

  public onSubmit() {
    const addingValues = {
      ...this.creatingForm.value,
      ordersdate: this.datePipe.transform(this.creatingForm.value.ordersdate, 'yyyy-MM-dd'),
    };
    this.http.createOrder(addingValues);
    this.creatingForm.reset();
  }
}
