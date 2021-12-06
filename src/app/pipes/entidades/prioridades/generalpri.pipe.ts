import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalpri'
})
export class GeneralpriPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaPrioridad of value){
   if(listaPrioridad.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaPrioridad)


   };


 };
return resultado;


  }

}