//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { RepositorioService } from 'src/app/services/repositorios/repositorios.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-repositorios',
	templateUrl: './repositorios.component.html',
	styleUrls: ['./repositorios.component.css']
})
export class RepositoriosComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	usuario = this.decoded['usuario'];

	//objetos permiso//
	permisoEditar = this.usuario.permisos[1];
	permisoEliminar = this.usuario.permisos[3];
	permisoConsultar = this.usuario.permisos[2];
	permisoCrear = this.usuario.permisos[0];
	//objetos estilos//
	estiloBotonNuevo: string = "";
	botonAccion: string = "";
	colorPaginador: string = "";
	//objetos locales//
	listaRepositorios = [];
	cargando: boolean = false;
	filternomrepos = '';
	filterrta = '';
	filtergeneralrepos = '';
	pageActual: Number = 1;

	constructor(private repositorioService: RepositorioService,
		private router: Router,
		private estilosService: EstilosService
	) { }

	ngOnInit(): void {
		this.listRepositorios();
		this.cargarEstilos();

	}

	cargarEstilos() {
		this.estilosService.getOne(this.usuario.estilo).subscribe(
			datos => {
				this.estiloBotonNuevo = datos.botonCrear
				this.botonAccion = datos.botonAcciones
				this.colorPaginador = datos.paginador
			})
	}
	/**********************************************************************************************
	Imprimimos la lista de roles 
	**********************************************************************************************/
	listRepositorios() {
		this.cargando = true;
		this.repositorioService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaRepositorios = resp['data'];
			},
			err => {

				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}

			})
	}

	eliminar(i, id) {
		Swal.fire({
			title: 'Estas seguro?',
			text: `Esta seguro que desea eliminar`,
			icon: 'question',
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'SI, eliminar repositorio!'
		}).then((result) => {
			if (result.isConfirmed) {
				this.listaRepositorios.splice(i, 1);//renderizamos el componente de la lista de usuarios
				this.repositorioService.eliminar(id).subscribe()
				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente!',
					icon: 'success'
				});
			}
		})
	}
}
