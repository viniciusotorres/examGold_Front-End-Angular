import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = environment.apiJava;

  constructor(
    private http: HttpClient
  ) { }

  //--> REQUISIÇÃO DE BUSCAR TODOS
  getUsers(){
    return this.http.get(`${this.api}/users`);
  }

  //--> REQUISIÇÃO DE BUSCAR POR ID
  getUserById(id: number){
    return this.http.get(`${this.api}/user/${id}`);
  }

}
