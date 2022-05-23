import { Injectable } from '@angular/core';
import {
  snackBarNotConnect,
  snackBarExistUser,
  snackBarUnknownUser,
  snackBarDeletedOrder,
} from 'src/constants/snackbar.constants';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private mainService: MainService) {}
  errorHandlerRequests(err: any) {
    if (err?.status === 0) return this.mainService.showSnackBar.next(snackBarNotConnect);
    if (err?.error?.error?.original?.code === '23505')
      return this.mainService.showSnackBar.next(snackBarExistUser);
    console.log(err);
    if (err?.status === 422) {
      return this.mainService.showSnackBar.next(snackBarUnknownUser);
    }
    if (err?.status === 404) {
      return this.mainService.showSnackBar.next(snackBarDeletedOrder);
    }
  }
}
