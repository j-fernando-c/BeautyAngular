import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public url: string = '';
  public nombreSeccionPrincipal: string = "";
  public nombreSeccionSecundaria: string = "";

  private seccionesMapping: { [key: string]: { principal: string; secundaria?: string } } = {
    //Estilista
    '/dashboard/estilista/list': { principal: 'Gestión de estilista', secundaria: 'Gestión de estilista' },
    '/dashboard/estilista/nuevo': { principal: 'Agregar estilista', secundaria: 'Gestión de estilista > agregar cliente' },

    //Cliente
    '/dashboard/cliente/list': { principal: 'Gestión de clientes', secundaria: 'Gestión de clientes' },
    '/dashboard/cliente/nuevo': { principal: 'Agregar cliente', secundaria: 'Gestión de clientes > agregar cliente' },

    // Usuario
    '/dashboard/usuarios/list': { principal: 'Gestión de usuarios', secundaria: 'Gestión de usuarios' },
    '/dashboard/usuarios/nuevo': { principal: 'Agregar usuario', secundaria: 'Gestión de usuarios > agregar usuario' },
    '/dashboard/usuarios/edit/:id': { principal: 'Editar usuario', secundaria: 'Gestión de usuarios > editar usuario' },

    // Roles
    '/dashboard/roles/list': { principal: 'Gestión de roles', secundaria: 'Gestión de roles' },

    // Servicio
    '/dashboard/servicio/list': { principal: 'Gestión de servicios', secundaria: 'Gestión de servicios' },
    '/dashboard/servicio/nuevo': { principal: 'Agregar servicio', secundaria: 'Gestión de servicios > agregar servicio' },
    '/dashboard/servicio/edit/:id': { principal: 'Editar servicio', secundaria: 'Gestión de servicios > editar servicio' },

    // Turno
    '/dashboard/turno/list': { principal: 'Gestión de turnos', secundaria: 'Gestión de turnos' },
    '/dashboard/turno/estilista/:id': { principal: 'Turnos de estilista', secundaria: 'Gestión de turnos > turnos de estilista' },
    '/dashboard/turno/estilista/edit/:id': { principal: 'Editar turno de estilista', secundaria: 'Gestión de turnos > editar turno de estilista' },
    '/dashboard/turno/nuevo': { principal: 'Agregar turno', secundaria: 'Gestión de turnos > agregar turno' },
    '/dashboard/turno/edit/:id': { principal: 'Editar turno', secundaria: 'Gestión de turnos > editar turno' },

    // Cita
    '/dashboard/cita/list': { principal: 'Gestión de citas', secundaria: 'Gestión de citas' },
    '/dashboard/cita/nuevo': { principal: 'Agregar cita', secundaria: 'Gestión de citas > agregar cita' },
    '/dashboard/cita/nuevo/cliente/:id': { principal: 'Agregar cita para cliente', secundaria: 'Gestión de citas > agregar cita para cliente' },
    '/dashboard/cita/list/cliente/:id': { principal: 'Citas de cliente', secundaria: 'Gestión de citas > citas de cliente' },

    // Venta
    '/dashboard/venta/list': { principal: 'Gestión de ventas', secundaria: 'Gestión de ventas' },
    '/dashboard/venta/list/inactivas': { principal: 'Ventas inactivas', secundaria: 'Gestión de ventas > ventas inactivas' },
    '/dashboard/venta/nuevo': { principal: 'Agregar venta', secundaria: 'Gestión de ventas > agregar venta' },
    '/dashboard/venta/edit/:id': { principal: 'Editar venta', secundaria: 'Gestión de ventas > editar venta' },
    '/dashboard/venta/detalle/:id': { principal: 'Detalle de venta', secundaria: 'Gestión de ventas > detalle de venta' },
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.url = event.url;
      this.actualizarNombresSecciones();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private actualizarNombresSecciones(): void {
    const mapeo = this.seccionesMapping[this.url] || { principal: '', secundaria:'' };
    this.nombreSeccionPrincipal = mapeo.principal;
    this.nombreSeccionSecundaria = mapeo.secundaria || '';
  }
}


