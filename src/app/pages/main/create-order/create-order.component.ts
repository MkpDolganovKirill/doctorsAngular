import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { MainService } from 'src/app/services/main.service';

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

  constructor(private formBuilder: FormHelperService, public mainService: MainService) {
    this.creatingForm = this.formBuilder.creatingOrderForm();

    mainService.doctorsList.next([{ id: 'hdskjfa', fullname: 'sdfsdf' }]);

    this.creatingForm.valueChanges.subscribe((res) => {
      this.isDatePickerOpen = res.doctors && !res.date ? true : false;
      console.log(res);

      return res.name?.length > 6 && !res.doctors
        ? this.selectDoctor?.open()
        : this.selectDoctor?.close();
    });
  }

  public onSubmit() {
    this.creatingForm.reset();
  }
}
