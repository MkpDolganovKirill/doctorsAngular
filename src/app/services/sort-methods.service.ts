import { Injectable } from '@angular/core';
import { ISortMethod } from '../interfaces/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SortMethodsService {
  public sortMethodOptions: ISortMethod[] = [
    {
      id: 'createdAt',
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
      id: 'ordersdate',
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
}
