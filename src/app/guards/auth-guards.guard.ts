import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('accesstoken') || !localStorage.getItem('refreshtoken')) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
