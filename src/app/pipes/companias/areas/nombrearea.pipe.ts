import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrearea'
})

export class NombreareaPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listAreas of value){
   if(listAreas.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listAreas)


   };


 };
return resultado;


  }

}