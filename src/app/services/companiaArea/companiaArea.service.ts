import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { CompaniaAreaModel } from 'src/app/models/companiaArea.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniaAreaService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  getAreasCompania(id: String){
    return this.http.get<any>(`${this.url}areas/${id}`)
                  .pipe(map(resp =>{
	                    return {
	                      compania:resp.compania.nombreCompania,
	                      areas:resp.areas
	                    }
                  }))
 }

  getAll(){
    return this.http.get(`${this.url}companias`);
  }

  getAllA(){
    return this.http.get<any>(`${this.url}all`);
  }
  create(id: String, ind: String, compania) {
    return this.http.post(`${this.url}areas/${ind}/${id}`, compania);
  }
  
  getDetalle(){
    return this.http.get(`${this.url}detalle`);
  }
 
  getDetalleAreas(id: string){
    return this.http.get<any>(`${this.url}detalle/${id}`)
  .pipe(map(res => {
    return res.compania
}));
}

  edit(id: String, ind: String, compania: CompaniaAreaModel){
    return this.http.put<CompaniaAreaModel>(`${this.url}areas/${ind}/${id}`, compania);
  }
  
  eliminar(id: String){
    return this.http.delete(`${this.url}areas/${id}`);
  }

  getDetalleArea(id: string) {
		return this.http.get<any>(`${this.url}detalle/${id}`)
			.pipe(map(res => {
				return res.compania
			}));
	}

}
