import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { ApiService } from './api.service';
import { ErrorService } from './error.service';
import { MainService } from './main.service';
import { DoctorService } from './doctor.service';
import { IGetOrdersRequest, IOrder, ISortingOptions } from '../interfaces/orders.interfaces';
import { IAuth } from '../interfaces/user.interface';
import * as LOCALSTORAGE_DATA from 'src/constants/localstorage-data.constants';

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

  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private mainService: MainService,
    private doctorService: DoctorService,
  ) {}

  public getAllOrders(): void {
    this.mainService.isLoading.next(true);
    this.apiService
      .getAllUsersOrder(this.sortingRequestOptions.value)
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainService.isLoading.next(false);
        }),
      )
      .subscribe((result: IGetOrdersRequest | IAuth | null) => {
        if ((<IGetOrdersRequest>result)?.orders && (<IGetOrdersRequest>result)?.doctors) {
          this.ordersList.next((<IGetOrdersRequest>result).orders);
          this.doctorService.doctorsList.next((<IGetOrdersRequest>result).doctors);
        }
        if ((<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem(LOCALSTORAGE_DATA.accesstoken, (<IAuth>result).accesstoken);
          localStorage.setItem(LOCALSTORAGE_DATA.refreshtoken, (<IAuth>result).refreshtoken);
          this.getAllOrders();
        }
      });
  }

  public editOrder(orderData: IOrder): void {
    this.mainService.isLoading.next(true);
    this.apiService
      .editOrder(orderData)
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainService.isLoading.next(false);
        }),
      )
      .subscribe((result: IOrder | IAuth | null) => {
        if ((<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem(LOCALSTORAGE_DATA.accesstoken, (<IAuth>result).accesstoken);
          localStorage.setItem(LOCALSTORAGE_DATA.refreshtoken, (<IAuth>result).refreshtoken);
          this.editOrder(orderData);
        } else if (result) {
          this.getAllOrders();
        }
      });
  }

  public createOrder(orderData: IOrder): void {
    this.mainService.isLoading.next(true);
    this.apiService
      .createOrder(orderData)
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainService.isLoading.next(false);
        }),
      )
      .subscribe((result: IOrder | IAuth | null) => {
        if ((<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem(LOCALSTORAGE_DATA.accesstoken, (<IAuth>result).accesstoken);
          localStorage.setItem(LOCALSTORAGE_DATA.refreshtoken, (<IAuth>result).refreshtoken);
          this.createOrder(orderData);
        } else if (result) {
          this.getAllOrders();
        }
      });
  }

  public deleteOrder(id: string): void {
    this.mainService.isLoading.next(true);
    this.apiService
      .deleteOrder(id)
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainService.isLoading.next(false);
        }),
      )
      .subscribe((result: IAuth | null) => {
        if (result?.accesstoken && result?.refreshtoken) {
          localStorage.setItem(LOCALSTORAGE_DATA.accesstoken, result.accesstoken);
          localStorage.setItem(LOCALSTORAGE_DATA.refreshtoken, result.refreshtoken);
          this.deleteOrder(id);
        } else if (result) {
          this.getAllOrders();
        }
      });
  }
}
