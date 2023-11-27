import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  roles: string[] = [];
  menuItems: MenuItem[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.getRoles().subscribe(
      (roles) => {
        this.roles = roles.map((role) => role.nombre);
        this.configureMenu();
      },
      (error) => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  private configureMenu() {
    // Aquí defines la estructura de tu menú basándote en los roles del usuario
    // Por ejemplo:
    this.menuItems = [
      { label: 'Dashboard', route: '/dashboard', roles: ['admin', 'estilista', 'cliente'] },
      { label: 'Turnos', route: '/turnos', roles: ['admin', 'estilista'] },
      { label: 'Citas', route: '/citas', roles: ['admin', 'estilista', 'cliente'] },
      { label: 'estilista', route: '/citas', roles: ['admin', 'estilista'] },
      { label: 'cliente', route: '/citas', roles: ['admin', 'estilista', 'cliente'] },
      { label: 'servicio', route: '/citas', roles: ['admin', 'estilista', 'cliente'] },
      { label: 'roles', route: '/citas', roles: ['admin', 'estilista'] },
      { label: 'configuracion', route: '/citas', roles: ['admin', 'estilista', 'cliente'] },
      // ... otros elementos de menú ...
    ];
  }

  // Método para verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  // Método para filtrar elementos del menú según los roles del usuario
  getMenuItems(): MenuItem[] {
    return this.menuItems.filter((item) => item.roles.some((role) => this.hasRole(role)));
  }
}

interface MenuItem {
  label: string;
  route: string;
  roles: string[];
}
