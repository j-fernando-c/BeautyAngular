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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Cliente>([]);
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'direccion', 'telefono', 'estado', 'acciones'];

  constructor(private clienteServicio: ClienteService, private fb: FormBuilder, private router: Router) { }
  cliente: Cliente[] = [];
  subcripcion!: Subscription;

  estado: boolean = true;
  textoEstado: string = 'Activo';

  ngOnInit(): void {
    // Método para listar
    this.clienteServicio.getCliente().subscribe(data => {
      this.cliente = data;
      this.dataSource.data = this.cliente;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Método para refrescar
    this.subcripcion = this.clienteServicio.refresh.subscribe(() => {
      this.clienteServicio.getCliente().subscribe(data => {
        this.cliente = data;
        this.dataSource.data = this.cliente;
      });
    });
  }

  cambioEstado(id: string) {
    this.estado = !this.estado;
    if (this.estado) {
      this.textoEstado = 'Activo';
    } else {
      this.textoEstado = 'Inactivo';
    }
    this.clienteServicio.actulizarEstado(id).subscribe(res => {
      console.log(res);
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
