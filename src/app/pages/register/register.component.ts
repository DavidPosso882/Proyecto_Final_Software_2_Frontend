import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData = {
    nombre: '',
    email: '',
    contrasena: '',
    confirmarContrasena: '',
    telefono: '',
    rol: 'ROL_Huesped' as 'ROL_Anfitrion' | 'ROL_Huesped'
  };
  
  isLoading = false;
  error: string | null = null;
  errors: string[] = [];
  showPassword = false;
  showConfirmPassword = false;
  passwordStrength = 0;

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
    this.clearErrors();
    
    // Validaciones básicas
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    try {
      const result = await this.authService.register({
        nombre: this.formData.nombre.trim(),
        email: this.formData.email.trim(),
        contrasena: this.formData.contrasena,
        telefono: this.formData.telefono.trim() || undefined,
        rol: this.formData.rol
      });
      
      if (result.success) {
        // Redirigir a login con mensaje de éxito
        this.router.navigate(['/login'], { 
          queryParams: { registered: 'true' } 
        });
      } else {
        if (result.errors && result.errors.length > 0) {
          this.errors = result.errors;
        } else {
          this.error = result.error || 'Error en el registro';
        }
      }
    } catch (error) {
      console.error('Error en registro:', error);
      this.error = 'Error de conexión. Por favor intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    const errors: string[] = [];

    // Validación de nombre
    if (!this.formData.nombre.trim()) {
      errors.push('El nombre es obligatorio');
    } else if (this.formData.nombre.trim().length < 3) {
      errors.push('El nombre debe tener al menos 3 caracteres');
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email.trim()) {
      errors.push('El email es obligatorio');
    } else if (!emailRegex.test(this.formData.email)) {
      errors.push('El formato del email no es válido');
    }

    // Validación de contraseña
    if (!this.formData.contrasena) {
      errors.push('La contraseña es obligatoria');
    } else if (this.formData.contrasena.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    } else if (!/[A-Z]/.test(this.formData.contrasena)) {
      errors.push('La contraseña debe tener al menos una mayúscula');
    } else if (!/[a-z]/.test(this.formData.contrasena)) {
      errors.push('La contraseña debe tener al menos una minúscula');
    } else if (!/[0-9]/.test(this.formData.contrasena)) {
      errors.push('La contraseña debe tener al menos un número');
    }

    // Validación de confirmación de contraseña
    if (!this.formData.confirmarContrasena) {
      errors.push('Debes confirmar tu contraseña');
    } else if (this.formData.contrasena !== this.formData.confirmarContrasena) {
      errors.push('Las contraseñas no coinciden');
    }

    if (errors.length > 0) {
      this.errors = errors;
      return false;
    }

    return true;
  }

  onPasswordInput(): void {
    this.calculatePasswordStrength();
  }

  private calculatePasswordStrength(): void {
    const password = this.formData.contrasena;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    this.passwordStrength = Math.min(strength, 4);
  }

  getPasswordStrengthText(): string {
    switch (this.passwordStrength) {
      case 0: return 'Muy débil';
      case 1: return 'Débil';
      case 2: return 'Regular';
      case 3: return 'Fuerte';
      case 4: return 'Muy fuerte';
      default: return '';
    }
  }

  getPasswordStrengthColor(): string {
    switch (this.passwordStrength) {
      case 0: return '#e74c3c';
      case 1: return '#f39c12';
      case 2: return '#f1c40f';
      case 3: return '#2ecc71';
      case 4: return '#27ae60';
      default: return '#95a5a6';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  clearErrors(): void {
    this.error = null;
    this.errors = [];
  }

  onRoleChange(): void {
    // Limpiar errores cuando se cambia el rol
    this.clearErrors();
  }
}
