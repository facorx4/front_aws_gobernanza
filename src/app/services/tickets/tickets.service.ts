import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TicketModel as ServiceModel } from 'src/app/models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  url = environment.url + 'ticket/';

  constructor(private http:HttpClient) { }

create(newObj){
  return this.http.post<any>(`${this.url}crear`, newObj);
}

getAll(){
  return this.http.get<any>(`${this.url}all`);
}

getOne(id: string){
  return this.http.get<any>(`${this.url}detalle/${id}`)
    .pipe(map(res => {
      return res.reporte
    }));
}

edit(id: String, newObj: ServiceModel){
  return this.http.put<ServiceModel>(`${this.url}editar/${id}`, newObj);
}

}





