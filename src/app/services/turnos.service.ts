import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITurnos } from '../interfaces/turnos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor( private http: HttpClient) { }

  private url ="http://localhost:5000/api/turnos/"



  getTurnos():Observable<ITurnos[]>{
    return this.http.get<ITurnos[]>(this.url)

  }

  createTurnos(body:ITurnos):Observable<ITurnos>{
    return this.http.post<ITurnos>(this.url, body)
  }






}
