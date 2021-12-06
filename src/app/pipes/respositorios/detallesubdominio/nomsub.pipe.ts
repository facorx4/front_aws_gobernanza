import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomsub'
})
export class NomsubPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listasub of value){
   if(listasub.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listasub)


   };


 };
return resultado;


  }

}
