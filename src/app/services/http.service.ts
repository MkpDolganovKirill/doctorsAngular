import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { Router } from '@angular/router';
import { IAuth, IUser } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';
import { ErrorService } from './error.service';

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
        console.log('result', result);
        if (result) {
          localStorage.setItem('accesstoken', result.accesstoken);
          localStorage.setItem('refreshtoken', result.refreshtoken);
          this.router.navigateByUrl('/main');
        }
      });
  }
}
