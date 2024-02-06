import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../interfaces/usuario.interfaces';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { VentasService } from 'src/app/services/ventas.service';
import { Ventas } from 'src/app/interfaces/ventas.interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrls: ['./add-ventas.component.css']
})
export class AddVentasComponent {
  cliente: Usuario[] = [];
  servicio: Servicio[] = [];
  constructor(
    private UsuarioServicio: UsuarioService,
    private fb: FormBuilder, private servicioServices: ServiciosService,
    private ventasService: VentasService, private router: Router) { }


  myForm: FormGroup = this.fb.group({
    cliente: ['', Validators.required],
    servicio: ['', Validators.required],
    metodoPago: ['', Validators.required]
  })
  ngOnInit(): void {
    this.UsuarioServicio.getUsuarios().subscribe(res => {
      this.cliente = res.filter(usuario => usuario.estado == true && usuario.roles.some(rol => rol.nombre === 'cliente'));
    })
    this.servicioServices.getServicios().subscribe(res => {
      this.servicio = res.filter(servicio => servicio.estado == true)
    })
  }

  onSave(body: Ventas) {
    this.ventasService.createVenta(body).subscribe(res => {
      Swal.fire({
        icon: 'success',
        iconColor: '#745af2',
        title: '¡Guardado!',
        text: 'La información se ha guardado exitosamente.',
      });
      this.router.navigateByUrl("/dashboard/venta/list")

    })
  }
}
