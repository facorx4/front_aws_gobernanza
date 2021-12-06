import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre'
})
export class NombrePipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaConceptonegocio of value){
   if(listaConceptonegocio.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaConceptonegocio)


   };


 };
return resultado;


  }

}
