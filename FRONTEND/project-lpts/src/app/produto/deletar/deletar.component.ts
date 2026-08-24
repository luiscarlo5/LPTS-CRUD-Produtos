import { Component, OnInit } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { NotificacaoService } from '../../shared/notificacao.service';

@Component({
  selector: 'app-deletar',
  imports: [MatListModule, MatButtonModule],
  templateUrl: './deletar.component.html',
  styleUrl: './deletar.component.scss'
})
export class DeletarComponent implements OnInit {

  produtos: Produto[] = [];
  selecionado?: Produto;

  constructor(
    private readonly service: ProdutoService,
    private readonly notificacao: NotificacaoService,
  ) { }

  ngOnInit(): void {
    this.carregar();
  }

  private carregar(): void {
    this.service.listar().subscribe(produtos => this.produtos = produtos);
  }

  onSelecaoAlterada(event: MatSelectionListChange): void {
    this.selecionado = event.options[0]?.value;
  }

  confirmarExclusao(): void {
    if (!this.selecionado?.id) {
      return;
    }
    this.service.deletar(this.selecionado.id).subscribe(() => {
      this.selecionado = undefined;
      this.carregar();
      this.notificacao.sucesso('Produto excluído com sucesso!');
    });
  }

  cancelar(): void {
    this.selecionado = undefined;
  }
}
