import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as ERROR_MESSAGES from 'src/constants/snackbar.constants';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private mainService: MainService, private router: Router) {}
  errorHandlerRequests(err: any) {
    if (err?.status === 0)
      return this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarNotConnect);
    if (err?.error?.error?.original?.code === '23505')
      return this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarExistUser);
    if (err?.status === 422) {
      return this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarUnknownUser);
    }
    if (err?.status === 404) {
      return this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarDeletedOrder);
    }
    if (err?.status === 403) {
      localStorage.clear();
      return this.router.navigate(['/auth']);
    }
  }
}
