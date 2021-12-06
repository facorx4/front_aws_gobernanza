import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genetiporepo'
})
export class GenetiporepoPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listatipoRepos of value){
   if(listatipoRepos.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listatipoRepos)


   };


 };
return resultado;


  }

}
