import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../app.constants';

// @Injectable hace que este servicio esté disponible
// para ser inyectado en cualquier componente o página
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Registrar un nuevo usuario
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/users/register`, { name, email, password })
      .pipe(
        // tap ejecuta una acción sin modificar la respuesta.
        // Guardamos el token en localStorage para usarlo después.
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
  }

  // Iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/users/login`, { email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
  }

  // Cerrar sesión: eliminamos el token y los datos del usuario
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Obtener el token guardado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener los datos del usuario logueado
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Verificar si el usuario es administrador
  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
}