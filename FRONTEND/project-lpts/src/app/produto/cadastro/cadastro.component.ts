import { Component, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { MensagemErroComponent } from '../../shared/mensagem-erro/mensagem-erro.component';
import { NotificacaoService } from '../../shared/notificacao.service';

@Component({
  selector: 'app-cadastro',
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MensagemErroComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnDestroy {

  produto: Produto = Produto.newProduto();
  imagemSelecionada?: File;
  previewUrl?: string;
  mensagemErro?: string;

  constructor(
    private service: ProdutoService,
    private notificacao: NotificacaoService,
  ) { }

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
    this.mensagemErro = undefined;
    this.service.salvar(this.produto, this.imagemSelecionada).subscribe({
      next: () => {
        this.produto = Produto.newProduto();
        this.definirImagem(undefined);
        this.notificacao.sucesso('Produto cadastrado com sucesso!');
      },
      error: (erro) => {
        this.mensagemErro = erro.error?.message ?? 'Erro ao salvar produto.';
      },
    });
  }

  ngOnDestroy(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
  }
}
