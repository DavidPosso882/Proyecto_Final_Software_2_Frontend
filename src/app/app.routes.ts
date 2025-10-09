import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailsComponent } from './pages/details/details.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { HostGuard } from './guards/host.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'CloudHouse - Inicio' },
  { path: 'login', component: LoginComponent, title: 'Iniciar Sesión' },
  { path: 'register', component: RegisterComponent, title: 'Registrarse' },
  { path: 'search', component: SearchComponent, title: 'Buscar Alojamientos' },
  { path: 'details/:id', component: DetailsComponent, title: 'Detalles del Alojamiento' },
  
  // Rutas protegidas - requieren autenticación (basadas en archivos HTML originales)
  { 
    path: 'profile', 
    component: ProfileEditComponent, 
    canActivate: [AuthGuard], 
    title: 'Mi Perfil' 
  },
  { 
    path: 'profile_edit', 
    component: ProfileEditComponent, 
    canActivate: [AuthGuard], 
    title: 'Mi Perfil' 
  },
  { 
    path: 'booking', 
    component: HomeComponent, // Temporalmente, luego será BookingComponent
    canActivate: [AuthGuard], 
    title: 'Mis Reservas' 
  },
  { 
    path: 'booking.html', 
    component: HomeComponent, // Temporalmente, luego será BookingComponent
    canActivate: [AuthGuard], 
    title: 'Mis Reservas' 
  },
  { 
    path: 'favorites', 
    component: HomeComponent, // Temporalmente, luego será FavoritesComponent
    canActivate: [AuthGuard], 
    title: 'Favoritos' 
  },
  
  // Rutas exclusivas para anfitriones (basadas en archivos HTML originales)
  { 
    path: 'host-dashboard', 
    component: HomeComponent, // Temporalmente, luego será HostDashboardComponent
    canActivate: [AuthGuard, HostGuard], 
    title: 'Panel de Anfitrión' 
  },
  { 
    path: 'dashboard.html', 
    component: HomeComponent, // Temporalmente, luego será HostDashboardComponent
    canActivate: [AuthGuard, HostGuard], 
    title: 'Panel de Anfitrión' 
  },
  { 
    path: 'host-accommodations', 
    component: HomeComponent, // Temporalmente, luego será HostAccommodationsComponent
    canActivate: [AuthGuard, HostGuard], 
    title: 'Mis Alojamientos' 
  },
  { 
    path: 'host_accommodations.html', 
    component: HomeComponent, // Temporalmente, luego será HostAccommodationsComponent
    canActivate: [AuthGuard, HostGuard], 
    title: 'Mis Alojamientos' 
  },
  { 
    path: 'host-form', 
    component: HomeComponent, // Temporalmente, luego será HostFormComponent
    canActivate: [AuthGuard, HostGuard], 
    title: 'Publicar Alojamiento' 
  },
  { 
    path: 'host_form.html', 
    component: HomeComponent, // Temporalmente, luego será HostFormComponent
    canActivate: [AuthGuard, HostGuard], 
    title: 'Publicar Alojamiento' 
  },
  
  { path: '**', redirectTo: '' } // Página no encontrada redirige al inicio
];
