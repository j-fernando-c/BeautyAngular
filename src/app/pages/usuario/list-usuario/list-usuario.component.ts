import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Usuario} from 'src/app/interfaces/usuario.interfaces'
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {
  //Para la paginación
  pages: number = 0;
  //Contiene los usuarios
  usuario: Usuario[] = [];


  //Variable para buscar
  serach: string = '';

  rolesDeUsuarios: { [key: string]: string[] } = {};

  subcripcion!: Subscription;

  estado:boolean=true;
  textoEstado:string='Activo'

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private routes: Router) {

  }

  ngOnInit(): void {
    //Metódo para listar
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuario = data
    });
    //Metódo para refrescar
    this.subcripcion = this.usuarioService.refresh.subscribe(() => {
      this.usuarioService.getUsuarios().subscribe(data => {
        this.usuario = data
      });
    })


  }
  cambioEstado(id:string){
    this.usuarioService.actulizarEstado(id).subscribe(res=>{
      console.log(res)
    })
  }



  //Metodo para eliminar
  eliminarUsuario(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      iconColor: '#745af2',
      showCancelButton: true,
      confirmButtonColor: '#745af2',
      cancelButtonColor: '#745af2',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.EliminarUsuario(id).subscribe(res => {
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

  buscarUsuario(nombre: string) {
    this.serach = nombre;
  }


}
