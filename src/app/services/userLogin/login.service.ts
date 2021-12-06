import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

	
	private URL = environment.url+'usuario/';

	userToken:string; 

	constructor(private http: HttpClient, private router: Router) {

		this.leerToken();

	}

	
	/***********************************************************************************
	Metodo para iniciar sesion 
	***********************************************************************************/
	signInUser(user:UsuarioModel) {

		return this.http.post<UsuarioModel>(this.URL + 'login', user)
		.pipe( map( res =>{
			this.guardarToken(res['Authorization']);
			return res;
		}));

	}

	loggedIn() {
		return localStorage.getItem('token')? true : false; 
	}

	/***********************************************************************************
	Metodo para salir de la sesion o para eliminar el token
	***********************************************************************************/
	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}
	


	getToken() {
		return localStorage.getItem('token');
	}

	/***********************************************************************************
	Metodo para guardar el token en el localStorage
	***********************************************************************************/
	private guardarToken( idToken:string ){
		this.userToken = idToken;
		localStorage.setItem('token', idToken );
	}

	/***********************************************************************************
	Metodo para leer el token en el localStorage
	***********************************************************************************/
	leerToken(){

		if( localStorage.getItem('token') ){
			this.userToken = localStorage.getItem('token');
		}else{
			this.userToken = '';
		}
		return this.userToken;

	}
	
	
}
