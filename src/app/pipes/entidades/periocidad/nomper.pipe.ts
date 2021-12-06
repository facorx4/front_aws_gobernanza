import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomper'
})
export class NomperPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaPeriocidad of value){
   if(listaPeriocidad.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaPeriocidad)


   };


 };
return resultado;


  }

}