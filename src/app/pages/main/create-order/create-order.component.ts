import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { MainService } from 'src/app/services/main.service';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';

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
    private datePipe: DatePipe,
    private http: HttpService,
  ) {
    this.creatingForm = this.formBuilder.creatingOrderForm();

    this.creatingForm.valueChanges.subscribe((res) => {
      this.isDatePickerOpen = res.doctorId && !res.ordersdate ? true : false;
      console.log(res);

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
