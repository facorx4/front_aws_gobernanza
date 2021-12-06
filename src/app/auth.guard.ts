import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/userLogin/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: LoginService,
    private router: Router
  ) { }

    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

  /* isAdmin(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/acercade']);
    return false;
  } */

}
