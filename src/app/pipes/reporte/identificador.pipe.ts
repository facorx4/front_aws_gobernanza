import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'identificadorR'
})
export class IdentificadorRPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaReportes of value){
   if(listaReportes.identificador
    .toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaReportes)


   };


 };
return resultado;


  }

}