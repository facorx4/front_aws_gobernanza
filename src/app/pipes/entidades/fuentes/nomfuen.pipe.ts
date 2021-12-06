import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomfuen'
})
export class NomfuenPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listafuen of value){
   if(listafuen.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listafuen)


   };


 };
return resultado;


  }

}