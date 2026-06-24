import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { Orders } from './pages/orders/orders';
import { Admin } from './pages/admin/admin';
import { authGuard, adminGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Rutas públicas
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Rutas protegidas (requieren login)
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'orders', component: Orders, canActivate: [authGuard] },

  // Ruta de administrador
  { path: 'admin', component: Admin, canActivate: [authGuard, adminGuard] },

  // Cualquier ruta desconocida redirige al inicio
  { path: '**', redirectTo: '' }
];