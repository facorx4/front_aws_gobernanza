import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultadoPost =[];
 for(const listaRolesUser of value){
   if(listaRolesUser.dateAddRol.indexOf(arg) > -1){
resultadoPost.push(listaRolesUser)

   };


 };
return resultadoPost;

  }

}

