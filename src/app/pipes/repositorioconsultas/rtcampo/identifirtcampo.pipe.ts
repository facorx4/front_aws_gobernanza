import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'identifirtcampo'
})
export class IdentifirtcampoPipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listarcampo of value){
   if(listarcampo.identificador.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listarcampo)


   };


 };
return resultado;


  }

}
