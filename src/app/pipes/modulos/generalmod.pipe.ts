import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalmod'
})
export class GeneralmodPipe implements PipeTransform {
  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaModulos of value){
   if(listaModulos.titulo.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaModulos)


   };


 };
return resultado;


  }

}
