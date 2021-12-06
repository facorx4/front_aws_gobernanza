//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { SubdominioIdService } from 'src/app/services/repositorios/subdominioId.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';



@Component({
	selector: 'app-subdominios',
	templateUrl: './subdominios.component.html',
	styleUrls: ['./subdominios.component.css']
})
export class SubdominiosComponent implements OnInit {


	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	usuario = this.decoded['usuario'];

	//objetos permisos//
	permisoEditar = this.usuario.permisos[1];
	permisoEliminar = this.usuario.permisos[3];
	permisoConsultar = this.usuario.permisos[2];
	permisoCrear = this.usuario.permisos[0];
	//objetos estilos//
	estiloBotonNuevo: string = "";
	botonAccion: string = "";
	colorPaginador: string = "";
	//objetos locales//
	listaComponente = [];
	cargando: boolean = false;
	filternomsub = '';
	filtergensub = '';
	pageActual: number = 1;


	constructor(private subdominioIdService: SubdominioIdService,
		private router: Router,
		private estilosService: EstilosService
	) { }

	ngOnInit(): void {
		this.listSubdominios();
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
	listSubdominios() {
		this.cargando = true;
		this.subdominioIdService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaComponente = resp['data'];
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
			confirmButtonText: 'SI, eliminar!'
		}).then((result) => {
			if (result.isConfirmed) {
				this.listaComponente.splice(i, 1);//renderizamos el componente de la lista de usuarios
				this.subdominioIdService.eliminar(id).subscribe()
				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente!',
					icon: 'success'
				});
			}
		})
	}

}
