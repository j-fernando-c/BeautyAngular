import { Cliente } from './../../../interfaces/ventas.interfaces';
import { EstilistaService } from './../../../services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.css']
})
export class AddCitaComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  estilista: Estilista[] = [];
  servicio: Servicio[] = [];
  cliente: Cliente[] = [];
  usuarioActivo: Usuario[] = [];
  resultado: any[] = []


  constructor(
    private fb: FormBuilder,
    private turnosService: TurnosService,
    private clienteService: ClienteService,
    private servicioService: ServiciosService,
    private usuarioService: UsuarioService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(0)
    this.maxDate.setDate(6)
  }
  ngOnInit(): void {

    console.log(this.minDate)
    console.log(this.maxDate)

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



  onSave(body: ITurnos) {
    this.turnosService.createTurnos(body).subscribe(res => {

    })
  }

}