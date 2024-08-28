import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {EscolasComponent} from "./components/escolas/escolas.component";
import {MinhaEscolaComponent} from "./components/minha-escola/minha-escola.component";
import {DefincoesComponent} from "./components/defincoes/defincoes.component";
import {MeuPerfilComponent} from "./components/meu-perfil/meu-perfil.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'escolas',
    component: EscolasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'minha-escola',
    component: MinhaEscolaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'definicoes',
    component: DefincoesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: MeuPerfilComponent,
    canActivate: [AuthGuard]
  }
];


