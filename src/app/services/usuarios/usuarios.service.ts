import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { LoginService as ServiceModel } from '../userLogin/login.service';
import { UsuarioModel} from 'src/app/models/usuario.model';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {

	private URL = environment.url+'usuario/';

	constructor(private http: HttpClient
	) { }

	/**********************************************************************************************
	Creamos el servicio para obtener los usuarios
	**********************************************************************************************/
	getAll() {
		return this.http.get<any>(`${this.URL}all`);
	}

	eliminar(id: String) {
		return this.http.delete<any>(`${this.URL}eliminar/${id}`);
	}
	create(newObj) {
		return this.http.post<any>(`${this.URL}crear`, newObj);
	}

	/**********************************************************************************************
	Creamos el servicio para obtener los datos de un solo roles
	**********************************************************************************************/
	getOne(id: string) {

		return this.http.get<any>(`${this.URL}detalle/${id}`)
			.pipe(map(res => {
				//return res['usuario']
				return res.data
			}));

	}

	/**********************************************************************************************
	Actulizamos un usuario
	**********************************************************************************************/
	edit(id: string, usuario: UsuarioModel) {
		return this.http.put<UsuarioModel>(`${this.URL}editar/${id}`, usuario)
	}

	/**********************************************************************************************
	Actulizamos el perfil del usuario
	**********************************************************************************************/
	perfilUsuario(usuario: UsuarioModel) {
		return this.http.put(`${this.URL}perfil`, usuario)
												.pipe(map( resp => {
													localStorage.setItem('token', resp['Authorization'] );
													return resp['data']
												}))
	}
	/**********************************************************************************************
	Actulizamos la contraseña de un usuario
	**********************************************************************************************/
	passwordUser(usuario){
		return this.http.put(`${this.URL}password`, usuario)
	}

	uploadImage(data){
		return this.http.post<any>(`https://api.cloudinary.com/v1_1/dp5d2zqu3/upload`, data).pipe(map( resp => {
			return resp
		}))
	}

	uploadFile(archivo) {

		return this.http.post<any>(`${this.URL}import-data`, archivo);
		
	  }
	
	  createImport(newObj) {
		return this.http.post<any>(`${this.URL}creardata`, newObj);
	}

}
