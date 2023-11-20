import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroServicio'
})
export class FiltroPipeServicio implements PipeTransform {

  transform(servicios: Servicio[], pages: number = 0, serach: string = ''): Servicio[] {

    if (serach.length == 0)
      return servicios.slice(pages, pages + 7)

    const filtrarServicios = servicios.filter(es => 
      es.nombre_servicio.toLowerCase().includes(serach) ||
      es.estilista.nombre.toLowerCase().includes(serach)       
      )
    return filtrarServicios.slice(pages, pages + 7)

  }

}