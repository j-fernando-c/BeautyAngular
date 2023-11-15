export interface Servicio {
    _id:             string;
    nombre_servicio: string;
    duracion:        Date;
    precio:          number;
    estado:          boolean;
    estilista:       Estilista;
}

export interface Estilista {
    _id:      string;
    nombre:   string;
    apellido: string;
    email:    string;
    telefono: string;
    estado:   boolean;
}