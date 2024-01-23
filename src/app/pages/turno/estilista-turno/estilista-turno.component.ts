import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-estilista-turno',
  templateUrl: './estilista-turno.component.html',
  styleUrls: ['./estilista-turno.component.css']
})
export class EstilistaTurnoComponent implements OnInit {
  
  turno: ITurnos[]=[];

  id!: string;
  sExiste: boolean;
  

  constructor(private serviceTurno: TurnosService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.sExiste = true;
      this.serviceTurno.getOneTurnoIndividual(this.id).subscribe(res => {
         this.turno=res
         
      });
    }
  }

}


