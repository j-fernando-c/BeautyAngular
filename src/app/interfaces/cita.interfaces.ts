export interface Citas {
    _id: string;
    participante: { tipo: 'Cliente' | 'Usuario'; participanteId: string }[];
    servicio: Servicio2;
    estilista: Estilista2;
    fechaCita: Date;
    horaCita: Date;
    horaFinCita:Date;
    estado: 'confirmada' | 'cancelada' | 'pendiente';
}

export interface Cliente2{
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    estado: boolean;
    telefono: string;
    direccion: string;
}

export interface Servicio2 {
    _id:             string;
    nombre_servicio: string;
    duracion:        string;
    precio:          number;
    estado:          boolean;

}
export interface Estilista2 {
    _id:       string;
    nombre:    string;
    apellido:  string;
    email:     string;
    telefono:  string;
    estado:    boolean;

}
