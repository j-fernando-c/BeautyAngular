import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  userRoles: string[] = [];
  private jwtHelper = new JwtHelperService();
  private rolesSubscription: Subscription;
  userId: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserRoles();
    this.rolesSubscription = this.authService.getRolesObservable().subscribe((roles) => {
      this.userRoles = roles;
    });
    this.getUserId();  // Llama a esta función para obtener el ID del usuario al iniciar
  }

  ngOnDestroy(): void {
    this.rolesSubscription.unsubscribe(); // Desuscribirse para evitar posibles fugas de memoria
  }

  private loadUserRoles(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userRoles = userInfo.roles;
    }
  }

  getUserId(): void {
    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo ? userInfo._id : null;
  }

  canAccessModule(moduleName: string): boolean {
    
    if (this.userRoles.includes('admin')) {
      return true;
    }

    const lowerCaseModuleName = moduleName.toLowerCase();

    if (this.userRoles.includes(lowerCaseModuleName)) {
      return true;
    }

    return false;
  }

  
  canAccessEstilistaModule(): boolean {
    return this.userRoles.includes('estilista');
  }

  canAccessClienteModule():boolean{
    return this.userRoles.includes('cliente')
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserInfo(): { _id: string, roles: string[] } | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    }
    return null;
  }
}
