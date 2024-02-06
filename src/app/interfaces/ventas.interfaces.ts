export interface Ventas{
    _id:string
    cliente:Cliente,
    servicio:Servicio
    metodoPago:string
    
}

export interface Cliente {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    estado: boolean;
    telefono: string;
    direccion: string;
}

export interface Servicio {
    _id:             string;
    nombre_servicio: string;
    duracion:        string;
    precio:          number;
    estado:          boolean;
}