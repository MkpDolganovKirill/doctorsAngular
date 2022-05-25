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
    switch (err?.status) {
      case 0:
        this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarNotConnect);
        break;
      case 403:
        localStorage.clear();
        this.router.navigate(['/auth']);
        break;
      case 404:
        this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarDeletedOrder);
        break;
      case 422:
        this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarUnknownUser);
        break;
      default:
        if (err?.error?.error?.original?.code === '23505')
          this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarExistUser);
        break;
    }
  }
}
