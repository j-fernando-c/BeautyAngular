import { Cliente } from './../../../interfaces/ventas.interfaces';
import { EstilistaService } from './../../../services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'; // libreria de fechas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css'],
  providers: [DatePipe]
})
export class EditarCitaComponent implements OnInit {

  estilista: Estilista[] = [];
  servicio: Servicio[] = [];
  cliente: Cliente[] = [];
  usuarioActivo: Usuario[] = [];
  resultado: any[] = []

  fechaActual:string='';
  id!: string;
  sExiste: boolean = false;


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private servicioService: ServiciosService,
    private usuarioService: UsuarioService,
    private citaService: CitaService,
    private route: ActivatedRoute,
    private estilistaService: EstilistaService,
    private router: Router,
    private datePipe: DatePipe) {

  }

  myForm: FormGroup = this.fb.group({
    cliente: ['', Validators.required],
    servicio: ['', Validators.required],
    estilista: ['', Validators.required],
    fechaCita: ['', Validators.required],
    horaCita: ['', Validators.required]
  })

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
      this.resultado = this.usuarioActivo

    })

    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.sExiste = true;
      this.citaService.getOneCita(this.id).subscribe((res: Citas | null) => {
        console.log(res?.estilista.nombre)
        console.log(res?.cliente.nombre)
        if (res) {
          this.myForm.patchValue({
            cliente: res.cliente?._id,
            // servicio: res.servicio?._id,
            // estilista: res.estilista?._id,
            fechaCita: this.datePipe.transform(res.fechaCita, 'yyyy-MM-dd'), // Formatea la fecha
            horaCita: res.horaCita,

          });
        }
      });
    }
  }


  obtenerFechaActual(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.fechaActual = `${year}-${month}-${day}`;
  }

  cargarEstilistas(): void {
    this.estilistaService.getEstilistas().subscribe(
      (res) => {
        this.estilista= res.filter(estilista => estilista.estado == true);
      },
      (error) => {
        console.error('Error al obtener la lista de estilistas:', error);
      }
    );
  }


cargarEstilistasPorServicio() {
  const servicioSeleccionado = this.myForm.get('servicio')?.value;
  this.servicioService.getEstilistaSeleccionado(servicioSeleccionado).subscribe(data => {
    this.estilista = data;
  });
}

calcularDuracionServicio() {
  const servicioSeleccionado = this.myForm.get('servicio')?.value;

  // Obtén la duración del servicio desde el servicio seleccionado
  const duracionServicio = servicioSeleccionado ? servicioSeleccionado.duracion : 0;

  // Obtén la hora de la cita desde el formulario
  const horaCita =  this.myForm.get('horaCita')?.value;

  // Calcula la hora de finalización de la cita sumando la duración del servicio
  const horaFinCita = {
    hour: horaCita.hour + Math.floor(duracionServicio / 60),
    minute: horaCita.minute + (duracionServicio % 60),
    second: 0,
  };
}




  onSave(citas: Citas) {

    const body = {...citas}

    this.citaService.actualizarCita(this.id, body).subscribe({

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
