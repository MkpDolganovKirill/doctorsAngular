import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { MainService } from 'src/app/services/main.service';
import { sortMethodOptions, sortTypeOptions } from 'src/constants/sort-method.constants';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'sort-orders-main',
  templateUrl: './sort-orders.component.html',
  styleUrls: ['./sort-orders.component.scss'],
})
export class SortOrdersComponent {
  public sortValues = {
    sortMethod: 'createdAt',
    showDateFilter: false,
  };
  public isDatePickerOpen = false;
  public sortingForm: FormGroup;
  public sortParams = {
    sortMethod: sortMethodOptions,
    sortType: sortTypeOptions,
  };
  constructor(
    private formBuilder: FormHelperService,
    private datePipe: DatePipe,
    public mainService: MainService,
    private orderService: OrderService,
  ) {
    this.sortingForm = this.formBuilder.creatingSortingForm();

    this.sortingForm.valueChanges
      .pipe(
        map((data) => ({
          sortMethod: data.sortMethod,
          sortType: data.sortType,
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe((data) => {
        this.sortValues.sortMethod = data.sortMethod;
        this.orderService.sortingRequestOptions.next({
          ...this.orderService.sortingRequestOptions.getValue(),
          ...data,
        });
        if (data.sortMethod === 'createdAt') {
          this.sortValues.showDateFilter = false;
          this.sortingForm.controls['sortType'].setValue('asc');
          this.sortingForm.controls['dateWith'].setValue('');
          this.sortingForm.controls['dateFor'].setValue('');
          this.orderService.sortingRequestOptions.next({
            ...this.sortingForm.value,
          });
        }
      });
  }

  submitSortingWithDateFilter() {
    this.orderService.sortingRequestOptions.next({
      ...this.orderService.sortingRequestOptions.getValue(),
      dateWith: this.datePipe.transform(this.sortingForm.value.dateWith, 'yyyy-MM-dd') || '',
      dateFor: this.datePipe.transform(this.sortingForm.value.dateFor, 'yyyy-MM-dd') || '',
    });
  }

  changeDateFilterShow() {
    this.sortValues.showDateFilter = !this.sortValues.showDateFilter;
    this.sortingForm.controls['dateWith'].setValue('');
    this.sortingForm.controls['dateFor'].setValue('');
    this.orderService.sortingRequestOptions.next({
      ...this.sortingForm.value,
    });
  }
}
