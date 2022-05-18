import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISnackBar } from '../interfaces/snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public showSnackBar = new BehaviorSubject<ISnackBar | null>(null);
}
