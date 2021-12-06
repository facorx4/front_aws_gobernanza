import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abiertoticket'
})
export class AbiertoticketPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaticket of value){
   if(listaticket.estado.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaticket)


   };


 };
return resultado;


  }

}
