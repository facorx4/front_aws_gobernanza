import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreRepo'
})
export class NombreRepoPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaRepos of value){
   if(listaRepos.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaRepos)


   };


 };
return resultado;


  }

}
