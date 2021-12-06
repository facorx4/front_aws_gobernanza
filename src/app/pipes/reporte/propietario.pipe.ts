import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propietario'
})
export class PropietarioPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaReportes of value){
   if(listaReportes.propietario.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaReportes)


   };


 };
return resultado;


  }

}