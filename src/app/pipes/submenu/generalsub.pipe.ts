import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalsub'
})
export class GeneralsubPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaSubUser of value){
   if(listaSubUser.titulo.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaSubUser)


   }
   if(listaSubUser.ruta.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaSubUser)


   };


 };
return resultado;


  }

}

