import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { Router } from '@angular/router';
import { IAuth, IUser } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';
import { ErrorService } from './error.service';
import { IGetOrdersRequest, IOrder } from '../interfaces/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private mainServise: MainService,
    private errorService: ErrorService,
  ) {}

  public createUser(body: IUser) {
    this.mainServise.isLoading.next(true);
    return this.http
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
        console.log('result', result);
        if (result) {
          localStorage.setItem('accesstoken', result.accesstoken);
          localStorage.setItem('refreshtoken', result.refreshtoken);
          this.router.navigateByUrl('/main');
        }
      });
  }

  public authenticateUser(body: IUser) {
    this.mainServise.isLoading.next(true);
    return this.http
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
          this.router.navigateByUrl('/main');
        }
      });
  }

  public getAllOrdersUser() {
    this.mainServise.isLoading.next(true);
    return this.http
      .get<IGetOrdersRequest>(`${environment.requestLink}getAllUserOrders`, {
        headers: {
          accesstoken: `${localStorage.getItem('accesstoken')}`,
          refreshtoken: `${localStorage.getItem('refreshtoken')}`,
        },
        params: {
          sortMethod: this.mainServise.sortingRequestOptions.getValue().sortMethod,
          sortType: this.mainServise.sortingRequestOptions.getValue().sortType,
          dateWith: this.mainServise.sortingRequestOptions.getValue().dateWith,
          dateFor: this.mainServise.sortingRequestOptions.getValue().dateFor,
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
        if (result && (<IGetOrdersRequest>result)?.orders && (<IGetOrdersRequest>result)?.doctors) {
          this.mainServise.ordersList.next((<IGetOrdersRequest>result).orders);
          this.mainServise.doctorsList.next((<IGetOrdersRequest>result).doctors);
        }
        if (result && (<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem('accesstoken', (<IAuth>result).accesstoken);
          localStorage.setItem('refreshtoken', (<IAuth>result).refreshtoken);
          this.getAllOrdersUser();
        }
      });
  }
  //not work
  public createOrder(data: IOrder) {
    return this.http
      .post<IOrder>(`${environment.requestLink}addNewOrder`, {
        headers: {
          accesstoken: `${localStorage.getItem('accesstoken')}`,
          refreshtoken: `${localStorage.getItem('refreshtoken')}`,
        },
        body: {
          ...data,
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
        if (result && (<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem('accesstoken', (<IAuth>result).accesstoken);
          localStorage.setItem('refreshtoken', (<IAuth>result).refreshtoken);
          this.getAllOrdersUser();
        } else if (result) {
          this.createOrder(data);
        }
      });
  }

  public deleteOrderFromServer(body: IOrder) {
    this.mainServise.isLoading.next(true);
    return this.http
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
        if (result && (<IAuth>result)?.accesstoken && (<IAuth>result)?.refreshtoken) {
          localStorage.setItem('accesstoken', (<IAuth>result).accesstoken);
          localStorage.setItem('refreshtoken', (<IAuth>result).refreshtoken);
          this.deleteOrderFromServer(body);
        } else if (result) {
          this.getAllOrdersUser();
        }
      });
  }
}
