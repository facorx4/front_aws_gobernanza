import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrePipe'
})
export class nombrePipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaConceptosUser of value){
   if(listaConceptosUser.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaConceptosUser)


   };


 };
return resultado;


  }

}
