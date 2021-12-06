import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { CompaniaSubDominioModel } from 'src/app/models/companiaSubDominio.model';

@Injectable({
  providedIn: 'root'
})
export class SubDominioService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  getSubDominiosCompania(id: String, idDomin: String){
    return this.http.get<any>(`${this.url}subdominios/${id}/${idDomin}`)
                  .pipe(map(resp =>{
	                    return {
                        dominio: resp.dominio.nombreDom,
	                      subdominios:resp.subdominios
	                    }
                  }))
 }

  getSubDominiosxDominio(idDominio: string){
    return this.http.get(`${this.url}subdominios/${idDominio}`);  //SE PUSO QUEMADO PARA HACER EL EJEMPLO
  }

  create(ind: String, idCompania: String, idDomin: String, dominio) {
    return this.http.post(`${this.url}subdominios/${ind}/${idCompania}/${idDomin}`, dominio);
  }
  
  getDetalle(){
    return this.http.get(`${this.url}detalledom`);
  }

  edit(id: String, ind: String, compania: CompaniaSubDominioModel){
    return this.http.put<CompaniaSubDominioModel>(`${this.url}subdominios/${ind}/${id}`, compania);
  }
  
  eliminar(id: String){
    return this.http.delete(`${this.url}subdominios/${id}`);
  }

  getDetalleSubDominio(id: string) {
		return this.http.get<any>(`${this.url}subdominiodetalle/${id}`)
			.pipe(map(res => {
				return res.subdominio
			}));
	}

}
