import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';
import { ErrorService } from './error.service';
import { OrderService } from './order.service';
import { DoctorService } from './doctor.service';
import { IAuth, IUser } from '../interfaces/user.interface';
import { IGetOrdersRequest, IOrder } from '../interfaces/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private mainServise: MainService,
    private errorService: ErrorService,
    private doctorService: DoctorService,
    private orderService: OrderService,
  ) {}

  //todo add return type
  public createUser(body: IUser): void {
    this.mainServise.isLoading.next(true);
    this.http
      .post<IAuth>(`${environment.requestLink}createNewUser`, body)
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainServise.isLoading.next(false);
        }),
      )
      .subscribe((result: IAuth | null) => {
        if (result) {
          localStorage.setItem('accesstoken', result.accesstoken);
          localStorage.setItem('refreshtoken', result.refreshtoken);
          this.router.navigate(['/main']);
        }
      });
  }

  public authenticateUser(body: IUser): void {
    this.mainServise.isLoading.next(true);
    this.http
      .post<IAuth>(`${environment.requestLink}authorizationUser`, body)
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainServise.isLoading.next(false);
        }),
      )
      .subscribe((result: IAuth | null) => {
        if (result) {
          localStorage.setItem('accesstoken', result.accesstoken);
          localStorage.setItem('refreshtoken', result.refreshtoken);
          this.router.navigate(['/main']);
        }
      });
  }

  public getAllOrdersUser(): void {
    this.mainServise.isLoading.next(true);
    this.http
      .get<IGetOrdersRequest>(`${environment.requestLink}getAllUserOrders`, {
        headers: {
          accesstoken: `${localStorage.getItem('accesstoken')}`,
          refreshtoken: `${localStorage.getItem('refreshtoken')}`,
        },
        params: {
          sortMethod: this.orderService.sortingRequestOptions.getValue().sortMethod,
          sortType: this.orderService.sortingRequestOptions.getValue().sortType,
          dateWith: this.orderService.sortingRequestOptions.getValue().dateWith,
          dateFor: this.orderService.sortingRequestOptions.getValue().dateFor,
        },
      })
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainServise.isLoading.next(false);
        }),
      )
      .subscribe((result: IGetOrdersRequest | IAuth | null) => {
        if ((<IGetOrdersRequest>result)?.orders && (<IGetOrdersRequest>result)?.doctors) {
          this.orderService.ordersList.next((<IGetOrdersRequest>result).orders);
          this.doctorService.doctorsList.next((<IGetOrdersRequest>result).doctors);
        }
        if ((<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem('accesstoken', (<IAuth>result).accesstoken);
          localStorage.setItem('refreshtoken', (<IAuth>result).refreshtoken);
          this.getAllOrdersUser();
        }
      });
  }

  public editOrder(data: IOrder): void {
    this.mainServise.isLoading.next(true);
    this.http
      .patch<IOrder>(`${environment.requestLink}updateUserOrder`, data, {
        headers: {
          accesstoken: `${localStorage.getItem('accesstoken')}`,
          refreshtoken: `${localStorage.getItem('refreshtoken')}`,
        },
      })
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainServise.isLoading.next(false);
        }),
      )
      .subscribe((result: IOrder | IAuth | null) => {
        if ((<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem('accesstoken', (<IAuth>result).accesstoken);
          localStorage.setItem('refreshtoken', (<IAuth>result).refreshtoken);
          this.editOrder(data);
        } else if (result) {
          this.getAllOrdersUser();
        }
      });
  }

  public createOrder(data: IOrder): void {
    this.mainServise.isLoading.next(true);
    this.http
      .post<IOrder>(`${environment.requestLink}addNewOrder`, data, {
        headers: {
          accesstoken: `${localStorage.getItem('accesstoken')}`,
          refreshtoken: `${localStorage.getItem('refreshtoken')}`,
        },
      })
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainServise.isLoading.next(false);
        }),
      )
      .subscribe((result: IOrder | IAuth | null) => {
        if ((<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem('accesstoken', (<IAuth>result).accesstoken);
          localStorage.setItem('refreshtoken', (<IAuth>result).refreshtoken);
          this.createOrder(data);
        } else if (result) {
          this.getAllOrdersUser();
        }
      });
  }

  public deleteOrderFromServer(body: IOrder): void {
    this.mainServise.isLoading.next(true);
    this.http
      .delete<IAuth>(`${environment.requestLink}deleteUsersOrder?id=${body.id}`, {
        headers: {
          accesstoken: `${localStorage.getItem('accesstoken')}`,
          refreshtoken: `${localStorage.getItem('refreshtoken')}`,
        },
      })
      .pipe(
        catchError((err) => {
          this.errorService.errorHandlerRequests(err);
          return of(null);
        }),
        finalize(() => {
          this.mainServise.isLoading.next(false);
        }),
      )
      .subscribe((result: IAuth | null) => {
        if (result?.accesstoken && result?.refreshtoken) {
          localStorage.setItem('accesstoken', result.accesstoken);
          localStorage.setItem('refreshtoken', result.refreshtoken);
          this.deleteOrderFromServer(body);
        } else if (result) {
          this.getAllOrdersUser();
        }
      });
  }
}
