import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Citas } from '../interfaces/cita.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private refresh$ = new Subject<void>
  constructor(private http:HttpClient) { }

  private url = "http://localhost:5000/api/citas/"


  get refresh(){
    return this.refresh$;
  }

  getCita():Observable<Citas[]>{
    return this.http.get<Citas[]>(this.url);
  }

  createCitas(body:Citas): Observable<Citas>{
    return this.http.post<Citas>(this.url, body)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }

  actulizarEstado(id: string, nuevoEstado: string): Observable<Citas> {
    return this.http.put<Citas>(`${this.url}estado/${id}`, { estado: nuevoEstado })
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }


}
