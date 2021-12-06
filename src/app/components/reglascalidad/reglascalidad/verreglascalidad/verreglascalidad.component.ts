//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { ReglascalidadService } from 'src/app/services/reglascalidad/reglascalidad.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-verreglascalidad',
	templateUrl: './verreglascalidad.component.html',

})
export class VerreglascalidadComponent implements OnInit {

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
	listaRGUser = [];
	cargando: boolean = false;
	pageActual: number = 1;



	constructor(private rgService: ReglascalidadService, private router: Router,
		private estilosService: EstilosService
	) { }

	//pipes filter//
	filternomrc = '';
	filtergeneralrc = '';


	ngOnInit(): void {
		this.listaReglascalidad();
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



	listaReglascalidad() {
		this.cargando = true;
		this.rgService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaRGUser = resp['data'];
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
			text: `Esta seguro que desea eliminar la reglas de calidad `,
			icon: 'question',
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'SI, eliminar regla de calidad!'
		}).then((result) => {

			if (result.isConfirmed) {

				this.listaRGUser.splice(i, 1);
				this.rgService.eliminar(id).subscribe()
				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente la regla de calidad!',
					icon: 'success'
				});

			}


		})
	}
}