import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PrioridadModel } from 'src/app/models/prioridad.model';

@Injectable({
  providedIn: 'root'
})

export class PrioridadService {

    url = environment.url+'entidad/prioridad/';

    constructor(private http:HttpClient) { }

    getAll(){
        return this.http.get(`${this.url}all`);
    }

    save(nuevoPrioridad){
	    return this.http.post<any>(`${this.url}crear`, nuevoPrioridad);
    }
  
    getOne(id: string){
        return this.http.get<any>(`${this.url}detalle/${id}`)
			.pipe(map(res => {
				return res.data
		}));
    }

    edit(id: String, prioridad: PrioridadModel){
        return this.http.put<PrioridadModel>(`${this.url}editar/${id}`, prioridad);
    }
 
    eliminar(id: String){
        return this.http.delete<any>(`${this.url}eliminar/${id}`);
    }
}
