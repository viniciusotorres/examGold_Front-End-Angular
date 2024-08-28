import { Component } from '@angular/core';
import {EscolaService} from "../../services/escola-service/escola.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NotificationService} from "../../services/notification-service/notification.service";

@Component({
  selector: 'app-escolas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './escolas.component.html',
  styleUrl: './escolas.component.css'
})
export class EscolasComponent {
escolas: any;
tela: string = 'escolas';
name = '';
email = '';
address = '';
cnpj = '';
phone = '';

  constructor(
    private escolaService: EscolaService,
    private noticationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.trazendoEscolas()
  }

  //--> REQUISIÇÃO DE BUSCAR TODOS
  trazendoEscolas(){
    this.escolaService.getEscolas().subscribe((res: any) => {
      this.escolas = res;
      console.log(res);
    });
  }

  navegarParaCadastro(){
    this.tela = 'cadastrar';
  }

  navegarParaEscolas(){
    this.tela = 'escolas';
  }

  salvarEscola() {
    const escola = {
      name: this.name,
      email: this.email,
      address: this.address,
      cnpj: this.cnpj,
      phone: this.phone
    };

    this.escolaService.salvarEscola(escola).subscribe(
      (res: any) => {
        this.noticationService.showNotification('Escola cadastrada com sucesso');
        this.trazendoEscolas();
      },
      (error: any) => {
        this.noticationService.showNotification('Erro ao cadastrar escola');
        console.error(error);
      }
    );
  }

}
