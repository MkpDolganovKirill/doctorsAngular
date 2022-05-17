import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('accesstoken') || !localStorage.getItem('refreshtoken')) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
