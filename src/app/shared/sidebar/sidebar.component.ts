import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  userRoles: string[] = [];
  private rolesSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserRoles();
    this.rolesSubscription = this.authService.getRolesObservable().subscribe((roles) => {
      this.userRoles = roles;
    });
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

  canAccessModule(moduleName: string): boolean {
    console.log('Checking access for module:', moduleName);
    console.log('User roles:', this.userRoles);
    // Lógica para verificar si el usuario tiene acceso al módulo

    // Si el usuario tiene el rol 'admin', tiene acceso a todos los módulos
    if (this.userRoles.includes('admin')) {
      return true;
    }

    // Si el usuario tiene el rol 'estilista', solo tiene acceso a CLIENTES, TURNOS y CITAS
    if (this.userRoles.includes('estilista')) {
      return ['CLIENTES', 'TURNOS', 'CITAS'].includes(moduleName);
    }

    // En cualquier otro caso, no tiene acceso
    return false;
  }
}
