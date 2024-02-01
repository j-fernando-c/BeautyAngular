import { Cliente } from './../../../interfaces/ventas.interfaces';
import { EstilistaService } from './../../../services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { CitaService } from 'src/app/services/cita.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.css']
})
export class AddCitaComponent implements OnInit {


  estilista: Estilista[] = [];
  servicio: Servicio[] = [];
  cliente: Cliente[] = [];
  usuarioActivo: Usuario[] = [];
  resultado: any[] = []

  fechaActual:string='';


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private servicioService: ServiciosService,
    private usuarioService: UsuarioService,
    private citaService: CitaService,
    private router: Router) {

  }
  ngOnInit(): void {

    this.obtenerFechaActual();


    this.servicioService.getServicios().subscribe(res => {
      this.servicio = res.filter(servicio => servicio.estado == true);
    })

    this.clienteService.getCliente().subscribe(res => {
      this.cliente = res.filter(cliente => cliente.estado == true);
    })

    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarioActivo = res.filter(usuario => usuario.estado == true && usuario.roles.some(rol => rol.nombre === 'cliente'));
      this.resultado = [...this.cliente, ...this.usuarioActivo]
      

    })

    
  }

  obtenerFechaActual(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.fechaActual = `${year}-${month}-${day}`;
  }


cargarEstilistasPorServicio() {
  const servicioSeleccionado = this.myForm.get('servicio')?.value;
  this.servicioService.getEstilistaSeleccionado(servicioSeleccionado).subscribe(data => {
    this.estilista = data;
  });
}

  myForm: FormGroup = this.fb.group({
    cliente: ['', Validators.required],
    servicio: ['', Validators.required],
    estilista: ['', Validators.required],
    fechaCita: ['', Validators.required],
    horaCita: ['', Validators.required]
  })



  onSave(body: Citas) {
    

    this.citaService.createCitas(body).subscribe({
      
      next: (res) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#4caf50',
          title: '¡Guardado!',
          text: 'La información se ha guardado exitosamente.',
        });
        this.router.navigateByUrl('/dashboard/cita/list');
      },
      error: (error) => {
        console.log('HTTP Status Code:', error.status);

        // Muestra mensajes de error específicos usando SweetAlert
        if (error.status === 400 && error.error && error.error.error) {
          Swal.fire({
            icon: 'error',
            iconColor: '#f44336',
            title: 'Error de validación',
            text: error.error.error,
          });
        } else {
          Swal.fire({
            icon: 'error',
            iconColor: '#f44336',
            title: 'Error',
            text: 'Error al procesar la solicitud',
          });
        }
      }
    });
  }

}