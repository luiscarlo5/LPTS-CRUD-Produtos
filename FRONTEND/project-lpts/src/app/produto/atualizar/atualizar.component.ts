import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-atualizar',
  imports: [FormsModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './atualizar.component.html',
  styleUrl: './atualizar.component.scss'
})
export class AtualizarComponent implements OnInit {

  produtos: Produto[] = [];
  selecionado?: Produto;
  edicao: Produto = {};
  imagemSelecionada?: File;
  previewUrl?: string;

  constructor(private readonly service: ProdutoService) { }

  ngOnInit(): void {
    this.carregar();
  }

  private carregar(): void {
    this.service.listar().subscribe(produtos => this.produtos = produtos);
  }

  onSelecaoAlterada(event: MatSelectionListChange): void {
    this.selecionar(event.options[0]?.value);
  }

  onImagemSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    this.imagemSelecionada = arquivo;
    if (arquivo) {
      this.previewUrl = URL.createObjectURL(arquivo);
    }
  }

  salvar(): void {
    if (!this.selecionado?.id) {
      return;
    }
    this.service.atualizar(this.selecionado.id, this.edicao, this.imagemSelecionada).subscribe(() => {
      this.selecionar(undefined);
      this.carregar();
    });
  }

  cancelar(): void {
    this.selecionar(undefined);
  }

  private selecionar(produto?: Produto): void {
    this.selecionado = produto;
    this.edicao = produto ? { ...produto } : {};
    this.imagemSelecionada = undefined;
    this.previewUrl = produto?.imagePath ? this.service.urlImagem(produto.imagePath) : undefined;
  }
}
