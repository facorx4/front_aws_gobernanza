import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tituloModulo'
})
export class TituloModuloPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaModulos of value){
   if(listaModulos.titulo.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaModulos)


   };


 };
return resultado;


  }

}
