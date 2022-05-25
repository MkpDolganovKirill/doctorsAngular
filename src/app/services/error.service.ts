import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as ERROR_MESSAGES from 'src/constants/snackbar.constants';
import { MainService } from './main.service';
import * as ERROR_CODES from 'src/constants/error-code.constants';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private mainService: MainService, private router: Router) {}
  errorHandlerRequests(err: any) {
    switch (err?.status) {
      case ERROR_CODES.notConnect:
        this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarNotConnect);
        break;
      case ERROR_CODES.forbidden:
        localStorage.clear();
        this.router.navigate(['/auth']);
        break;
      case ERROR_CODES.orderNotExist:
        this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarDeletedOrder);
        break;
      case ERROR_CODES.unknownUser:
        this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarUnknownUser);
        break;
      default:
        if (err?.error?.error?.original?.code === ERROR_CODES.userAlreadyExist)
          this.mainService.showSnackBar.next(ERROR_MESSAGES.snackBarNotExistUser);
        break;
    }
  }
}
