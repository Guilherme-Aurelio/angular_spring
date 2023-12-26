import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from './modelo/Venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = 'http://localhost:8080/vendas';

  constructor(private http: HttpClient) { }

  cadastrarVenda(venda: Venda): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.baseUrl, venda, { headers });
  }
}
