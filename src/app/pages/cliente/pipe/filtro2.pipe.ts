import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro2'
})
export class FiltroPipe2 implements PipeTransform {

  transform(Clientes: Cliente[], pages: number=0, serach:string=''): Cliente[] {

    if(serach.length==0)
    return Clientes.slice(pages,pages+7)
    
    const filtrarClientes=Clientes.filter(es=>
      es.nombre.toLocaleLowerCase().includes(serach)|| 
      es.apellido.toLocaleLowerCase().includes(serach) 
    || es.email.toLocaleLowerCase().includes(serach))
    return filtrarClientes.slice(pages,pages+7)
    
  }

}