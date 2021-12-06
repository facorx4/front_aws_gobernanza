import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombresubdom'
})

export class NombresubdomPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listSubDomin of value){
   if(listSubDomin.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listSubDomin)
   };


 };
return resultado;


  }

}