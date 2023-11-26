import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.css']
})
export class AddTurnoComponent {
  items = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'viernes', 'Sabado', 'Domingo'];
  expandedIndex = 0;
  constructor(private fb:FormBuilder, private router:Router, private turnoService:TurnosService){}

  myForm:FormGroup=this.fb.group({
    title:['', Validators.required],
    start:['', Validators.required],
    end:['', Validators.required],

  })


  onSave(body:ITurnos){
    this.turnoService.createTurnos(body).subscribe(res=>{
      console.log(res)
    })
  }
}
