import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generepos'
})
export class GenereposPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaRepos of value){
   if(listaRepos.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaRepos)


  }
  if( listaRepos.ruta.toLowerCase().   
   indexOf(arg.toLowerCase()) > -1){
   resultado.push(listaRepos)


  };


};
return resultado;


 }

}
