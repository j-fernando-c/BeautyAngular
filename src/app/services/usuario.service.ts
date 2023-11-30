import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Role } from '../interfaces/role.interfaces';
import {Usuario} from '../interfaces/usuario.interfaces'



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private refresh$ = new Subject<void>
  private url ="http://localhost:5000/api/usuarios/"
  private url2 ="http://localhost:5000/api/usuarios/estado/"
  private urlR ="http://localhost:5000/api/roles/"

  constructor(private http: HttpClient) { }


  get refresh(){
    return this.refresh$;
  }


  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url)
  }

  createUsuario(body:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url, body)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }


  actualizarUsuario(id:number, body:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.url + id, body);
  }

  getOneUsuario(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.url + id)
  }

  eliminarUsuario(id:string):Observable<Usuario>{
    return this.http.delete<Usuario>(this.url+id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      }))
  }

  actulizarEstado(id:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.url2+id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }


}



