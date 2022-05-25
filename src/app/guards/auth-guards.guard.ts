import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as LOCALSTORAGE_DATA from 'src/constants/localstorage-data.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (
      !localStorage.getItem(LOCALSTORAGE_DATA.accesstoken) ||
      !localStorage.getItem(LOCALSTORAGE_DATA.refreshtoken)
    ) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
