import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { RolModel as ServiceModel } from 'src/app/models/rol.model';

@Injectable({
	providedIn: 'root'
})
export class RolesService {

	private URL = environment.url + 'rol/';

	constructor(private http: HttpClient) { }

	create(newObj) {
		return this.http.post<any>(`${this.URL}crear`, newObj);
	}

	getAll() {
		return this.http.get(`${this.URL}all`);
	}

	getOne(id: string) {
		return this.http.get<any>(`${this.URL}detalle/${id}`)
			.pipe(map(res => {
				return res.data
			}));
	}

	edit(id: string, newObj: ServiceModel) {
		return this.http.put<ServiceModel>(`${this.URL}editar/${id}`, newObj)
	}

	eliminar(id: string) {
		return this.http.delete<any>(`${this.URL}eliminar/${id}`)
	}

	uploadFile(archivo) {

		return this.http.post<any>(`${this.URL}import-data`, archivo);
		
	  }
	
	  createImport(newObj) {
		return this.http.post<any>(`${this.URL}creardata`, newObj);
	}


}
