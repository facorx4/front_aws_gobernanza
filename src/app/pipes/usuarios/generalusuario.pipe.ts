import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalusuario'
})
export class GeneralusuarioPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaUsuarios of value){
   if(listaUsuarios.userLastDate.indexOf(arg) > -1){
    resultado.push(listaUsuarios)

   }
 else   if(listaUsuarios.userNombres.toLowerCase().   
 indexOf(arg.toLowerCase()) > -1){
  resultado.push(listaUsuarios)


 }

 else   if(listaUsuarios.userApellidos.toLowerCase().   
 indexOf(arg.toLowerCase()) > -1){
  resultado.push(listaUsuarios)
 }

 else   if(listaUsuarios.userEmail.toLowerCase().   
 indexOf(arg.toLowerCase()) > -1){
  resultado.push(listaUsuarios)
 }

};
return resultado;

  }

}
