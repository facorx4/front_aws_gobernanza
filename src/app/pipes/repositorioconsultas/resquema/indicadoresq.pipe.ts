import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicadoresq'
})
export class IndicadoresqPipe implements PipeTransform {

  
  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaresquema of value){
   if(listaresquema.identificador.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaresquema)


   };


 };
return resultado;


  }

}
