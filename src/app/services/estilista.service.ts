import { Injectable } from '@angular/core';
import { Estilista } from '../interfaces/estilista.interfaces';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstilistaService {

  private refresh$ = new Subject<void>
  private url ="http://localhost:3000/api/estilista/"
  constructor(private http: HttpClient) { }


  get refresh(){
    return this.refresh$;
  }
  getEstilistas(): Observable<Estilista[]>{
    return this.http.get<Estilista[]>(this.url)
  }

  createEstilista(body:Estilista):Observable<Estilista>{
    return this.http.post<Estilista>(this.url, body)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }
  actualizarEstilista(id:number, body:Estilista):Observable<Estilista>{
    return this.http.put<Estilista>(this.url + id, body);
  }

  getOneEstilista(id:number):Observable<Estilista>{
    return this.http.get<Estilista>(this.url + id)
  }
}
