import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  // Obtener todos los productos del catálogo
  getProducts(): Observable<any> {
    return this.http.get(`${API_URL}/products`);
  }

  // Obtener un producto por su ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/products/${id}`);
  }

  // Crear un producto (solo admin)
  createProduct(product: any): Observable<any> {
    return this.http.post(`${API_URL}/products`, product, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  // Actualizar un producto (solo admin)
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${API_URL}/products/${id}`, product, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  // Eliminar un producto (solo admin)
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
