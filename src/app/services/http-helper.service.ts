import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';
import { Router } from '@angular/router';
import { IAuth, IUser } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpHelperService {
  public isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  public createUser(body: IUser) {
    return this.http
      .post<IAuth>(`${environment.requestLink}createNewUser`, body)
      .pipe(
        catchError((err) => {
          console.log('error', { ...err });
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
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
    return this.http
      .post<IAuth>(`${environment.requestLink}authorizationUser`, body)
      .pipe(
        catchError((err) => {
          console.log('error', { ...err });
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
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
