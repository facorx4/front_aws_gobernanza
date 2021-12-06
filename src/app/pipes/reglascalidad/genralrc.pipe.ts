import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genralrc'
})
export class GenralrcPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaPrin of value){
   if(listaPrin.identificador.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaPrin)


   };


 };
return resultado;


  }

}
