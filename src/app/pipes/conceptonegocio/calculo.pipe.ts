import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculo'
})
export class CalculoPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaConceptonegocio of value){
   if(listaConceptonegocio.calculo.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaConceptonegocio)


   };


 };
return resultado;


  }

}
