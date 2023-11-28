import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  roles: string[] = [];
  menuItems: MenuItem[] = [];
  userRole: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}
  ngOnInit(): void {
    this.usuarioService.getRoles().subscribe((roles) => {
      this.roles = roles.map((role) => role.nombre);
      console.log('Roles del usuario:', this.roles);
      this.configureMenu();
      console.log('Elementos del menú:', this.getMenuItems());
    });
  }

  private configureMenu() {
    console.log('Configuración del menú:', this.menuItems);
    this.menuItems = [
      { label: 'Dashboard', route: '/dashboard/dashboard', roles: ['admin'] },
      { label: 'Turnos', route: '/turnos', roles: ['admin', 'estilista'] },
      { label: 'Citas', route: '/citas', roles: ['admin', 'estilista', 'cliente'] },
      { label: 'Estilistas', route: '/dashboard/estilista/list', roles: ['admin', 'estilista'] },
      { label: 'Clientes', route: '/dashboard/cliente/list', roles: ['admin', 'estilista'] },
      { label: 'Servicios', route: '/', roles: ['admin', 'estilista', 'cliente'] },
      { label: 'Roles', route: '/dashboard/roles/list', roles: ['admin'] },
      { label: 'Configuración', route: '/', roles: ['admin', 'estilista', 'cliente'] },
    ];
  }

  hasRole(role: string): boolean {
    const hasRole = this.roles.includes(role);
    console.log(`Usuario tiene el rol ${role}: ${hasRole}`);
    return hasRole;
  }

  getMenuItems(): MenuItem[] {
    return this.menuItems.filter((item) => item.roles.some((role) => this.hasRole(role)));
  }
}

interface MenuItem {
  label: string;
  route: string;
  roles: string[];
}
