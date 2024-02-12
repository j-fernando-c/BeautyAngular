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
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrls: ['./add-ventas.component.css']
})
export class AddVentasComponent {
  cliente: Usuario[] = [];
  servicio: Servicio[] = [];

  id!: string;
  sExiste: Boolean;
  constructor(
    private UsuarioServicio: UsuarioService,
    private fb: FormBuilder, private servicioServices: ServiciosService,
    private ventasService: VentasService, private router: Router,
    private route: ActivatedRoute) { }


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


    //Me permite recuperar el id
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.ventasService.getOneVenta(this.id).subscribe((Venta: Ventas) => {
        this.myForm.patchValue({
          cliente: Venta.cliente._id,
          servicio: Venta.servicio._id,
          metodoPago: Venta.metodoPago

        })
      })
    }
  }

  onSave(body: Ventas) {

    if (this.sExiste) {
      this.ventasService.actualizarVenta(this.id, body).subscribe((venta: Ventas) => {
        Swal.fire({
          icon: 'success',
          iconColor: 'success',
          title: '¡Actualizado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/venta/list")
      })

    } else {

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
}
