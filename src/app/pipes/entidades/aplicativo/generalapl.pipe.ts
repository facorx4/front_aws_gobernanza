import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalapl'
})
export class GeneralaplPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaAplicativo of value){
   if(listaAplicativo.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaAplicativo)


   };


 };
return resultado;


  }

}