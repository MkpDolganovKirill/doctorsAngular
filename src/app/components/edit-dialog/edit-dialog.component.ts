import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { ApiService } from 'src/app/services/api.service';
import { IOrder } from 'src/app/interfaces/orders.interfaces';
import { DoctorService } from 'src/app/services/doctor.service';

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
    private httpService: ApiService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
  ) {
    this.editForm = this.formHelper.creatingEditForm(data);
  }

  saveChangedValues() {
    this.httpService.editOrder({ id: this.data.id, ...this.editForm.value });
  }
}
