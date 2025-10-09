import { auth } from './auth.js';
import { Alojamiento } from './types/index.js';

// Funciones de navegación y UI
export function updateNavigation(): void {
    const mainNav = document.getElementById('mainNav');
    const token = auth.getToken();
    const user = auth.getUser();
    const isAuth = auth.isAuthenticated();
    
    if (isAuth && user) {
        // Usuario logueado - mostrar navegación personalizada
        const isHost = auth.isHost();
        const initials = getInitials(user.name);

        mainNav!.innerHTML = `
            <ul>
                <li><a href="#" class="user-welcome">¡Hola, ${user.name}!</a></li>
                <li>
                    <div class="user-avatar" onclick="toggleUserMenu()">
                        <span class="avatar-initials">${initials}</span>
                        <div class="user-dropdown" id="userDropdown">
                            <a href="#" onclick="editProfile()">
                                <i class="fa-solid fa-user"></i>
                                Editar Perfil
                            </a>
                            <a href="#" onclick="auth.logout()">
                                <i class="fa-solid fa-right-from-bracket"></i>
                                Cerrar Sesión
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        `;
    } else {
        // Usuario no logueado - mostrar navegación pública
        mainNav!.innerHTML = `
            <ul>
                <li><a href="login.html" class="btn btn-secondary">Iniciar Sesión</a></li>
                <li><a href="register.html" class="btn btn-primary">Regístrate</a></li>
            </ul>
        `;
    }
}

// Función para extraer iniciales del nombre
export function getInitials(name: string): string {
    return name.split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Función para toggle del menú de usuario
export function toggleUserMenu(): void {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Función para editar perfil
export function editProfile(): void {
    // Cerrar el menú dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    
    // Redirigir a la página de edición de perfil
    window.location.href = 'profile_edit.html';
}

// Slideshow functionality
export class SlideshowManager {
    private currentSlide: number = 0;
    private readonly totalSlides: number = 5;
    private intervalId: number | null = null;

    constructor() {
        this.init();
    }

    private init(): void {
        console.log('Iniciando slideshow...');
        this.showSlide(0);
        this.startAutoSlide();
    }

    private showSlide(index: number): void {
        // Remover active de todos
        for (let i = 1; i <= this.totalSlides; i++) {
            const slide = document.querySelector(`.slide-${i}`) as HTMLElement;
            if (slide) {
                slide.classList.remove('active');
            }
        }
        
        // Agregar active al slide actual
        const activeSlide = document.querySelector(`.slide-${index + 1}`) as HTMLElement;
        if (activeSlide) {
            activeSlide.classList.add('active');
            console.log('Mostrando slide:', index + 1);
        }
    }

    private nextSlide(): void {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }

    private startAutoSlide(): void {
        this.intervalId = window.setInterval(() => this.nextSlide(), 4000);
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Gestor de alojamientos
export class AccommodationManager {
    private readonly API_BASE_URL: string = 'http://localhost:8080';

    async loadAccommodations(): Promise<void> {
        const loadingState = document.getElementById('loadingState');
        const accommodationsGrid = document.getElementById('accommodationsGrid');

        if (!loadingState || !accommodationsGrid) {
            console.error('Elementos del DOM no encontrados');
            return;
        }

        try {
            // Mostrar loading
            loadingState.style.display = 'flex';
            accommodationsGrid.style.display = 'none';

            // Hacer la petición a la API
            const response = await fetch(`${this.API_BASE_URL}/api/alojamientos?pagina=0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar alojamientos');
            }

            const result = await response.json();
            const accommodations: Alojamiento[] = result.data || [];

            // Ocultar loading
            loadingState.style.display = 'none';

            if (accommodations.length === 0) {
                accommodationsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-color);">
                        <i class="fa-solid fa-home" style="font-size: 4rem; color: var(--light-green); margin-bottom: 1rem;"></i>
                        <h3>No hay alojamientos disponibles</h3>
                        <p>Los alojamientos aparecerán aquí cuando los anfitriones los publiquen.</p>
                    </div>
                `;
                accommodationsGrid.style.display = 'grid';
            } else {
                accommodationsGrid.innerHTML = accommodations.map(accommodation => 
                    this.createAccommodationCard(accommodation)
                ).join('');
                accommodationsGrid.style.display = 'grid';
            }

        } catch (error) {
            console.error('Error al cargar alojamientos:', error);
            loadingState.style.display = 'none';
            accommodationsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--danger-color);">
                    <i class="fa-solid fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                    <h3>Error al cargar alojamientos</h3>
                    <p>No pudimos cargar los alojamientos. Por favor intenta nuevamente.</p>
                    <button class="btn btn-primary" onclick="accommodationManager.loadAccommodations()" style="margin-top: 1rem;">
                        <i class="fa-solid fa-refresh"></i> Reintentar
                    </button>
                </div>
            `;
            accommodationsGrid.style.display = 'grid';
        }
    }

    private createAccommodationCard(accommodation: Alojamiento): string {
        return `
            <div class="accommodation-card" onclick="viewAccommodation(${accommodation.id})">
                <div class="card-image">
                    <img src="${accommodation.imagenPrincipal || 'https://placehold.co/400x200/cccccc/333333?text=Alojamiento'}" alt="${accommodation.titulo}">
                    <div class="favorite-icon" onclick="event.stopPropagation(); toggleFavorite(${accommodation.id})">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                </div>
                <div class="card-info">
                    <h3>${accommodation.titulo}</h3>
                    <p class="location">
                        <i class="fa-solid fa-map-marker-alt"></i>
                        <span>${accommodation.direccion ? `${accommodation.direccion.ciudad}, ${accommodation.direccion.departamento || ''}` : 'Ubicación no especificada'}</span>
                    </p>
                    <div class="rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${accommodation.promedioCalificaciones?.toFixed(1) || '0.0'} (${accommodation.numeroCalificaciones || 0})</span>
                    </div>
                    <p class="price"><strong>$${accommodation.precioPorNoche?.toFixed(0) || '0'} COP</strong> / noche</p>
                </div>
            </div>
        `;
    }
}

// Gestor de búsqueda
export class SearchManager {
    handleSearch(): void {
        const cityInput = document.getElementById('city') as HTMLInputElement;
        const checkinInput = document.getElementById('checkin') as HTMLInputElement;
        const checkoutInput = document.getElementById('checkout') as HTMLInputElement;
        const guestsInput = document.getElementById('guests') as HTMLInputElement;

        const city = cityInput?.value.trim() || '';
        const checkin = checkinInput?.value || '';
        const checkout = checkoutInput?.value || '';
        const guests = guestsInput?.value || '';

        // Construir parámetros de URL
        const params = new URLSearchParams();

        if (city) params.append('ciudad', city);
        if (checkin) params.append('checkin', checkin);
        if (checkout) params.append('checkout', checkout);
        if (guests) params.append('huespedes', guests);

        // Redirigir a search.html con parámetros
        const searchUrl = `search.html?${params.toString()}`;
        window.location.href = searchUrl;
    }

    setupSearchListeners(): void {
        // Configurar evento del botón de búsqueda
        const searchButton = document.querySelector('.btn-search');
        if (searchButton) {
            searchButton.addEventListener('click', () => this.handleSearch());
        }

        // Permitir búsqueda con Enter en los inputs
        const inputs = ['city', 'checkin', 'checkout', 'guests'];
        inputs.forEach(id => {
            const input = document.getElementById(id) as HTMLInputElement;
            if (input) {
                input.addEventListener('keypress', (event: KeyboardEvent) => {
                    if (event.key === 'Enter') {
                        this.handleSearch();
                    }
                });
            }
        });
    }
}

// Funciones globales para onclick en HTML
declare global {
    interface Window {
        toggleUserMenu: () => void;
        editProfile: () => void;
        viewAccommodation: (id: number) => void;
        toggleFavorite: (id: number) => void;
        accommodationManager: AccommodationManager;
    }
}

// Función para ver detalles del alojamiento
export function viewAccommodation(id: number): void {
    window.location.href = `details.html?id=${id}`;
}

// Función para toggle de favoritos (placeholder)
export function toggleFavorite(id: number): void {
    alert('Funcionalidad de favoritos se implementará próximamente');
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando aplicación...');
    
    // Verificar autenticación y actualizar UI
    updateNavigation();
    
    // Verificar si el token está expirado
    if (auth.isAuthenticated() && auth.isTokenExpired()) {
        console.log('Token expirado, cerrando sesión...');
        auth.logout();
    }

    // Configurar cierre de menú al hacer clic fuera
    document.addEventListener('click', function(event: Event) {
        const avatar = document.querySelector('.user-avatar');
        const dropdown = document.getElementById('userDropdown');
        
        if (avatar && dropdown && !avatar.contains(event.target as Node)) {
            dropdown.classList.remove('show');
        }
    });
});

// Inicialización cuando la página carga completamente
window.addEventListener('load', function() {
    console.log('Página cargada, iniciando componentes');

    // Inicializar slideshow
    const slideshowManager = new SlideshowManager();

    // Inicializar gestor de alojamientos
    const accommodationManager = new AccommodationManager();
    window.accommodationManager = accommodationManager; // Hacerlo global para onclick

    // Inicializar gestor de búsqueda
    const searchManager = new SearchManager();
    searchManager.setupSearchListeners();

    // Cargar alojamientos
    accommodationManager.loadAccommodations();

    // Hacer funciones globales accesibles desde HTML
    window.toggleUserMenu = toggleUserMenu;
    window.editProfile = editProfile;
    window.viewAccommodation = viewAccommodation;
    window.toggleFavorite = toggleFavorite;

    console.log('Aplicación inicializada completamente');
});
