import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-servicio',
  templateUrl: './list-servicio.component.html',
  styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent implements OnInit {
    //Variable para buscar
  serach: string = ''
  pages: number = 0;
  servicio:Servicio[]=[];
  subcripcion!: Subscription;

  estado:boolean=true;
  textoEstado:string='Activo'
  constructor(private servicioServices:ServiciosService){}
  ngOnInit(): void {
    this.servicioServices.getServicios().subscribe(res=>{
      this.servicio=res;

    })
//Metódo que me permite refrescar
    this.subcripcion = this.servicioServices.refresh.subscribe(() => {
      this.servicioServices.getServicios().subscribe(data => {
        this.servicio = data
      });
    })
  }
//Metódo que me permite cambiar de estado
  cambioEstado(id:string){
    this.servicioServices.actualizarEstado(id).subscribe(res=>{

    })


  }
//Metodo que me permite eliminar
  eliminarServicio(id:string){
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
        this.servicioServices.eliminarServicio(id).subscribe(res=>{
          console.log("Se eliminó con exito")
        })
      }
    })
  }

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
