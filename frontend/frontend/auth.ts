import { Usuario, LoginRequest, LoginResponse, ApiResponse } from './types/index.js';

// Utilidades de Autenticación para CloudHouse - TypeScript Version
export class AuthManager {
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
        window.location.href = 'login.html';
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

    // Login con backend - TypeScript version
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
            console.log('Respuesta del backend:', result); // Debug

            if (response.ok && !result.error && result.data) {
                // Extraer datos del token JWT
                const token = result.data.token;
                console.log('Token recibido:', token); // Debug
                
                if (!token) {
                    return {
                        success: false,
                        error: 'No se recibió token del servidor'
                    };
                }
                
                const userData = this.decodeToken(token);
                console.log('Datos del usuario decodificados:', userData); // Debug
                
                if (!userData) {
                    return {
                        success: false,
                        error: 'Error al decodificar el token'
                    };
                }
                
                // Guardar datos de autenticación
                this.saveAuthData(token, userData);
                console.log('Datos guardados exitosamente'); // Debug
                
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

    // Decodificar token JWT para extraer datos del usuario - TypeScript version
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

    // Verificar autenticación y redirigir si es necesario
    checkAuthAndRedirect(): boolean {
        if (!this.isAuthenticated() || this.isTokenExpired()) {
            this.logout();
            return false;
        }
        return true;
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
            
            // Si el token expira en menos de 5 minutos, refrescar
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

    // Validar formato de email
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar fuerza de contraseña
    private validatePassword(password: string): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];
        
        if (password.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres');
        }
        
        if (!/[A-Z]/.test(password)) {
            errors.push('La contraseña debe tener al menos una mayúscula');
        }
        
        if (!/[a-z]/.test(password)) {
            errors.push('La contraseña debe tener al menos una minúscula');
        }
        
        if (!/[0-9]/.test(password)) {
            errors.push('La contraseña debe tener al menos un número');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
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
            // Validaciones básicas
            if (!this.isValidEmail(userData.email)) {
                return {
                    success: false,
                    error: 'El formato del email no es válido'
                };
            }

            const passwordValidation = this.validatePassword(userData.contrasena);
            if (!passwordValidation.isValid) {
                return {
                    success: false,
                    errors: passwordValidation.errors
                };
            }

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
            if (!this.isValidEmail(email)) {
                return {
                    success: false,
                    error: 'El formato del email no es válido'
                };
            }

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
            const passwordValidation = this.validatePassword(newPassword);
            if (!passwordValidation.isValid) {
                return {
                    success: false,
                    errors: passwordValidation.errors
                };
            }

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

// Instancia global
export const auth = new AuthManager();

// Exportar para uso en otros módulos
export default AuthManager;
