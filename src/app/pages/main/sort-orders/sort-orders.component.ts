import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISortMethod } from 'src/app/interfaces/orders.interfaces';
import { FormHelperService } from 'src/app/services/form-helper.service';

@Component({
  selector: 'sort-orders-main',
  templateUrl: './sort-orders.component.html',
  styleUrls: ['./sort-orders.component.scss'],
})
export class SortOrdersComponent implements OnInit {
  public dateLimit = {
    min: new Date(),
    max: new Date(9999, 0, 1),
  };
  public sortMethodOptions: ISortMethod[] = [
    {
      id: 'creatAt',
      value: 'Не выбрано',
    },
    {
      id: 'patient',
      value: 'По имени',
    },
    {
      id: 'doctor',
      value: 'По доктору',
    },
    {
      id: 'date',
      value: 'По дате',
    },
  ];
  public sortTypeOptions: ISortMethod[] = [
    {
      id: 'asc',
      value: 'По возрастанию',
    },
    {
      id: 'desc',
      value: 'По убыванию',
    },
  ];
  public isDatePickerOpen = false;
  public creatingForm: FormGroup;
  constructor(private formBuilder: FormHelperService) {
    this.creatingForm = this.formBuilder.creatingOrderForm();
  }

  ngOnInit(): void {}
}
