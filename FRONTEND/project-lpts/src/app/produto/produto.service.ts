import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly apiUrl = 'http://localhost:3001/products';

  constructor(private http: HttpClient) { }

  salvar(produto: Produto, imagem?: File): Observable<Produto> {
    const formData = new FormData();
    formData.append('name', produto.name ?? '');
    formData.append('description', produto.description ?? '');
    formData.append('price', String(produto.price ?? ''));
    if (imagem) {
      formData.append('image', imagem);
    }
    return this.http.post<Produto>(this.apiUrl, formData);
  }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: string, produto: Partial<Produto>): Observable<Produto> {
    return this.http.patch<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
