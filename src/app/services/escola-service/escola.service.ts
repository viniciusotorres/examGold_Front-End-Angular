import { Injectable } from '@angular/core';
import {environment} from "../../../enviroments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private api = environment.apiJava + '/school'

  constructor(
    private http: HttpClient
  ) { }

  //--> REQUISIÇÃO DE BUSCAR TODOS
  getEscolas(){
    return this.http.get(`${this.api}/all`);
  }

  //--> REQUISIÇÃO DE SALVAR
  salvarEscola(escola: any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.api}/create`, escola , { headers });
  }
}
