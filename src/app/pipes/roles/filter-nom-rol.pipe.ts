import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNomRol'
})
export class FilterNomRolPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaRolesUser of value){
   if(listaRolesUser.nomRol.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaRolesUser)


   };


 };
return resultado;


  }


}
