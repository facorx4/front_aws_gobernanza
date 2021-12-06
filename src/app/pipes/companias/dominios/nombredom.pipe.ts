import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombredom'
})

export class NombredomPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listDomin of value){
   if(listDomin.nombreDom.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listDomin)


   };


 };
return resultado;


  }

}