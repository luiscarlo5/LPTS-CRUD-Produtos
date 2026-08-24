import { Component, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-cadastro',
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnDestroy {

  produto: Produto = Produto.newProduto();
  imagemSelecionada?: File;
  previewUrl?: string;

  constructor(private service: ProdutoService) { }

  onImagemSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.definirImagem(input.files?.[0]);
  }

  removerImagem(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.definirImagem(undefined);
  }

  private definirImagem(arquivo?: File): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.imagemSelecionada = arquivo;
    this.previewUrl = arquivo ? URL.createObjectURL(arquivo) : undefined;
  }

  salvar(): void {
    this.service.salvar(this.produto, this.imagemSelecionada).subscribe(() => {
      this.produto = Produto.newProduto();
      this.definirImagem(undefined);
    });
  }

  ngOnDestroy(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
  }
}
