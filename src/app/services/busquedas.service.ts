import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private URL = environment.url;

  constructor(private http: HttpClient) { }

  buscarGlobal (termino: string ){

    const url = `${this.URL}todo/${ termino }`;
    return this.http.get(url);

  }

  buscar(tipo: 'usuarios' | 'roles' | 'modulos', termino: string) {
   
   const url = `${this.URL}coleccion/${tipo}/${ termino }`;
    return this.http.get<any[]>(url)
    .pipe(
      map ( (resp: any) => resp.resultados)
    );
  }

}
