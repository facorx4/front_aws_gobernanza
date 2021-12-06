import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ReglascalidadModel as ServiceModel } from 'src/app/models/reglascalidad.model';

@Injectable({
  providedIn: 'root'
})
export class ReglascalidadService {
  
   
  url = environment.url + 'reglacalidad/';

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

edit(id: string,  newObj : ServiceModel) {
  return this.http.put<ServiceModel>(`${this.url}editar/${id}`, newObj)
}

eliminar(id: string) {
  return this.http.delete(`${this.url}eliminar/${id}`)
}


getBusqueda(id: string){
  return this.http.get<any>(`${this.url}busqueda/${id}`)
    .pipe(map(res => {
      return res.data
    }));
}

}

