import { Estilista } from './../../../interfaces/estilista.interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(Estilistas: Estilista[], pages: number = 0, serach: string = ''): Estilista[] {

    if (serach.length == 0)
      return Estilistas.slice(pages, pages + 7)

    const filtrarEstilistas = Estilistas.filter(es => 
      es.nombre.toLowerCase().includes(serach) ||
      es.apellido.toLowerCase().includes(serach) ||
      es.email.toLowerCase().includes(serach)
      )
    return filtrarEstilistas.slice(pages, pages + 7)

  }

}
