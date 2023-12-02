export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  contrasena:string;
  estado: boolean;
  roles: { nombre: string }[]; // roles es un array de objetos con una propiedad nombre
  // otros campos que puedas tener...
}
