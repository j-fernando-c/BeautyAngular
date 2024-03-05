export interface ITurnos {
  id: string;
  _id: string;
  estilista:Estilista;
  dia: string;
  estado: boolean;
  inicioM: Date;
  finM: Date;
  inicioT: Date;
  finT: Date;
}


export interface Estilista {
  _id:       string;
  nombre:    string;
  apellido:  string;
  email:     string;
  telefono:  string;
  estado:    boolean;

}