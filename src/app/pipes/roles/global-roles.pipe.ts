import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalRoles'
})
export class GlobalRolesPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultadoPost =[];
 for(const listaRolesUser of value){
   if(listaRolesUser.dateAddRol.indexOf(arg) > -1){
resultadoPost.push(listaRolesUser)

   }
 else   if(listaRolesUser.nomRol.toLowerCase().   
 indexOf(arg.toLowerCase()) > -1){
  resultadoPost.push(listaRolesUser)


 }
};
return resultadoPost;

  }

}
