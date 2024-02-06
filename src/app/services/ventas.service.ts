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
  private url = 'http://localhost:5000/api/ventas/';
  private url2 ="http://localhost:5000/api/ventas/estado/"
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

  EliminarVenta(id:string):Observable<Ventas>{
    return this.http.delete<Ventas>(this.url + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }
}
