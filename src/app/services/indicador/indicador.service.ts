import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IndicadorModel as ServiceModel } from 'src/app/models/indicador.model';

@Injectable({
  providedIn: 'root'
})

export class IndicadorService {

    url = environment.url+'entidad/indicador/';

    constructor(private http:HttpClient) { }

    getAll(){
        return this.http.get(`${this.url}all`);
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
}
