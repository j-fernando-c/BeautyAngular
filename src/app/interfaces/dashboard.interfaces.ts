
export interface ServiciosDashboard {
    _id:          string;
    total:        number;
    servicioInfo: ServicioInfo;
}

export interface ServicioInfo {
    _id:             string;
    nombre_servicio: string;
    duracion:        number;
    precio:          number;
    estado:          boolean;
    estilista:       string[];
    createdAt:       Date;
    updatedAt:       Date;
}