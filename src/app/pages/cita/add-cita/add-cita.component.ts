import { EstilistaService } from './../../../services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.css']
})
export class AddCitaComponent implements OnInit {
  estilista:Estilista[];

  constructor(
    private fb:FormBuilder, 
    private estilistaService:EstilistaService,
    private turnosService:TurnosService){}
  ngOnInit(): void {
    this.estilistaService.getEstilistas().subscribe(data => {
      console.log(this.estilista = data)
      
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