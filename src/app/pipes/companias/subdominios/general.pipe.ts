import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalsubdom'
})

export class GeneralsubdomPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' ) return value;
    const resultado =[];
    
    for(const listSubDomin of value){
      if(listSubDomin.nombre.toLowerCase().
        indexOf(arg.toLowerCase()) > -1){
        resultado.push(listSubDomin)
      }
      else if(listSubDomin.propietario.toLowerCase().
        indexOf(arg.toLowerCase()) > -1){
        resultado.push(listSubDomin)
      }
    };

    return resultado;
  }
}