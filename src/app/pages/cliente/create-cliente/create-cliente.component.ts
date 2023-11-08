import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  constructor(private servicioCliente:ClienteService, private fb:FormBuilder, private route:ActivatedRoute){

  }
  id!:number;
  sExiste:boolean=false;

  myForm: FormGroup = this.fb.group({

    telefono:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    correo_cliente: ['', [Validators.required, Validators.email]],
    direccion:['', Validators.required]

  });
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']
    if(this.id){
      this.sExiste=true
      this.servicioCliente.getOneCliente(this.id).subscribe((res:Cliente)=>{
        this.myForm.patchValue({
          correo_cliente:res.correo_cliente,
          direccion:res.direccion,
          telefono:res.telefono
        })
      })
    }
    

    
  }


  onSave(cliente:Cliente) {
    if (this.myForm.valid) {
      this.servicioCliente.createCliente(cliente).subscribe(res=>{
        
      })
          this.myForm.markAllAsTouched()
          
    }

  }

}
