// Utilidades de Autenticación para CloudHouse
class AuthManager {
    constructor() {
        this.API_BASE_URL = 'http://localhost:8080';
        this.TOKEN_KEY = 'vivigo_token';
        this.USER_KEY = 'vivigo_user';
    }

    // Guardar token y datos del usuario
    saveAuthData(token, user) {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    // Obtener token
    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Obtener datos del usuario
    getUser() {
        const userData = localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    // Verificar si está autenticado
    isAuthenticated() {
        const token = this.getToken();
        const user = this.getUser();
        return !!(token && user);
    }

    // Cerrar sesión
    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        window.location.href = 'login.html';
    }

    // Obtener headers para peticiones API
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }

    // Verificar si el token está expirado (básico)
    isTokenExpired() {
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
    async login(email, password) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    contrasena: password
                })
            });

            const result = await response.json();
            console.log('Respuesta del backend:', result); // Debug

            if (response.ok && !result.error) {
                // Extraer datos del token JWT
                const token = result.data.token; // El backend devuelve el token en el campo data.token
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

    // Decodificar token JWT para extraer datos del usuario
    decodeToken(token) {
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
    checkAuthAndRedirect() {
        if (!this.isAuthenticated() || this.isTokenExpired()) {
            this.logout();
            return false;
        }
        return true;
    }

    // Obtener rol del usuario
    getUserRole() {
        const user = this.getUser();
        return user ? user.role : null;
    }

    // Verificar si es anfitrión
    isHost() {
        const role = this.getUserRole();
        return role === 'ROL_Anfitrion';
    }

    // Verificar si es huésped
    isGuest() {
        const role = this.getUserRole();
        return role === 'ROL_Huesped';
    }
}

// Instancia global
const auth = new AuthManager();

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
