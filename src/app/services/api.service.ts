import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth, IUser } from '../interfaces/user.interface';
import { IGetOrdersRequest, IOrder, ISortingOptions } from '../interfaces/orders.interfaces';
import * as LOCALSTORAGE_DATA from 'src/constants/localstorage-data.constants';
import * as REQUESTS_PATH_LINKS from 'src/constants/requests-path-links.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public isLoading = false;

  constructor(private http: HttpClient) {}

  public createUser(body: IUser): Observable<IAuth> {
    return this.http.post<IAuth>(
      `${environment.requestLink}${REQUESTS_PATH_LINKS.linkForCreateUser}`,
      body,
    );
  }

  public authenticateUser(body: IUser): Observable<IAuth> {
    return this.http.post<IAuth>(
      `${environment.requestLink}${REQUESTS_PATH_LINKS.linkForAuthUser}`,
      body,
    );
  }

  public getAllUsersOrder(sortingOptions: ISortingOptions): Observable<IGetOrdersRequest | IAuth> {
    return this.http.get<IGetOrdersRequest | IAuth>(
      `${environment.requestLink}${REQUESTS_PATH_LINKS.linkForGetAllOrders}`,
      {
        headers: {
          accesstoken: `${localStorage.getItem(LOCALSTORAGE_DATA.accesstoken)}`,
          refreshtoken: `${localStorage.getItem(LOCALSTORAGE_DATA.refreshtoken)}`,
        },
        params: {
          sortMethod: sortingOptions.sortMethod,
          sortType: sortingOptions.sortType,
          dateWith: sortingOptions.dateWith,
          dateFor: sortingOptions.dateFor,
        },
      },
    );
  }

  public editOrder(data: IOrder): Observable<IOrder | IAuth> {
    return this.http.patch<IOrder>(
      `${environment.requestLink}${REQUESTS_PATH_LINKS.linkForUpdateOrder}`,
      data,
      {
        headers: {
          accesstoken: `${localStorage.getItem(LOCALSTORAGE_DATA.accesstoken)}`,
          refreshtoken: `${localStorage.getItem(LOCALSTORAGE_DATA.refreshtoken)}`,
        },
      },
    );
  }

  public createOrder(data: IOrder): Observable<IOrder | IAuth> {
    return this.http.post<IOrder>(
      `${environment.requestLink}${REQUESTS_PATH_LINKS.linkForAddNewOrder}`,
      data,
      {
        headers: {
          accesstoken: `${localStorage.getItem(LOCALSTORAGE_DATA.accesstoken)}`,
          refreshtoken: `${localStorage.getItem(LOCALSTORAGE_DATA.refreshtoken)}`,
        },
      },
    );
  }

  public deleteOrder(id: string): any {
    return this.http.delete<IAuth>(
      `${environment.requestLink}${REQUESTS_PATH_LINKS.linkForDeleteOrder}${id}`,
      {
        headers: {
          accesstoken: `${localStorage.getItem(LOCALSTORAGE_DATA.accesstoken)}`,
          refreshtoken: `${localStorage.getItem(LOCALSTORAGE_DATA.refreshtoken)}`,
        },
      },
    );
  }
}
