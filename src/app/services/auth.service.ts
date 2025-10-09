import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario, LoginRequest, LoginResponse, ApiResponse } from '../../../frontend/frontend/types/index.js';

// Clase AuthManager integrada directamente en el servicio Angular
class AuthManager {
    private readonly API_BASE_URL: string = 'http://localhost:8080';
    private readonly TOKEN_KEY: string = 'vivigo_token';
    private readonly USER_KEY: string = 'vivigo_user';

    // Guardar token y datos del usuario
    saveAuthData(token: string, user: Usuario): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    // Obtener token
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Obtener datos del usuario
    getUser(): Usuario | null {
        const userData = localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    // Verificar si está autenticado
    isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getUser();
        return !!(token && user);
    }

    // Cerrar sesión
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    // Obtener headers para peticiones API
    getAuthHeaders(): Record<string, string> {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }

    // Verificar si el token está expirado (básico)
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;

        try {
            // Decodificar JWT (sin verificar firma)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            console.error('Error al decodificar token:', error);
            return true;
        }
    }

    // Login con backend
    async login(email: string, password: string): Promise<{ success: boolean; user?: Usuario; error?: string }> {
        try {
            const loginRequest: LoginRequest = {
                email: email.trim(),
                contrasena: password
            };

            const response = await fetch(`${this.API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            });

            const result: ApiResponse<LoginResponse> = await response.json();

            if (response.ok && !result.error && result.data) {
                const token = result.data.token;
                
                if (!token) {
                    return {
                        success: false,
                        error: 'No se recibió token del servidor'
                    };
                }
                
                const userData = this.decodeToken(token);
                
                if (!userData) {
                    return {
                        success: false,
                        error: 'Error al decodificar el token'
                    };
                }
                
                this.saveAuthData(token, userData);
                
                return {
                    success: true,
                    user: userData
                };
            } else {
                return {
                    success: false,
                    error: result.mensaje || 'Error en el inicio de sesión'
                };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return {
                success: false,
                error: 'Error de conexión. Verifica que el servidor esté disponible.'
            };
        }
    }

    // Decodificar token JWT para extraer datos del usuario
    decodeToken(token: string): Usuario | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                role: payload.role
            };
        } catch (error) {
            console.error('Error al decodificar token:', error);
            return null;
        }
    }

    // Obtener rol del usuario
    getUserRole(): string | null {
        const user = this.getUser();
        return user ? user.role : null;
    }

    // Verificar si es anfitrión
    isHost(): boolean {
        const role = this.getUserRole();
        return role === 'ROL_Anfitrion';
    }

    // Verificar si es huésped
    isGuest(): boolean {
        const role = this.getUserRole();
        return role === 'ROL_Huesped';
    }

    // Refrescar token si está cerca de expirar
    async refreshTokenIfNeeded(): Promise<boolean> {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            const timeUntilExpiry = payload.exp - currentTime;
            
            if (timeUntilExpiry < 300) {
                const response = await fetch(`${this.API_BASE_URL}/api/auth/refresh`, {
                    method: 'POST',
                    headers: this.getAuthHeaders()
                });

                if (response.ok) {
                    const result: ApiResponse<{ token: string }> = await response.json();
                    if (result.data?.token) {
                        const userData = this.decodeToken(result.data.token);
                        if (userData) {
                            this.saveAuthData(result.data.token, userData);
                            return true;
                        }
                    }
                }
            }
            return true;
        } catch (error) {
            console.error('Error al refrescar token:', error);
            return false;
        }
    }

    // Registro de usuario
    async register(userData: {
        nombre: string;
        email: string;
        contrasena: string;
        telefono?: string;
        rol?: 'ROL_Anfitrion' | 'ROL_Huesped';
    }): Promise<{ success: boolean; user?: Usuario; error?: string; errors?: string[] }> {
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result: ApiResponse<Usuario> = await response.json();

            if (response.ok && !result.error && result.data) {
                return {
                    success: true,
                    user: result.data
                };
            } else {
                return {
                    success: false,
                    error: result.mensaje || 'Error en el registro',
                    errors: result.errores
                };
            }
        } catch (error) {
            console.error('Error en registro:', error);
            return {
                success: false,
                error: 'Error de conexión. Verifica que el servidor esté disponible.'
            };
        }
    }

    // Solicitar recuperación de contraseña
    async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const result: ApiResponse<void> = await response.json();

            if (response.ok && !result.error) {
                return { success: true };
            } else {
                return {
                    success: false,
                    error: result.mensaje || 'Error al solicitar recuperación de contraseña'
                };
            }
        } catch (error) {
            console.error('Error en solicitud de recuperación:', error);
            return {
                success: false,
                error: 'Error de conexión. Verifica que el servidor esté disponible.'
            };
        }
    }

    // Restablecer contraseña
    async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string; errors?: string[] }> {
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    token,
                    contrasena: newPassword
                })
            });

            const result: ApiResponse<void> = await response.json();

            if (response.ok && !result.error) {
                return { success: true };
            } else {
                return {
                    success: false,
                    error: result.mensaje || 'Error al restablecer contraseña',
                    errors: result.errores
                };
            }
        } catch (error) {
            console.error('Error al restablecer contraseña:', error);
            return {
                success: false,
                error: 'Error de conexión. Verifica que el servidor esté disponible.'
            };
        }
    }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authManager: AuthManager;
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.authManager = new AuthManager();
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const user = this.authManager.getUser();
    const isAuth = this.authManager.isAuthenticated();
    
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(isAuth);

    // Verificar si el token está expirado
    if (isAuth && this.authManager.isTokenExpired()) {
      this.logout();
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await this.authManager.login(email, password);
      
      if (result.success && result.user) {
        this.currentUserSubject.next(result.user);
        this.isAuthenticatedSubject.next(true);
        
        // Emitir evento de cambio de autenticación
        window.dispatchEvent(new CustomEvent('authChanged', { 
          detail: { isAuthenticated: true, user: result.user } 
        }));
        
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error de conexión. Verifica que el servidor esté disponible.' };
    }
  }

  async register(userData: {
    nombre: string;
    email: string;
    contrasena: string;
    telefono?: string;
    rol?: 'ROL_Anfitrion' | 'ROL_Huesped';
  }): Promise<{ success: boolean; user?: Usuario; error?: string; errors?: string[] }> {
    return await this.authManager.register(userData);
  }

  logout(): void {
    this.authManager.logout();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    
    // Emitir evento de cambio de autenticación
    window.dispatchEvent(new CustomEvent('authChanged', { 
      detail: { isAuthenticated: false, user: null } 
    }));
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isHost(): boolean {
    return this.authManager.isHost();
  }

  isGuest(): boolean {
    return this.authManager.isGuest();
  }

  getToken(): string | null {
    return this.authManager.getToken();
  }

  getAuthHeaders(): Record<string, string> {
    return this.authManager.getAuthHeaders();
  }

  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    return await this.authManager.requestPasswordReset(email);
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string; errors?: string[] }> {
    return await this.authManager.resetPassword(token, newPassword);
  }

  async refreshTokenIfNeeded(): Promise<boolean> {
    const result = await this.authManager.refreshTokenIfNeeded();
    if (result) {
      this.initializeAuthState(); // Actualizar estado después del refresh
    }
    return result;
  }

  // Método para verificar autenticación en guards
  checkAuthAndRedirect(): boolean {
    console.log('=== CHECK AUTH AND REDIRECT DEBUG ===');
    console.log('isLoggedIn():', this.isLoggedIn());
    console.log('Token:', this.getToken());
    console.log('Token expirado:', this.authManager.isTokenExpired());
    
    if (!this.isLoggedIn()) {
      console.log('No está autenticado');
      return false;
    }
    
    if (this.authManager.isTokenExpired()) {
      console.log('Token expirado, limpiando datos...');
      // Solo limpiar los datos, no redirigir desde aquí
      this.authManager.logout();
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      return false;
    }
    
    console.log('Autenticación válida');
    return true;
  }

  // Observable para cambios en el estado de autenticación
  onAuthChanged(): Observable<{ isAuthenticated: boolean; user: Usuario | null }> {
    return new Observable(observer => {
      const handleAuthChange = (event: CustomEvent) => {
        observer.next(event.detail);
      };

      window.addEventListener('authChanged', handleAuthChange as EventListener);
      
      // Emitir estado actual
      observer.next({
        isAuthenticated: this.isLoggedIn(),
        user: this.getCurrentUser()
      });

      return () => {
        window.removeEventListener('authChanged', handleAuthChange as EventListener);
      };
    });
  }
}
