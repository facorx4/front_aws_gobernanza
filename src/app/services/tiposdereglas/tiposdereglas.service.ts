import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipodereglaModel as ServiceModel } from 'src/app/models/tiposdereglas.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiposdereglasService {
  
  url = environment.url+'tipoderegla/';

  constructor(private http:HttpClient) { }

 
  getAll(){
      return this.http.get(`${this.url}all`);
  }

  create(newObj: ServiceModel){
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
