import { Component, OnInit } from '@angular/core';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { TurnosService } from 'src/app/services/turnos.service';
import { ActivatedRoute } from '@angular/router';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  Estilistas: Estilista[] = [];
  id: string;
  turnos: ITurnos[] = [];
  estilistaSeleccionado: string = ''; // Definir la propiedad estilistaSeleccionado

  constructor(
    private servicesEstilista: EstilistaService,
    private turnosService: TurnosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.servicesEstilista.getEstilistas().subscribe((res) => {
      this.Estilistas = res.filter(estilista => estilista.estado == true);
    });

  }
  onEstilistaChange(event: any): void {

    this.turnosService.getTurnos(this.estilistaSeleccionado).subscribe((res) => {
      this.turnos = res;


    })

  }
  cambioEstado(id: string) {
    this.turnosService.actulizarEstado(id).subscribe(res => {

    });
  }




}

