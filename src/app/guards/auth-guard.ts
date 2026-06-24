import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// Guard que protege rutas privadas.
// Si el usuario no está logueado, lo redirige al login.
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // No está logueado, redirigimos al login
  router.navigate(['/login']);
  return false;
};

// Guard que protege rutas de administrador.
// Si el usuario no es admin, lo redirige al inicio.
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  // No es admin, redirigimos al inicio
  router.navigate(['/']);
  return false;
};