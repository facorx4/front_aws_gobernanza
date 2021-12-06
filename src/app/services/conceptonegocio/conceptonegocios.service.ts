import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ConceptonegocioModel as ServiceModel } from 'src/app/models/conceptonegocio.model';

@Injectable({
  providedIn: 'root'
})
export class ConceptonegociosService {
  
  url = environment.url + 'conceptonegocio/';

  constructor(private http:HttpClient) { }

create(newObj: ServiceModel){
  return this.http.post<ServiceModel>(`${this.url}crear`, newObj);
}

getAll(){
  return this.http.get(`${this.url}all`);
}

getOne(id: string){
  return this.http.get<any>(`${this.url}detalle/${id}`)
    .pipe(map(res => {
      return res.data
    }));
}

edit(id: string,  newObj : ServiceModel) {
  return this.http.put<ServiceModel>(`${this.url}editar/${id}`, newObj)
}

eliminar(id: string) {
  return this.http.delete(`${this.url}eliminar/${id}`)
}

}

