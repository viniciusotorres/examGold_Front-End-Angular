import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedsService {

  constructor() { }
  private userId: number = 0;

  getUserId(): number {
    return this.userId;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }
}
