import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-mensagem-erro',
  imports: [NgIf],
  templateUrl: './mensagem-erro.component.html',
})
export class MensagemErroComponent {
  @Input() mensagem?: string;
}
