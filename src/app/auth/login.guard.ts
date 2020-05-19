import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
    private storageService: StorageService) { }

  canActivate() {

    if (this.storageService.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
