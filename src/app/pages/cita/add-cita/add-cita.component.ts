import { Cliente } from './../../../interfaces/ventas.interfaces';
import { EstilistaService } from './../../../services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.css']
})
export class AddCitaComponent implements OnInit {
  estilista:Estilista[]=[];
  servicio:Servicio[]=[];
  cliente:Cliente[]=[];

  constructor(
    private fb:FormBuilder, 
    private estilistaService:EstilistaService,
    private turnosService:TurnosService,
    private clienteService:ClienteService,
    private servicioService:ServiciosService){}
  ngOnInit(): void {
    this.estilistaService.getEstilistas().subscribe(data => {
      this.estilista=data.filter(estilista=>estilista.estado==true);
      
    })

    this.servicioService.getServicios().subscribe(res=>{
      this.servicio=res.filter(servicio=>servicio.estado==true);
    })

    this.clienteService.getCliente().subscribe(res=>{
      this.cliente=res.filter(cliente=>cliente.estado==true);
    })
  }
    myForm :FormGroup=this.fb.group({
      start:['', Validators.required],
      end:['', Validators.required],
      extendedProps:['', Validators.required]
    })



    onSave(body:ITurnos){
      this.turnosService.createTurnos(body).subscribe(res=>{
        console.log(res)
      })
    }

}