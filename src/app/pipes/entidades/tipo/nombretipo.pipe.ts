import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombretipo'
})
export class NombretipoPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaTipo of value){
   if(listaTipo.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaTipo)


   };


 };
return resultado;


  }

}
