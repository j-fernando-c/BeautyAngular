import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const userInfo = this.authService.getUserInfo();
      if (userInfo && userInfo.roles.length > 0) {
        // Puedes agregar lógica adicional aquí según tus necesidades
        return true;
      }
    }

    // Si el usuario no está autenticado o no tiene roles, redirige a la página de inicio de sesión
    this.router.navigate(['/login']);
    return false;
  }
}
