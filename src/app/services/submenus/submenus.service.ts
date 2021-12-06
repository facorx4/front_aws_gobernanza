import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SubmenuModel as ServiceModel } from 'src/app/models/submenu.model';

@Injectable({
  providedIn: 'root'
})
export class SubmenusService {
  url = environment.url+'submenu/';

  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get(`${this.url}all`);
  }


  getOne(id: string){
    return this.http.get<any>(`${this.url}detalle/${id}`)
			.pipe(map(res => {
				return res.data
			}));
  }


  create(nuevoSubmenu: ServiceModel){
		return this.http.post<ServiceModel>(`${this.url}crear`, nuevoSubmenu);
  }
  
  edit(id: String, nuevoSubmenu: ServiceModel){
		return this.http.put<ServiceModel>(`${this.url}editar/${id}`, nuevoSubmenu);
  }

  eliminar(id: String){
		return this.http.delete<any>(`${this.url}eliminar/${id}`);
   
  }


  uploadFile(archivo) {

		return this.http.post<any>(`${this.url}import-data`, archivo);
		
	  }
	
	  createImport(newObj) {
		return this.http.post<any>(`${this.url}creardata`, newObj);
	}

}
