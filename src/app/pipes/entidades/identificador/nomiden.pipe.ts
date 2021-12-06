import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomiden'
})
export class NomidenPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaIden of value){
   if(listaIden.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaIden)


   };


 };
return resultado;


  }

}