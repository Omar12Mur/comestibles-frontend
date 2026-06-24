import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  // Genera los headers con el token del usuario logueado
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  // Crear un pedido a partir del carrito actual
  createOrder(): Observable<any> {
    return this.http.post(`${API_URL}/orders`, {}, {
      headers: this.getHeaders()
    });
  }

  // Obtener los pedidos del usuario logueado
  getMyOrders(): Observable<any> {
    return this.http.get(`${API_URL}/orders`, {
      headers: this.getHeaders()
    });
  }

  // Obtener el detalle de un pedido específico
  getOrderById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/orders/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Obtener todos los pedidos (solo admin)
  getAllOrders(): Observable<any> {
    return this.http.get(`${API_URL}/orders/admin/all`, {
      headers: this.getHeaders()
    });
  }

  // Cambiar el estado de un pedido (solo admin)
  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${API_URL}/orders/${id}/status`, { status }, {
      headers: this.getHeaders()
    });
  }
}