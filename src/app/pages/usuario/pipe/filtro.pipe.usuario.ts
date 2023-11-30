import { Usuario } from '../../../interfaces/usuario.interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuario'
})
export class FiltroPipeUsuario implements PipeTransform {

  transform(usuario: Usuario[], pages: number = 0, serach: string = ''): Usuario[] {

    if (serach.length == 0)
      return usuario.slice(pages, pages + 7)

    const filtrarEstilistas = usuario.filter(es =>
      es.nombre.toLowerCase().includes(serach) ||
      es.apellido.toLowerCase().includes(serach) ||
      es.email.toLowerCase().includes(serach)
      )
    return filtrarEstilistas.slice(pages, pages + 7)

  }

}
