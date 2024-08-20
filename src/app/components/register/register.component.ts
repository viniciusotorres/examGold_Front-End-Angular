import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
name: string = '';
nameTouched: boolean = false;
email: string = '';
emailTouched: boolean = false;
password: string= '';
passwordTouched: boolean = false;
passwordConfirm: string= '';
passwordConfirmTouched: boolean = false;
birthDate: string = '';
birthDateTouched: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private noticationService: NotificationService
  ) { }

  ngOnInit() {}

  //--> Método para registrar o usuário
  registrar(){
    const dados = {
      name: this.name,
      email: this.email,
      password: this.password,
      birthDate: this.birthDate
    }

    this.authService.register(dados).subscribe(
      (data: any) => {
        console.log(data);
        this.noticationService.showNotification('Cadastro efetuado com sucesso');
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.noticationService.showNotification('Erro ao cadastrar');
        console.log(error);
      }
    )
    console.log(dados);
  }

  navigateToLogin(){
    this.router.navigate(['/']);
  }


  comparePasswords(){
    return this.password === this.passwordConfirm && this.password.length > 0;
  }

  validatePassword(){
    return this.password.length > 0
  }

  validateEmail(){
    return this.email.includes('@') && this.email.includes('.');
  }

  validateName(){
    return this.name.length > 0;
  }

  validateBirthDate(){
    return this.birthDate.length > 0;
  }

}
