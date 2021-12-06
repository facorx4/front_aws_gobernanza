import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreentidad'
})
export class NombreentidadPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaenti of value){
   if(listaenti.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaenti)


   };


 };
return resultado;


  }

}
