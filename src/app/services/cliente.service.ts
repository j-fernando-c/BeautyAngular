import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private refresh$ = new Subject<void>
  private url ="http://localhost:3000/api/cliente/"
  constructor(private http: HttpClient) { }


  get refresh(){
    return this.refresh$;
  }
  getCliente(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
  }

  createCliente(body:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, body)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }
  actualizarCliente(id:number, body:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url + id, body);
  }
  getOneCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(this.url + id)
  }
}
