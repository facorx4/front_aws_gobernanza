import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RepositorioModel as ServiceModel } from 'src/app/models/repositorio.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  url = environment.url+'entidad/';

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

  create(newObj: ServiceModel){
    return this.http.post<ServiceModel>(`${this.url}crear`, newObj);
  }

  edit(id: String, newObj: ServiceModel){
    return this.http.put<ServiceModel>(`${this.url}editar/${id}`, newObj);
  }

  eliminar(id: string){
    return this.http.delete(`${this.url}eliminar/${id}`);
  }

  getBusqueda(id: string){
    return this.http.get<any>(`${this.url}busqueda/${id}`)
			.pipe(map(res => {
				return res.data
			}));
  }


}
