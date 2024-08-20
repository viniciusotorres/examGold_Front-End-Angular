import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserInterface} from "../../interfaces/user.interface";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {SharedsService} from "../../services/shareds.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatSnackBarModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  emailTouched: boolean = false;
  password: string= '';
  passwordTouched: boolean = false;
  idUser: number = 0;

  constructor(
    private authService: AuthService,
    private noticationService: NotificationService,
    private router: Router,
    private sharedsService: SharedsService) { }

  ngOnInit() {}

  //--> Método para logar o usuário
 logar(){
    const user: UserInterface = {
      email: this.email,
      password: this.password
   }

    this.authService.login(user).subscribe(
      (data: any) => {
        console.log(data);
        this.idUser = data.id;
        this.sharedsService.setUserId(this.idUser);
        localStorage.setItem('token', data.token);
        this.noticationService.showNotification('Login efetuado com sucesso');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.noticationService.showNotification('Erro ao entrar');
        console.log(error);
      }
    )
 }

 navigateToRegister(){
    this.router.navigate(['/register']);
 }

validateEmail(){
  return this.email === '';
}

validatePassword() {
  return this.password === '';
}

}
