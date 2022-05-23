import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs';
import { SortMethodsService } from 'src/app/services/sort-methods.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'sort-orders-main',
  templateUrl: './sort-orders.component.html',
  styleUrls: ['./sort-orders.component.scss'],
})
export class SortOrdersComponent implements OnInit {
  public sortValues = {
    sortMethod: 'createdAt',
    showDateFilter: false,
  };
  public isDatePickerOpen = false;
  public sortingForm: FormGroup;
  constructor(
    private formBuilder: FormHelperService,
    private datePipe: DatePipe,
    public sortMethods: SortMethodsService,
    private httpService: HttpService,
    private mainService: MainService,
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
        this.mainService.sortingRequestOptions.next({
          ...this.mainService.sortingRequestOptions.getValue(),
          ...data,
        });
        this.httpService.getAllOrdersUser();
        if (data.sortMethod === 'createdAt') {
          this.sortValues.showDateFilter = false;
          this.sortingForm.controls['sortType'].setValue('asc');
          this.sortingForm.controls['dateWith'].setValue('');
          this.sortingForm.controls['dateFor'].setValue('');
        }
      });
  }

  ngOnInit(): void {}

  submitSortingWithDateFilter() {
    console.log(this.sortingForm.value);
  }

  changeDateFilterShow() {
    this.sortValues.showDateFilter = !this.sortValues.showDateFilter;
    this.sortingForm.controls['dateWith'].setValue('');
    this.sortingForm.controls['dateFor'].setValue('');
  }
}
