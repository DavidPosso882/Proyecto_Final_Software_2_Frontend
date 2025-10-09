import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Alojamiento } from '../../../../frontend/frontend/types/index.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  accommodations: Alojamiento[] = [];
  isLoading = false;
  error: string | null = null;
  currentSlide = 0;
  totalSlides = 5;
  private slideInterval: any = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAccommodations();
    this.startSlideshow();
    
    // Escuchar cambios de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(() => {
      // Actualizar UI si es necesario
    });
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private async loadAccommodations(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch('http://localhost:8080/api/alojamientos?pagina=0', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar alojamientos');
      }

      const result = await response.json();
      this.accommodations = result.data || [];

    } catch (error) {
      console.error('Error al cargar alojamientos:', error);
      this.error = 'No pudimos cargar los alojamientos. Por favor intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  private startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  private nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  showSlide(index: number): void {
    this.currentSlide = index;
  }

  handleSearch(): void {
    const cityInput = document.getElementById('city') as HTMLInputElement;
    const checkinInput = document.getElementById('checkin') as HTMLInputElement;
    const checkoutInput = document.getElementById('checkout') as HTMLInputElement;
    const guestsInput = document.getElementById('guests') as HTMLInputElement;

    const city = cityInput?.value.trim() || '';
    const checkin = checkinInput?.value || '';
    const checkout = checkoutInput?.value || '';
    const guests = guestsInput?.value || '';

    const params = new URLSearchParams();

    if (city) params.append('ciudad', city);
    if (checkin) params.append('checkin', checkin);
    if (checkout) params.append('checkout', checkout);
    if (guests) params.append('huespedes', guests);

    const searchUrl = `/search?${params.toString()}`;
    this.router.navigate([searchUrl]);
  }

  viewAccommodation(id: number): void {
    this.router.navigate(['/details', id]);
  }

  toggleFavorite(id: number): void {
    // Implementar funcionalidad de favoritos más adelante
    alert('Funcionalidad de favoritos se implementará próximamente');
  }

  retryLoad(): void {
    this.loadAccommodations();
  }
}
