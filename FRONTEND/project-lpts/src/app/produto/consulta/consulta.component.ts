import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

interface ProdutoListado extends Produto {
  imagemUrl?: string;
}

@Component({
  selector: 'app-consulta',
  imports: [CurrencyPipe, DatePipe, FormsModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  produtos: ProdutoListado[] = [];
  filtro = '';

  constructor(private readonly service: ProdutoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(produtos => {
      this.produtos = produtos.map(produto => ({
        ...produto,
        imagemUrl: this.service.urlImagem(produto.imagePath),
      }));
    });
  }

  get produtosFiltrados(): ProdutoListado[] {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) {
      return this.produtos;
    }
    return this.produtos.filter(produto => produto.name?.toLowerCase().includes(termo));
  }
}
