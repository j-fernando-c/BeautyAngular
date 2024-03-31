import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Ventas } from '../interfaces/ventas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }
  private refresh$ = new Subject<void>
  private url = 'https://beautyapi-9rry.onrender.com/api/ventas/';
  private url2 ="https://beautyapi-9rry.onrender.com/api/ventas/estado/"
  get refresh(){
    return this.refresh$;
  }

  getVentas():Observable<Ventas[]>{
    return this.http.get<Ventas[]>(this.url)
  }

  getOneVenta(id:string):Observable<Ventas>{
    return this.http.get<Ventas>(this.url + id)
  }

  createVenta(body: Ventas): Observable<Ventas> {
    return this.http.post<Ventas>(this.url, body)
      .pipe(
        tap(() => {
          this.refresh$.next();
        }),
     )
  }
  actualizarVenta(id:string, body:Ventas):Observable<Ventas>{
    return this.http.put<Ventas>(this.url + id, body);
  }

  EliminarVenta(id:string):Observable<Ventas>{
    return this.http.delete<Ventas>(this.url + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }

  actualizarEstado(id:string):Observable<Ventas>{
    return this.http.get<Ventas>(this.url2 + id) 
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }
}
