import { Categoria } from './modelo/Categoria';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  criarCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(`${this.baseUrl}`, categoria);
  }

  atualizarCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(`${this.baseUrl}`, categoria);
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<any>('http://localhost:8080/categorias').pipe(
      map((response: any) => response.content)
    );
  }
  detalharCategoria(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  excluirCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
