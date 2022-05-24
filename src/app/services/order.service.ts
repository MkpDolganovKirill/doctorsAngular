import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder, ISortingOptions } from '../interfaces/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public sortingRequestOptions = new BehaviorSubject<ISortingOptions>({
    sortMethod: 'createdAt',
    sortType: 'asc',
    dateWith: '',
    dateFor: '',
  });
  public ordersList = new BehaviorSubject<IOrder[]>([]);
}
