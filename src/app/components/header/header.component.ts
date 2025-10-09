import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  user: any = null;
  isHost = false;
  initials = '';
  private authSubscription: Subscription | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log('=== HEADER COMPONENT INICIADO ===');
    this.updateAuthStatus();
    
    // Suscribirse a cambios de autenticación
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      console.log('Cambio en usuario:', user);
      this.user = user;
      this.updateAuthStatus();
    });

    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuth => {
      console.log('Cambio en autenticación:', isAuth);
      this.isAuthenticated = isAuth;
      this.updateAuthStatus();
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateAuthStatus(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.user = this.authService.getCurrentUser();
    this.isHost = this.authService.isHost();
    
    if (this.user) {
      this.initials = this.getInitials(this.user.name);
    }
  }

  private getInitials(name: string): string {
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  toggleUserMenu(): void {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  editProfile(): void {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
    
    // Logging para diagnosticar
    console.log('=== EDITAR PERFIL DEBUG ===');
    console.log('Usuario autenticado:', this.isAuthenticated);
    console.log('Usuario actual:', this.user);
    console.log('Token:', this.authService.getToken());
    console.log('Es anfitrión:', this.isHost);
    console.log('Redirigiendo a: /profile');
    
    // Navegar a la página de perfil
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
  }

  closeDropdownOnClickOutside(event: Event): void {
    const avatar = document.querySelector('.user-avatar');
    const dropdown = document.getElementById('userDropdown');
    
    if (avatar && dropdown && !avatar.contains(event.target as Node)) {
      dropdown.classList.remove('show');
    }
  }
}
