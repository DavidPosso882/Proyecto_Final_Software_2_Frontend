import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../../../frontend/frontend/types/index.js';

// Interfaz extendida para incluir propiedades adicionales que necesitamos
interface ExtendedUsuario extends Usuario {
  foto?: string;
  fechaNacimiento?: string;
  idioma?: string;
  rol?: 'ROL_Huesped' | 'ROL_Anfitrion';
}

interface Servicio {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  // Formularios
  personalForm!: FormGroup;
  hostForm!: FormGroup;
  securityForm!: FormGroup;
  
  // Estado
  isLoading = false;
  isSubmitting = false;
  isSubmittingHost = false;
  isSubmittingSecurity = false;
  error: string | null = null;
  success: string | null = null;
  showPasswordForm = false;
  activeTab = 'personal';
  passwordStrength = 0;
  
  // Datos del usuario
  currentUser: ExtendedUsuario | null = null;
  profilePreview: string | null = null;
  isHost = false;
  
  // Datos de anfitrión
  serviciosDisponibles: Servicio[] = [
    { id: 'WIFI', nombre: 'Wi-Fi' },
    { id: 'PISCINA', nombre: 'Piscina' },
    { id: 'COCINA', nombre: 'Cocina' },
    { id: 'PARKING', nombre: 'Parking' },
    { id: 'MASCOTAS', nombre: 'Admite Mascotas' },
    { id: 'AIRE_ACONDICIONADO', nombre: 'Aire Acondicionado' },
    { id: 'LAVANDERIA', nombre: 'Lavandería' },
    { id: 'GIMNASIO', nombre: 'Gimnasio' }
  ];
  
  documentos = {
    cedula: false,
    rut: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    console.log('=== PROFILE-EDIT COMPONENT INICIADO ===');
    console.log('Usuario autenticado:', this.authService.isLoggedIn());
    console.log('Usuario actual:', this.authService.getCurrentUser());
    console.log('Router disponible:', this.router);
    console.log('Router URL actual:', this.router.url);
    
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      console.log('Usuario no autenticado, redirigiendo a login...');
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return;
    }
    
    this.currentUser = this.authService.getCurrentUser() as ExtendedUsuario;
    this.isHost = this.authService.isHost();
    
    if (this.currentUser) {
      this.loadUserData();
    } else {
      this.error = 'No se encontró información del usuario';
      console.log('Error: No se encontró información del usuario');
    }
    
    // Agregar event listeners para debugging de navegación
    this.setupNavigationDebugging();
  }

  private setupNavigationDebugging(): void {
    // Esperar a que el DOM esté listo
    setTimeout(() => {
      console.log('=== DEBUGGING NAVEGACIÓN ===');
      
      // Verificar todos los enlaces de navegación
      const navLinks = document.querySelectorAll('.dashboard-nav a');
      console.log('Enlaces de navegación encontrados:', navLinks.length);
      
      navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        const routerLink = link.getAttribute('routerLink');
        console.log(`Enlace ${index}:`, {
          texto: link.textContent?.trim(),
          href: href,
          routerLink: routerLink,
          tagName: link.tagName,
          classList: link.classList.toString()
        });
        
        // Agregar event listener para debugging
        link.addEventListener('click', (event) => {
          console.log('=== CLICK EN ENLACE DE NAVEGACIÓN ===');
          console.log('Enlace clickeado:', {
            texto: link.textContent?.trim(),
            href: href,
            routerLink: routerLink,
            event: event
          });
        });
      });
      
      // Verificar si Angular Router está funcionando
      console.log('Router configurado:', this.router);
      console.log('Router events disponibles:', this.router.events);
    }, 1000);
  }

  private initializeForms(): void {
    // Formulario de información personal
    this.personalForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(2)]],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      fechaNacimiento: [{value: '', disabled: true}],
      bio: [''],
      idioma: ['es'],
      rol: [{value: 'ROL_Huesped', disabled: false}], // Inicialmente habilitado, se deshabilitará después si es anfitrión
      foto: ['']
    });

    // Formulario de información de anfitrión
    this.hostForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      experiencia: [''],
      tiempoRespuesta: ['1h'],
      servicios: [[]],
      cuentaBancaria: ['']
    });

    // Formulario de seguridad
    this.securityForm = this.fb.group({
      contrasenaActual: ['', [Validators.required]],
      contrasenaNueva: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', [Validators.required]],
      perfilPublico: [true],
      notificacionesEmail: [true],
      notificacionesSMS: [false]
    });
  }

  private async loadUserData(): Promise<void> {
    if (!this.currentUser) return;

    this.isLoading = true;
    this.error = null;

    try {
      const token = this.authService.getToken();
      if (!token) throw new Error('No autenticado');

      console.log('Cargando datos del usuario desde el backend...');
      
      // Llamar al backend para obtener datos completos del usuario
      const response = await fetch(`http://localhost:8080/api/usuarios/${this.currentUser.id}`, {
        method: 'GET',
        headers: this.authService.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error al obtener datos del usuario: ${response.status}`);
      }

      const result = await response.json();
      const userData = result.data; // El backend devuelve UsuarioDTO en el campo data
      
      console.log('Datos del usuario cargados:', userData);

      // Actualizar la interfaz con los datos reales del backend
      this.updateUIWithUserData(userData);
      
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      this.error = 'Error al cargar tu perfil. Por favor intenta nuevamente.';
      
      // Si hay error, usar datos del token como fallback
      this.loadUserDataFromToken();
    } finally {
      this.isLoading = false;
    }
  }

  private updateUIWithUserData(userData: any): void {
    console.log('Actualizando UI con datos del usuario:', userData);
    
    // Actualizar header y navegación
    this.updateHeader(userData);
    
    // Actualizar formulario de información personal
    this.updatePersonalForm(userData);
    
    // Actualizar avatar con iniciales reales
    this.updateAvatar(userData.nombre);
    
    // Si es anfitrión, cargar datos adicionales
    if (this.isHost) {
      this.loadHostData();
    }
  }

  private updateHeader(userData: any): void {
    // Actualizar imagen de perfil en el sidebar
    const profileImage = document.getElementById('currentProfileImage') as HTMLImageElement;
    if (profileImage) {
      profileImage.src = userData.foto || `https://placehold.co/80x80/cccccc/333333?text=${this.getInitials(userData.nombre)}`;
    }
    
    // Actualizar nombre en el sidebar
    const profileName = document.querySelector('.user-profile-summary h3') as HTMLElement;
    if (profileName) {
      profileName.textContent = userData.nombre;
    }
    
    // Actualizar "Usuario desde" con fecha de creación real
    const userRole = document.getElementById('userRole') as HTMLElement;
    if (userRole && userData.creadoEn) {
      try {
        const creationYear = new Date(userData.creadoEn).getFullYear();
        userRole.textContent = `Usuario desde ${creationYear}`;
      } catch (error) {
        userRole.textContent = `Usuario desde ${new Date().getFullYear()}`;
      }
    }
  }

  private updatePersonalForm(userData: any): void {
    // Actualizar campos del formulario con datos del backend
    this.personalForm.patchValue({
      nombreCompleto: userData.nombre || '',
      email: userData.email || '',
      telefono: userData.telefono || '',
      fechaNacimiento: userData.fechaNacimiento || '',
      bio: userData.biografia || '',
      idioma: userData.idioma || 'es',
      rol: userData.rol || 'ROL_Huesped',
      foto: userData.foto || ''
    });

    // Establecer preview de imagen
    this.profilePreview = userData.foto || null;
  }

  private updateAvatar(nombreCompleto: string): void {
    // Actualizar cualquier avatar que use iniciales
    const initials = this.getInitials(nombreCompleto);
    console.log('Iniciales para avatar:', initials);
  }

  private loadUserDataFromToken(): void {
    // Fallback: usar datos del token si falla la carga del backend
    if (!this.currentUser) return;

    this.personalForm.patchValue({
      nombreCompleto: this.currentUser.name || '',
      email: this.currentUser.email || '',
      telefono: this.currentUser.telefono || '',
      fechaNacimiento: this.currentUser.fechaNacimiento || '',
      bio: '',
      idioma: 'es',
      rol: this.currentUser.role || 'ROL_Huesped',
      foto: this.currentUser.foto || ''
    });

    this.profilePreview = this.currentUser.foto || null;
  }

  private async loadHostData(): Promise<void> {
    // IMPORTANTE: Solo cargar datos de anfitrión si el usuario YA tiene un perfil de anfitrión
    // No cargar solo porque isHost sea true, ya que eso solo indica el rol, no el perfil
    if (!this.isHost || !this.currentUser?.id) {
      console.log('Usuario no es anfitrión o no tiene ID, saltando carga de datos de anfitrión');
      return;
    }

    try {
      const token = this.authService.getToken();
      if (!token) {
        console.log('No hay token disponible para cargar datos de anfitrión');
        return;
      }

      console.log('Cargando datos de anfitrión para usuario:', this.currentUser.id);
      
      const response = await fetch(`http://localhost:8080/api/usuarios/anfitrion/${this.currentUser.id}`, {
        method: 'GET',
        headers: this.authService.getAuthHeaders()
      });

      console.log('Respuesta del backend para datos de anfitrión:', response.status, response.statusText);

      if (response.ok) {
        const result = await response.json();
        console.log('Datos de anfitrión recibidos:', result);
        
        const hostData = result.data;
        
        if (hostData) {
          this.hostForm.patchValue({
            descripcion: hostData.sobreMi || '',
            experiencia: hostData.experiencia || '',
            tiempoRespuesta: hostData.tiempoRespuesta || '1h',
            servicios: hostData.servicios || [],
            cuentaBancaria: hostData.cuentaBancaria || ''
          });
          console.log('Datos de anfitrión cargados exitosamente');
        } else {
          console.log('No hay datos de anfitrión en la respuesta');
        }
      } else if (response.status === 404) {
        // El usuario no tiene perfil de anfitrión - esto es normal
        console.log('Usuario no tiene perfil de anfitrión (404) - esto es normal para huéspedes');
      } else if (response.status === 500) {
        // Error del servidor - manejar gracefully
        console.error('Error interno del servidor al cargar datos de anfitrión');
        // No mostrar error al usuario ya que esto puede ser normal
      } else {
        console.error(`Error al cargar datos de anfitrión: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error de red al cargar datos de anfitrión:', error);
      // No mostrar error al usuario - el componente puede funcionar sin datos de anfitrión
    }
  }

  // Métodos de navegación
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getUserSinceYear(): string {
    const currentYear = new Date().getFullYear();
    return `Usuario desde ${currentYear}`;
  }

  showFavoritesMessage(event: Event): void {
    event.preventDefault();
    alert('Esta funcionalidad se implementará más adelante.');
  }

  goHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  navigateTo(route: string): void {
    console.log('=== NAVEGANDO A ===', route);
    this.router.navigate([route]).then(
      (success) => {
        console.log('Navegación exitosa:', success);
      },
      (error) => {
        console.error('Error en navegación:', error);
      }
    );
  }

  logoutAndRedirect(): void {
    console.log('=== CERRANDO SESIÓN Y REDIRIGIENDO ===');
    this.authService.logout();
    // El logout ya maneja la redirección a login
  }

  // Métodos del formulario personal
  async savePersonalData(): Promise<void> {
    if (this.personalForm.invalid) {
      this.markFormGroupTouched(this.personalForm);
      this.error = 'Por favor completa todos los campos requeridos';
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.success = null;

    try {
      const token = this.authService.getToken();
      if (!token) throw new Error('No autenticado');

      const formData = this.personalForm.value;

      const updateData = {
        nombre: formData.nombreCompleto,
        telefono: formData.telefono,
        fechaNacimiento: formData.fechaNacimiento,
        idioma: formData.idioma,
        foto: formData.foto
      };

      const response = await fetch(`http://localhost:8080/api/usuarios/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (response.ok && !result.error) {
        this.success = 'Perfil actualizado exitosamente';
        
        // Actualizar datos del usuario en el servicio
        if (result.data) {
          this.authService['currentUserSubject'].next(result.data);
        }
        
        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      } else {
        this.error = result.mensaje || 'Error al actualizar el perfil';
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      if (error instanceof Error) {
        this.error = `Error del servidor: ${error.message}. Por favor intenta nuevamente más tarde.`;
      } else {
        this.error = 'Error de conexión. Por favor intenta nuevamente.';
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  // Métodos del formulario de anfitrión
  async saveHostData(): Promise<void> {
    if (this.hostForm.invalid) {
      this.markFormGroupTouched(this.hostForm);
      this.error = 'Por favor completa todos los campos requeridos';
      return;
    }

    this.isSubmittingHost = true;
    this.error = null;
    this.success = null;

    try {
      const token = this.authService.getToken();
      if (!token) throw new Error('No autenticado');

      const formData = this.hostForm.value;

      const hostData = {
        descripcion: formData.descripcion,
        experiencia: formData.experiencia,
        tiempoRespuesta: formData.tiempoRespuesta,
        servicios: formData.servicios,
        cuentaBancaria: formData.cuentaBancaria
      };

      const response = await fetch(`http://localhost:8080/api/usuarios/anfitrion/${this.currentUser?.id}`, {
        method: 'PUT',
        headers: this.authService.getAuthHeaders(),
        body: JSON.stringify(hostData)
      });

      const result = await response.json();

      if (response.ok && !result.error) {
        this.success = 'Información de anfitrión actualizada exitosamente';
      } else {
        this.error = result.mensaje || 'Error al actualizar información de anfitrión';
      }
    } catch (error) {
      console.error('Error al actualizar información de anfitrión:', error);
      this.error = 'Error de conexión. Por favor intenta nuevamente.';
    } finally {
      this.isSubmittingHost = false;
    }
  }

  // Métodos del formulario de seguridad
  async updateSecurity(): Promise<void> {
    if (this.securityForm.invalid) {
      this.markFormGroupTouched(this.securityForm);
      this.error = 'Por favor completa todos los campos requeridos';
      return;
    }

    const { contrasenaActual, contrasenaNueva, confirmarContrasena } = this.securityForm.value;

    if (contrasenaNueva !== confirmarContrasena) {
      this.error = 'Las contraseñas nuevas no coinciden';
      return;
    }

    this.isSubmittingSecurity = true;
    this.error = null;
    this.success = null;

    try {
      const token = this.authService.getToken();
      if (!token) throw new Error('No autenticado');

      const passwordData = {
        contrasenaActual,
        contrasenaNueva
      };

      const response = await fetch(`http://localhost:8080/api/usuarios/contrasena`, {
        method: 'PUT',
        headers: this.authService.getAuthHeaders(),
        body: JSON.stringify(passwordData)
      });

      const result = await response.json();

      if (response.ok && !result.error) {
        this.success = 'Contraseña actualizada exitosamente';
        
        // Limpiar formulario
        this.securityForm.reset();
        
        // Esperar 2 segundos antes de cerrar sesión
        setTimeout(() => {
          this.authService.logout();
        }, 2000);
      } else {
        this.error = result.mensaje || 'Error al actualizar la contraseña';
      }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      this.error = 'Error de conexión. Por favor intenta nuevamente.';
    } finally {
      this.isSubmittingSecurity = false;
    }
  }

  // Métodos auxiliares
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profilePreview = e.target?.result as string;
        this.personalForm.patchValue({ foto: this.profilePreview });
      };
      
      reader.readAsDataURL(file);
    }
  }

  onDocumentSelected(event: Event, type: 'cedula' | 'rut'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.documentos[type] = true;
      // Aquí podrías implementar la lógica para subir el documento
      console.log(`Documento ${type} seleccionado:`, input.files[0].name);
    }
  }

  toggleServicio(servicioId: string): void {
    const servicios = this.hostForm.get('servicios')?.value || [];
    const index = servicios.indexOf(servicioId);
    
    if (index > -1) {
      servicios.splice(index, 1);
    } else {
      servicios.push(servicioId);
    }
    
    this.hostForm.patchValue({ servicios });
  }

  onPasswordInput(): void {
    this.calculatePasswordStrength();
  }

  private calculatePasswordStrength(): void {
    const password = this.securityForm.get('contrasenaNueva')?.value || '';
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    this.passwordStrength = Math.min(strength, 4);
  }

  confirmDeleteAccount(): void {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      if (confirm('¿Realmente quieres eliminar tu cuenta? Perderás todos tus datos, reservas e historial.')) {
        alert('Cuenta eliminada. Serás redirigido a la página principal.');
        // Aquí implementarías la lógica real de eliminación de cuenta
        this.router.navigate(['/']);
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para los controles del formulario
  get nombreControl() {
    return this.personalForm.get('nombreCompleto');
  }

  get emailControl() {
    return this.personalForm.get('email');
  }

  get telefonoControl() {
    return this.personalForm.get('telefono');
  }

  get contrasenaActualControl() {
    return this.securityForm.get('contrasenaActual');
  }

  get contrasenaNuevaControl() {
    return this.securityForm.get('contrasenaNueva');
  }

  get confirmarContrasenaControl() {
    return this.securityForm.get('confirmarContrasena');
  }
}
