import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generale'
})
export class GeneralePipe implements PipeTransform {

  transform(value: any,arg: any): any {
    if(arg === '' ) return value;
 const resultado =[];
 for(const listaReportes of value){
   if(listaReportes.nombre.toLowerCase().   
    indexOf(arg.toLowerCase()) > -1){
    resultado.push(listaReportes)


   }
  

   else if (listaReportes.propietario.toLowerCase().   
   indexOf(arg.toLowerCase()) > -1){ 

    resultado.push(listaReportes)

   }
   else if (listaReportes.identificador.toLowerCase().   
   indexOf(arg.toLowerCase()) > -1){ 

    resultado.push(listaReportes)

   }

 };
return resultado;


  }

}