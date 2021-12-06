import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  /*************************************************************************
  creamos validacion para confirmar que ambas contraseñas son validas
  *************************************************************************/
  passwordIguales(pass1Name : string , pass2Name:string ){
    
    return ( formgroup : FormGroup ) => {
        const pass1Control = formgroup.controls[pass1Name];
        const pass2Control = formgroup.controls[pass2Name];

        if (pass1Control.value === pass2Control.value){
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors({noEsIgual : true });
        }
    }

  }

  
}
