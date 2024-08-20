import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }


  //--> Método para mostrar uma notificação
  showNotification(message: string){
    this.snackBar.open(message,'Fechar', {
      duration: 2000,
      panelClass: ['mat-primary']
    });
  }
}
