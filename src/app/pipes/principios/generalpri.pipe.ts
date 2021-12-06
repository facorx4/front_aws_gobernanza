import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalpri'
})
export class GeneralpriPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaPrin of value){
   if(listaPrin.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaPrin)


   }
   else  if(listaPrin.descripcion.toLowerCase().   
   indexOf(arg.toLowerCase()) > -1){
   resultado.push(listaPrin)

   }

 };
return resultado;


  }

}
