import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomrtabla'
})
export class NomrtablaPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listartabla of value){
   if(listartabla.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listartabla)


   };


 };
return resultado;


  }

}
