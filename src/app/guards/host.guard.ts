import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Primero verificar si está autenticado usando AuthGuard
    const isAuthenticated = this.authService.checkAuthAndRedirect();
    
    if (!isAuthenticated) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return false;
    }

    // Verificar si el usuario es anfitrión
    if (!this.authService.isHost()) {
      // Redirigir a página de acceso denegado o home
      this.router.navigate(['/']);
      return false;
    }

    // Usuario autenticado y es anfitrión
    return true;
  }
}
