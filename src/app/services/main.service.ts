import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDoctor, IOrder, ISortingOptions } from '../interfaces/orders.interfaces';
import { ISnackBar } from '../interfaces/snackbar.interface';
import { IAuth } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public showSnackBar = new BehaviorSubject<ISnackBar | null>(null);
  public doctorsList = new BehaviorSubject<IDoctor[]>([]);
  public sortingRequestOptions = new BehaviorSubject<ISortingOptions>({
    sortMethod: 'createdAt',
    sortType: 'asc',
    dateWith: '',
    dateFor: '',
  });
  public ordersList = new BehaviorSubject<IOrder[]>([]);
  public newTokens = new BehaviorSubject<IAuth>({ accesstoken: '', refreshtoken: '' });
}
