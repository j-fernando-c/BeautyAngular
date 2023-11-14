import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  constructor(private clienteServicio:ClienteService, private fb:FormBuilder,private routes:Router){}
  cliente:Cliente[]=[];
  subcripcion!: Subscription;
  pages:number=0
  serach: string = ''
  estado:boolean=true;
  textoEstado:string='Activo'
  ngOnInit(): void {
    //Metódo para listar
    this.clienteServicio.getCliente().subscribe(data=>{
      console.log(this.cliente=data)
    });
    //Metódo para refrescar
    this.subcripcion=this.clienteServicio.refresh.subscribe(()=>{
      this.clienteServicio.getCliente().subscribe(data=>{
        console.log(this.cliente=data)
      });
    })
  }

  cambioEstado(id:string){
    this.estado=!this.estado
    if(this.estado){
      this.textoEstado='Activo'
    }else{
      this.textoEstado='Inactivo'
    }
    this.clienteServicio.actulizarEstado(id).subscribe(res=>{
      console.log(res)
    })
  }

//Metódo para eliminar
  eliminarCliente(id:string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result)=>{
      if(result.isConfirmed){
        this.clienteServicio.eliminarCliente(id).subscribe(res=>{
          console.log("Se eliminó con exito")
        })
      }
    })

  }
       //Metodos para la páginacion
       nextPage() {
        this.pages += 7
      }
      //Metodos para la paginacion
      anteriorPage() {
        if (this.pages > 0) {
          this.pages -= 7
    
        }
      }
    
      buscarEstilista(nombre: string) {
        this.serach = nombre;
      }

}
