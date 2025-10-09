import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Alojamiento, Resena, CreacionResenaRequest } from '../../../../frontend/frontend/types/index.js';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  accommodation: Alojamiento | null = null;
  isLoading = true;
  error: string | null = null;
  
  // Reseñas
  reviews: Resena[] = [];
  isLoadingReviews = false;
  
  // Formulario de reserva
  bookingForm = {
    checkin: '',
    checkout: '',
    huespedes: 1
  };
  
  // Formulario de reseña
  reviewForm = {
    calificacion: 5,
    comentario: ''
  };
  showReviewForm = false;
  isSubmittingReview = false;
  
  // Galería de imágenes
  currentImageIndex = 0;
  
  private routeSubscription: Subscription | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Escuchar cambios de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(() => {
      // Actualizar UI si es necesario
    });
    
    // Obtener ID del alojamiento de la URL
    this.routeSubscription = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadAccommodation(parseInt(id));
        this.loadReviews(parseInt(id));
      } else {
        this.error = 'ID de alojamiento no válido';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async loadAccommodation(id: number): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(`http://localhost:8080/api/alojamientos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Alojamiento no encontrado');
      }

      const result = await response.json();
      this.accommodation = result.data || null;

      if (!this.accommodation) {
        this.error = 'Alojamiento no encontrado';
      }

    } catch (error) {
      console.error('Error al cargar alojamiento:', error);
      this.error = 'No pudimos cargar la información del alojamiento. Por favor intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  async loadReviews(accommodationId: number): Promise<void> {
    this.isLoadingReviews = true;

    try {
      const response = await fetch(`http://localhost:8080/api/resenas/alojamiento/${accommodationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar reseñas');
      }

      const result = await response.json();
      this.reviews = result.data || [];

    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      // No mostrar error de reseñas como error principal
    } finally {
      this.isLoadingReviews = false;
    }
  }

  // Galería de imágenes
  nextImage(): void {
    if (this.accommodation?.imagenes && this.accommodation.imagenes.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.accommodation.imagenes.length;
    }
  }

  prevImage(): void {
    if (this.accommodation?.imagenes && this.accommodation.imagenes.length > 0) {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? this.accommodation.imagenes.length - 1 
        : this.currentImageIndex - 1;
    }
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  getCurrentImage(): string {
    if (this.accommodation?.imagenes && this.accommodation.imagenes.length > 0) {
      return this.accommodation.imagenes[this.currentImageIndex];
    }
    return this.accommodation?.imagenPrincipal || 'https://placehold.co/800x600/cccccc/333333?text=Alojamiento';
  }

  hasMultipleImages(): boolean {
    return !!(this.accommodation?.imagenes && this.accommodation.imagenes.length > 1);
  }

  // Reservas
  onBookingSubmit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return;
    }

    if (!this.validateBookingForm()) {
      return;
    }

    // Implementar lógica de reserva más adelante
    alert('Funcionalidad de reserva se implementará próximamente');
  }

  validateBookingForm(): boolean {
    if (!this.bookingForm.checkin || !this.bookingForm.checkout) {
      alert('Por favor selecciona las fechas de check-in y check-out');
      return false;
    }

    const checkin = new Date(this.bookingForm.checkin);
    const checkout = new Date(this.bookingForm.checkout);

    if (checkout <= checkin) {
      alert('La fecha de check-out debe ser posterior a la de check-in');
      return false;
    }

    return true;
  }

  // Reseñas
  toggleReviewForm(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return;
    }

    this.showReviewForm = !this.showReviewForm;
    if (this.showReviewForm) {
      this.reviewForm = { calificacion: 5, comentario: '' };
    }
  }

  async submitReview(): Promise<void> {
    if (!this.validateReviewForm()) {
      return;
    }

    this.isSubmittingReview = true;

    try {
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('No autenticado');
      }

      const reviewData: CreacionResenaRequest = {
        alojamientoId: this.accommodation!.id,
        calificacion: this.reviewForm.calificacion,
        comentario: this.reviewForm.comentario
      };

      const response = await fetch('http://localhost:8080/api/resenas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar reseña');
      }

      // Recargar reseñas
      await this.loadReviews(this.accommodation!.id);
      
      // Resetear formulario
      this.showReviewForm = false;
      this.reviewForm = { calificacion: 5, comentario: '' };
      
      alert('Reseña enviada exitosamente');

    } catch (error) {
      console.error('Error al enviar reseña:', error);
      alert('No pudimos enviar tu reseña. Por favor intenta nuevamente.');
    } finally {
      this.isSubmittingReview = false;
    }
  }

  validateReviewForm(): boolean {
    if (!this.reviewForm.comentario.trim()) {
      alert('Por favor escribe un comentario para tu reseña');
      return false;
    }

    if (this.reviewForm.calificacion < 1 || this.reviewForm.calificacion > 5) {
      alert('La calificación debe estar entre 1 y 5 estrellas');
      return false;
    }

    return true;
  }

  // Utilidades
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStarRating(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  toggleFavorite(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return;
    }

    // Implementar funcionalidad de favoritos más adelante
    alert('Funcionalidad de favoritos se implementará próximamente');
  }

  contactHost(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return;
    }

    // Implementar funcionalidad de chat más adelante
    alert('Funcionalidad de chat se implementará próximamente');
  }

  retryLoad(): void {
    if (this.accommodation) {
      this.loadAccommodation(this.accommodation.id);
      this.loadReviews(this.accommodation.id);
    }
  }

  goBack(): void {
    this.router.navigate(['/search']);
  }
}
