import { Routes } from '@angular/router';
import { CadastroComponent } from './produto/cadastro/cadastro.component';
import { ConsultaComponent } from './produto/consulta/consulta.component';
import { DeletarComponent } from './produto/deletar/deletar.component';
import { AtualizarComponent } from './produto/atualizar/atualizar.component';

export const routes: Routes = [
  { path: 'produtos/cadastro', component: CadastroComponent },
  { path: 'produtos/atualizar', component: AtualizarComponent },
  { path: 'produtos/consultar', component: ConsultaComponent },
  { path: 'produtos/deletar', component: DeletarComponent },
];
