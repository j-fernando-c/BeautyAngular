import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const userInfo = this.authService.getUserInfo();

  
      if (userInfo && userInfo.roles.length >0) {
    
        return true;  // Agrega una condición de salida aquí
      }
    }
  
    this.router.navigate(['/login']);
    return false;
  }
}
