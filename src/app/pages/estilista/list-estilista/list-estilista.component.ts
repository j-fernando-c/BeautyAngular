import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';

@Component({
  selector: 'app-list-estilista',
  templateUrl: './list-estilista.component.html',
  styleUrls: ['./list-estilista.component.css']
})
export class ListEstilistaComponent implements OnInit {
  estilista:Estilista[]=[]
  private formData!: Estilista;
  title: any;
  subcripcion!: Subscription;
  constructor(private servicioEstilista:EstilistaService, private fb:FormBuilder,private routes:Router){

  }
  ngOnInit(): void {
    this.servicioEstilista.getEstilistas().subscribe(data=>{
      console.log(this.estilista=data)
    });

    this.subcripcion=this.servicioEstilista.refresh.subscribe(()=>{
      this.servicioEstilista.getEstilistas().subscribe(data=>{
        console.log(this.estilista=data)
      });
    })


  }







  // actualizar2(from:Estilista){
  //   this.servicioEstilista.actualizar(from).subscribe(res=>{
      
  //   })
  // }
  // getOneEstilista(id:number){
  //   this.servicioEstilista.getOneEstilista(id).subscribe(res=>{
  //     console.log(res)
  //   })
  // }

  // eliminar(id:number){
  //   this.servicioEstilista.eliminar(id).subscribe(data=>{
  //     console.log(data)
  //   })
  // }

}
