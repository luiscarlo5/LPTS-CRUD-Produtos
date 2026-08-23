import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CadastroComponent } from './produto/cadastro/cadastro.component'
import { ConsultaComponent } from './produto/consulta/consulta.component'
@Component({
  selector: 'app-root',
  imports: [NgIf, RouterOutlet, RouterLink, MatButtonModule, CadastroComponent, ConsultaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project-lpts';

  constructor(private readonly router: Router) {}

  get isHome(): boolean {
    return this.router.url === '/';
  }
}
