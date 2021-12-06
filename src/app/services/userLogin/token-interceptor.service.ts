import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(  public authService:LoginService,
                private router: Router ) { 

  }
  /*
    intercept inspecciona y modifica las peticiones al servidor agregando el token
  */
  intercept(req, next) {
    if(req.url!=`https://api.cloudinary.com/v1_1/dp5d2zqu3/upload`){
    let tokenizeReq = req.clone({
      setHeaders: {
        //token: `Bearer ${this.authService.getToken()}`
        Authorization: ` ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          console.log('el token expiro')
          this.authService.logout()
          this.router.navigateByUrl('/login');
          Swal.fire({
						title:'Sesión Expirada',
						text:'Se actualizo correctamente un el usuario!',
						icon: 'warning'
          });
          
        }

        return throwError( err );

      })
    );
    }else{
      let tokenizeReq = req.clone({
        setHeaders: {
          //token: `Bearer ${this.authService.getToken()}`
          //Authorization: ` ${this.authService.getToken()}`
        }
      });
      return next.handle(tokenizeReq).pipe(
        catchError((err: HttpErrorResponse) => {
  
          if (err.status === 401) {
            console.log('el token expiro')
            this.authService.logout()
            this.router.navigateByUrl('/login');
            Swal.fire({
              title:'Sesión Expirada',
              text:'Se actualizo correctamente un el usuario!',
              icon: 'warning'
            });
            
          }
  
          return throwError( err );
  
        })
      );
    }
  }

  //https://medium.com/@insomniocode/angular-autenticaci%C3%B3n-usando-interceptors-a26c167270f4
  //https://www.digitalocean.com/community/tutorials/how-to-use-angular-interceptors-to-manage-http-requests-and-error-handling
  //https://www.oscarblancarteblog.com/2018/01/16/implementar-json-web-tokens-nodejs/

}
