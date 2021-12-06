import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalcon'
})
export class GeneralconPipe implements PipeTransform {

 
  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaConsumidores of value){
   if(listaConsumidores.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaConsumidores)


   };


 };
return resultado;


  }

}