import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isLoading = false;
  error: string | null = null;
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Si ya está autenticado, redirigir al home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const result = await this.authService.login(this.email, this.password);
      
      if (result.success) {
        this.router.navigate(['/']);
      } else {
        this.error = result.error || 'Error en el inicio de sesión';
      }
    } catch (error) {
      console.error('Error en login:', error);
      this.error = 'Error de conexión. Por favor intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.error = null;
  }
}
