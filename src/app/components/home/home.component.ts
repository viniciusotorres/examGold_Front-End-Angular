import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {SharedsService} from "../../services/shareds-service/shareds.service";
import {UsersService} from "../../services/users-service/users.service";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userId: number = 0;

  constructor(
    private router: Router,
    private sharedServices: SharedsService,
    private userService: UsersService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.onLogin().subscribe(data => {
      // Pass data to the SideBarComponent
      this.authService.notifyLogin(data);
    });
  }




  //--> Método para deslogar o usuário
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }



}
