import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from './api.service';
import { ErrorService } from './error.service';
import { MainService } from './main.service';
import { IAuth, IUser } from '../interfaces/user.interface';
import * as LOCALSTORAGE_DATA from 'src/constants/localstorage-data.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private errorService: ErrorService,
    private mainService: MainService,
    private router: Router,
  ) {}

  public createUser(userData: IUser): void {
    this.mainService.isLoading.next(true);
    this.apiService
      .createUser(userData)
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
        if (result) {
          localStorage.setItem(LOCALSTORAGE_DATA.accesstoken, result.accesstoken);
          localStorage.setItem(LOCALSTORAGE_DATA.refreshtoken, result.refreshtoken);
          this.router.navigate(['/main']);
        }
      });
  }

  public authenticateUser(userData: IUser): void {
    this.mainService.isLoading.next(true);
    this.apiService
      .authenticateUser(userData)
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
        if (result) {
          localStorage.setItem(LOCALSTORAGE_DATA.accesstoken, result.accesstoken);
          localStorage.setItem(LOCALSTORAGE_DATA.refreshtoken, result.refreshtoken);
          this.router.navigate(['/main']);
        }
      });
  }
}
