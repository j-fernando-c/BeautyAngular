import { Estilista } from './../../../interfaces/estilista.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-estilista',
  templateUrl: './create-estilista.component.html',
  styleUrls: ['./create-estilista.component.css']
})
export class CreateEstilistaComponent implements OnInit {

  constructor(
    private servicioEstilista:EstilistaService, 
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router){

  }
  id!:string;
  sExiste:boolean=false;
  myForm: FormGroup = this.fb.group({

    telefono:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
    nombre:['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    apellido:['', [Validators.required, Validators.pattern(/^[^\d]+$/) ]],
    email: ['', [Validators.required, Validators.email]],

  });
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']
    if(this.id){
      this.sExiste=true
      this.servicioEstilista.getOneEstilista(this.id).subscribe((res:Estilista)=>{
        this.myForm.patchValue({
          nombre:res.nombre,
          apellido:res.apellido,
          email:res.email,
          telefono:res.telefono
        })
      })
    }
  }


  onSave(estilista:Estilista) {
    if (this.sExiste) {
        this.servicioEstilista.actualizarEstilista(this.id, estilista).subscribe((res:Estilista)=>{
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'La información se ha actualizado exitosamente.',
          });
          this.router.navigateByUrl("/dashboard/estilista/list")
        })      
    }else{
      this.servicioEstilista.createEstilista(estilista).subscribe(res=>{
        Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'La información se ha guardado exitosamente.',
        });
        console.log(res)
        this.router.navigateByUrl("/dashboard/estilista/list")
      })
          this.myForm.markAllAsTouched()

    }
  }
}
