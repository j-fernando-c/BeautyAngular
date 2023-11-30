import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
 
  constructor(private clienteServicio: ClienteService, private fb: FormBuilder, private router: Router) { }
    //Para la paginación
  pages: number = 0;
  cliente: Cliente[] = [];
  subcripcion!: Subscription;
  serach: string = ''
  estado: boolean = true;
  textoEstado: string = 'Activo';

  ngOnInit(): void {
    // Método para listar
    this.clienteServicio.getCliente().subscribe(data => {
      this.cliente = data;

    });

    // Método para refrescar
    this.subcripcion = this.clienteServicio.refresh.subscribe(() => {
      this.clienteServicio.getCliente().subscribe(data => {
        this.cliente = data;
      });
    });
  }

  cambioEstado(id: string) {
    this.clienteServicio.actulizarEstado(id).subscribe(res => {

    });
  }


//Metódo para eliminar
eliminarCliente(id:string){
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    iconColor:'#745af2',
    showCancelButton: true,
    confirmButtonColor: '#745af2',
    cancelButtonColor: '#745af2',
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

  buscarCliente(nombre: string) {
    this.serach = nombre;
  }


}
