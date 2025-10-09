// Interfaces TypeScript para CloudHouse Frontend

// === USUARIOS ===
export interface Usuario {
  id: string;
  email: string;
  name: string;
  role: 'ROL_Anfitrion' | 'ROL_Huesped';
  telefono?: string;
  fotoPerfil?: string;
}

export interface LoginRequest {
  email: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  user: Usuario;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  contrasena: string;
  telefono?: string;
  rol?: 'ROL_Anfitrion' | 'ROL_Huesped';
}

// === ALOJAMIENTOS ===
export interface Direccion {
  ciudad: string;
  departamento?: string;
  direccion: string;
  codigoPostal?: string;
  pais?: string;
}

export interface Localizacion {
  latitud: number;
  longitud: number;
}

export interface Alojamiento {
  id: number;
  titulo: string;
  descripcion: string;
  precioPorNoche: number;
  imagenPrincipal?: string;
  imagenes?: string[];
  direccion?: Direccion;
  localizacion?: Localizacion;
  capacidad: number;
  numeroHabitaciones: number;
  numeroBanos: number;
  servicios: Servicio[];
  promedioCalificaciones: number;
  numeroCalificaciones: number;
  estado: 'ACTIVO' | 'INACTIVO' | 'PENDIENTE';
  anfitrionId: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
}

export enum ServicioEnum {
  WIFI = 'WIFI',
  PISCINA = 'PISCINA',
  COCINA = 'COCINA',
  PARKING = 'PARKING',
  AIRE_ACONDICIONADO = 'AIRE_ACONDICIONADO',
  TV = 'TV',
  LAVADORA = 'LAVADORA',
  JARDIN = 'JARDIN',
  MASCOTAS = 'MASCOTAS',
  GIMNASIO = 'GIMNASIO',
  ZONA_BBQ = 'ZONA_BBQ'
}

// === BÚSQUEDA Y FILTROS ===
export interface BusquedaParams {
  pagina?: number;
  ciudad?: string;
  fechaEntrada?: string;
  fechaSalida?: string;
  huespedes?: number;
  precioMin?: number;
  precioMax?: number;
  servicios?: ServicioEnum[];
  tipoAlojamiento?: string;
}

export interface BusquedaResponse {
  data: Alojamiento[];
  total: number;
  pagina: number;
  totalPaginas: number;
  elementosPorPagina: number;
}

// === RESERVAS ===
export interface Reserva {
  id: number;
  alojamientoId: number;
  huespedId: string;
  fechaEntrada: string;
  fechaSalida: string;
  numeroHuespedes: number;
  precioTotal: number;
  estado: ReservaEstado;
  fechaCreacion: string;
  fechaActualizacion: string;
  alojamiento?: Alojamiento;
  huesped?: Usuario;
}

export enum ReservaEstado {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  COMPLETADA = 'COMPLETADA',
  RECHAZADA = 'RECHAZADA'
}

export interface CreacionReservaRequest {
  alojamientoId: number;
  fechaEntrada: string;
  fechaSalida: string;
  numeroHuespedes: number;
}

// === RESEÑAS ===
export interface Resena {
  id: number;
  alojamientoId: number;
  huespedId: string;
  calificacion: number;
  comentario: string;
  fechaCreacion: string;
  respuesta?: string;
  fechaRespuesta?: string;
  huesped?: Usuario;
}

export interface CreacionResenaRequest {
  alojamientoId: number;
  calificacion: number;
  comentario: string;
}

// === CHAT ===
export interface Mensaje {
  id: number;
  chatId: number;
  remitenteId: string;
  contenido: string;
  fechaEnvio: string;
  leido: boolean;
  remitente?: Usuario;
}

export interface Chat {
  id: number;
  alojamientoId: number;
  anfitrionId: string;
  huespedId: string;
  fechaCreacion: string;
  ultimoMensaje?: string;
  ultimoMensajeFecha?: string;
  alojamiento?: Alojamiento;
  anfitrion?: Usuario;
  huesped?: Usuario;
  mensajes?: Mensaje[];
}

export interface EnvioMensajeRequest {
  chatId: number;
  contenido: string;
}

// === RESPUESTAS API ===
export interface ApiResponse<T> {
  data: T;
  mensaje: string;
  error?: boolean;
  errores?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
  elementosPorPagina: number;
}

// === ESTADOS DE LA APLICACIÓN ===
export interface AuthState {
  isAuthenticated: boolean;
  user: Usuario | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  alojamientos: Alojamiento[];
  alojamientoSeleccionado: Alojamiento | null;
  busquedaParams: BusquedaParams;
  isLoading: boolean;
  error: string | null;
}

// === UTILIDADES ===
export interface SelectOption {
  value: string | number;
  label: string;
}

export interface FormFieldError {
  field: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  requiresAuth?: boolean;
  roles?: string[];
}
