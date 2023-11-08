import { Estilista } from './../../../interfaces/estilista.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-estilista',
  templateUrl: './create-estilista.component.html',
  styleUrls: ['./create-estilista.component.css']
})
export class CreateEstilistaComponent implements OnInit {

  constructor(
    private servicioEstilista:EstilistaService, 
    private fb:FormBuilder,
    private route:ActivatedRoute){

  }
  id!:number;
  sExiste:boolean=false;
  myForm: FormGroup = this.fb.group({

    telefono:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    correo_estilista: ['', [Validators.required, Validators.email]],

  });
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']
    if(this.id){
      this.sExiste=true
      this.servicioEstilista.getOneEstilista(this.id).subscribe((res:Estilista)=>{
        this.myForm.patchValue({
          correo_estilista:res.correo_estilista,
          telefono:res.telefono
        })
      })
    }
    
  }


  onSave(estilista:Estilista) {
    if (this.myForm.valid) {
      this.servicioEstilista.createEstilista(estilista).subscribe(res=>{
        console.log(res)
      })
          this.myForm.markAllAsTouched()
          
    }

  }
}
