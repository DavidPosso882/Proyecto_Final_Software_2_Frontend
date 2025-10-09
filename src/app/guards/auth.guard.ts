import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('=== AUTH GUARD DEBUG ===');
    console.log('URL actual:', this.router.url);
    console.log('Usuario autenticado:', this.authService.isLoggedIn());
    console.log('Token:', this.authService.getToken());
    
    // Usar el método checkAuthAndRedirect del AuthService que incluye toda la lógica
    const isValid = this.authService.checkAuthAndRedirect();
    
    console.log('checkAuthAndRedirect resultado:', isValid);
    
    if (!isValid) {
      console.log('Redirigiendo al login...');
      // Redirigir al login si no está autenticado o token expirado
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return false;
    }

    console.log('Acceso permitido a la ruta');
    // Usuario autenticado y token válido
    return true;
  }
}
