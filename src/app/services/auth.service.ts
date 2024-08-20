import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../enviroments/environments";
import {UserInterface} from "../interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private api = environment.apiJava;

  constructor(
    private http: HttpClient
  ) { }

  //--> REQUISIÇÃO DE LOGIN
  login(user: UserInterface){
    return this.http.post(`${this.api}/auth/login`, user);
  }

  //--> REQUISIÇÃO DE CADASTRO
  register(user: UserInterface){
    return this.http.post(`${this.api}/auth/register`, user);
  }

}
