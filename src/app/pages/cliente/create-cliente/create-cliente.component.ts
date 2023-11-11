import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private clienteServicio:ClienteService,
    private routes:ActivatedRoute,
    private router:Router){


  }
  id!:number;
  sExiste:boolean=false;
  myForm: FormGroup = this.fb.group({

    telefono:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    direccion:['', Validators.required],
    correo_cliente: ['', [Validators.required, Validators.email]],

  });
  ngOnInit(): void {
    this.id=this.routes.snapshot.params['id']
    if(this.id){
      this.sExiste=true
      this.clienteServicio.getOneCliente(this.id).subscribe((res:Cliente)=>{
        this.myForm.patchValue({
          correo_cliente:res.correo_cliente,
          direccion:res.direccion,
          telefono:res.telefono
        })
      })
    }

    
  }

  onSave(cliente:Cliente){
    if (this.sExiste) {
      this.clienteServicio.actualizarCliente(this.id, cliente).subscribe((res:Cliente)=>{
        this.router.navigateByUrl("/dashboard/cliente/list")
      })      
  }else{
    this.clienteServicio.createCliente(cliente).subscribe(res=>{

      
      this.router.navigateByUrl("/dashboard/cliente/list")
    })
        this.myForm.markAllAsTouched()

  }
  }

}
