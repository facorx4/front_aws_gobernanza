import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { CompaniaModel } from 'src/app/models/compania.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  url = environment.url+ 'compania/';

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.url}all`);
  }

  create(compania) {
    return this.http.post(`${this.url}crear`, compania);
  }
  
  getOne(id: string){
    return this.http.get<any>(`${this.url}detalle/${id}`)
  .pipe(map(res => {
    return res.data
}));
}


  edit(id: String, compania: CompaniaModel){
    return this.http.put<CompaniaModel>(`${this.url}editar/${id}`, compania);
  }
  
  eliminar(id: String){
    return this.http.delete(`${this.url}eliminar/${id}`);
  }


}


