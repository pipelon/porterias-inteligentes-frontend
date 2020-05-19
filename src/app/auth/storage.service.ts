import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession: User = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(user: User): void {
    this.currentSession = user;
    this.localStorageService.setItem('currentUser', JSON.stringify(user));
  }

  loadSessionData(): User {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <User>JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): User {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    var user = this.getCurrentSession();
    return (user) ? true : false;
  };

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
