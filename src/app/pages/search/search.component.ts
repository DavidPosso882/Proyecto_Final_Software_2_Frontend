import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Alojamiento } from '../../../../frontend/frontend/types/index.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  accommodations: Alojamiento[] = [];
  isLoading = false;
  error: string | null = null;
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  // Filtros de búsqueda
  searchParams = {
    ciudad: '',
    checkin: '',
    checkout: '',
    huespedes: 1,
    precioMin: 0,
    precioMax: 0,
    servicios: [] as string[]
  };

  private routeSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Escuchar parámetros de la URL
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.searchParams = {
        ciudad: params['ciudad'] || '',
        checkin: params['checkin'] || '',
        checkout: params['checkout'] || '',
        huespedes: parseInt(params['huespedes']) || 1,
        precioMin: parseFloat(params['precioMin']) || 0,
        precioMax: parseFloat(params['precioMax']) || 0,
        servicios: params['servicios'] ? params['servicios'].split(',') : []
      };
      
      this.loadAccommodations();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  async loadAccommodations(page: number = 0): Promise<void> {
    this.isLoading = true;
    this.error = null;
    this.currentPage = page;

    try {
      const params = new URLSearchParams();
      
      if (this.searchParams.ciudad) params.append('ciudad', this.searchParams.ciudad);
      if (this.searchParams.checkin) params.append('checkin', this.searchParams.checkin);
      if (this.searchParams.checkout) params.append('checkout', this.searchParams.checkout);
      if (this.searchParams.huespedes > 1) params.append('huespedes', this.searchParams.huespedes.toString());
      if (this.searchParams.precioMin > 0) params.append('precioMin', this.searchParams.precioMin.toString());
      if (this.searchParams.precioMax > 0) params.append('precioMax', this.searchParams.precioMax.toString());
      if (this.searchParams.servicios.length > 0) params.append('servicios', this.searchParams.servicios.join(','));
      
      params.append('pagina', page.toString());

      const response = await fetch(`http://localhost:8080/api/alojamientos/buscar?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al buscar alojamientos');
      }

      const result = await response.json();
      this.accommodations = result.data || [];
      this.totalItems = result.total || 0;
      this.totalPages = Math.ceil(this.totalItems / 10); // Asumiendo 10 items por página

    } catch (error) {
      console.error('Error al buscar alojamientos:', error);
      this.error = 'No pudimos encontrar alojamientos. Por favor intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(): void {
    // Actualizar URL con nuevos parámetros
    const params = new URLSearchParams();
    
    if (this.searchParams.ciudad) params.append('ciudad', this.searchParams.ciudad);
    if (this.searchParams.checkin) params.append('checkin', this.searchParams.checkin);
    if (this.searchParams.checkout) params.append('checkout', this.searchParams.checkout);
    if (this.searchParams.huespedes > 1) params.append('huespedes', this.searchParams.huespedes.toString());
    if (this.searchParams.precioMin > 0) params.append('precioMin', this.searchParams.precioMin.toString());
    if (this.searchParams.precioMax > 0) params.append('precioMax', this.searchParams.precioMax.toString());
    if (this.searchParams.servicios.length > 0) params.append('servicios', this.searchParams.servicios.join(','));

    this.router.navigate(['/search'], { queryParams: Object.fromEntries(params) });
  }

  onClearFilters(): void {
    this.searchParams = {
      ciudad: '',
      checkin: '',
      checkout: '',
      huespedes: 1,
      precioMin: 0,
      precioMax: 0,
      servicios: []
    };
    this.onSearch();
  }

  viewAccommodation(id: number): void {
    this.router.navigate(['/details', id]);
  }

  toggleFavorite(id: number): void {
    // Implementar funcionalidad de favoritos más adelante
    alert('Funcionalidad de favoritos se implementará próximamente');
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadAccommodations(page);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(0, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  onServiceToggle(service: string): void {
    const index = this.searchParams.servicios.indexOf(service);
    if (index > -1) {
      this.searchParams.servicios.splice(index, 1);
    } else {
      this.searchParams.servicios.push(service);
    }
  }

  retryLoad(): void {
    this.loadAccommodations(this.currentPage);
  }

  // Métodos adicionales para el template
  applyFilters(): void {
    this.onSearch();
  }

  clearFilters(): void {
    this.onClearFilters();
  }

  getPageNumbers(): number[] {
    return this.getPages();
  }
}
