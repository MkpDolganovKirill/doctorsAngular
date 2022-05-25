import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/interfaces/orders.interfaces';

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.component.html',
})
export class EditDialogComponent {
  public editForm: FormGroup;
  public dateLimit = {
    min: new Date(),
    max: new Date(9999, 0, 1),
  };
  constructor(
    public doctorService: DoctorService,
    private formHelper: FormHelperService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
  ) {
    this.editForm = this.formHelper.creatingEditForm(data);
  }

  saveChangedValues(): void {
    this.orderService.editOrder({ id: this.data.id, ...this.editForm.value });
  }
}
