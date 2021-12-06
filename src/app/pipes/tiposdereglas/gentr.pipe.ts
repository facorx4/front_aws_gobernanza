import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gentr'
})
export class GentrPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaTR of value){
   if(listaTR.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaTR)


   };


 };
return resultado;


  }

}
