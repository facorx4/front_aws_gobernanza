import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { CompaniaDominioModel } from 'src/app/models/companiaDominio.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniaDominioService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  getDominiosCompania(id: String){
    return this.http.get<any>(`${this.url}dominios/${id}`)
                  .pipe(map(resp =>{
	                    return {
	                      compania:resp.compania.nombreCompania,
	                      dominios:resp.dominios
	                    }
                  }))
 }

  getAll(){
    return this.http.get<any>(`${this.url}dominios/all`);
  }

  create(id: String, ind: String, compania) {
    return this.http.post(`${this.url}dominios/${ind}/${id}`, compania);
  }
  
  getDetalle(){
    return this.http.get(`${this.url}detalledom`);
  }

  edit(id: String, ind: String, compania: CompaniaDominioModel){
    return this.http.put<CompaniaDominioModel>(`${this.url}dominios/${ind}/${id}`, compania);
  }
  
  eliminar(id: String){
    return this.http.delete(`${this.url}dominios/${id}`);
  }

  getDetalleDominio(id: string) {
		return this.http.get<any>(`${this.url}detalledom/${id}`)
			.pipe(map(res => {
				return res.compania
			}));
	}

 

}
