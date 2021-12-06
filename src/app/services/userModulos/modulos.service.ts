import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ModuloModel as ServiceModel } from 'src/app/models/modulo.model';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  url = environment.url+'modulo/';

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.url}all`);
  }

  save(newObj: ServiceModel){
		return this.http.post<ServiceModel>(`${this.url}crear`, newObj);
  }
  
  getOne(id: string){
    return this.http.get<any>(`${this.url}detalle/${id}`)
   		.pipe(map(res => {
				return res.data
			}));
  }

  edit(id: String, newObj: ServiceModel){
    return this.http.put<ServiceModel>(`${this.url}editar/${id}`, newObj);
  }
 
  eliminar(id: String){
    return this.http.delete<any>(`${this.url}eliminar/${id}`);
  }

  getMenu(id: String){
    return this.http.get(`${this.url}menu/${id}`);
  }

  uploadFile(archivo) {

		return this.http.post<any>(`${this.url}import-data`, archivo);
		
	  }
	
	  createImport(newObj) {
		return this.http.post<any>(`${this.url}creardata`, newObj);
	}

}
