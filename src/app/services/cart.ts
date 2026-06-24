import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  // Genera los headers con el token del usuario logueado.
  // Todas las rutas del carrito requieren estar logueado.
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  // Obtener el carrito del usuario logueado
  getCart(): Observable<any> {
    return this.http.get(`${API_URL}/cart`, {
      headers: this.getHeaders()
    });
  }

  // Agregar un producto al carrito
  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${API_URL}/cart`, { productId, quantity }, {
      headers: this.getHeaders()
    });
  }

  // Actualizar la cantidad de un producto en el carrito
  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${API_URL}/cart/${productId}`, { quantity }, {
      headers: this.getHeaders()
    });
  }

  // Eliminar un producto del carrito
  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${API_URL}/cart/${productId}`, {
      headers: this.getHeaders()
    });
  }

  // Vaciar el carrito completo
  clearCart(): Observable<any> {
    return this.http.delete(`${API_URL}/cart`, {
      headers: this.getHeaders()
    });
  }
}