import { Component, OnInit } from '@angular/core';
import { SubDominioService } from 'src/app/services/companiaSubDominio/companiaSubDominio.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-detalle-dominios',
	templateUrl: './detalle-dominios.component.html',
})

export class DetalleDominiosComponent implements OnInit {
	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//permisos//
	permisoEditar = this.datosUsuario.permisos[1];
	permisoEliminar = this.datosUsuario.permisos[3];
	permisoConsultar = this.datosUsuario.permisos[2];
	permisoCrear = this.datosUsuario.permisos[0];


	cargando: boolean = false;
	areaCompania: FormGroup;
	listAreas = [];
	listSubDomin = [];
	tituloDominio: String;
	idCompania: string;
	idDominio: string;
	moduloNombre: string;
	estiloDetalle: string;
	estiloBotonNuevo: string = "";
	botonAccion: string = "";
	colorPaginador: string = "";
	pageActual: number = 1;
	filterNombre = '';
	filterGeneral = '';

	constructor(private fb: FormBuilder,
		private CompaniaServ: CompaniaAreaService,
		private CompaniaDomiServ: SubDominioService,
		private estilosService: EstilosService,
		private routerParams: ActivatedRoute
	) {
		this.idCompania = this.routerParams.snapshot.paramMap.get('idCompania');
		this.idDominio = this.routerParams.snapshot.paramMap.get('id');
		this.createFormulario();
		this.listaSubDominiosCompania();
	}

	ngOnInit(): void {
		this.cargarEstilos()
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloDetalle = datos.tituloDetalle;
				this.estiloBotonNuevo = datos.botonCrear
				this.botonAccion = datos.botonAcciones
				this.colorPaginador = datos.paginador
			})
	}

	createFormulario() {
		this.areaCompania = this.fb.group({
			nombre: ['', Validators.required],
			nombreDom: ['', Validators.required],
			compania: [this.idCompania, Validators.required]
		})
	}

	listaSubDominiosCompania() {
		this.cargando = true;
		this.CompaniaDomiServ.getSubDominiosCompania(this.idCompania, this.idDominio)
			.subscribe(resp => {
				this.cargando = false;
				this.listSubDomin = resp.subdominios
				this.tituloDominio = resp.dominio
			})
	}

	eliminarArea(idArea: string, indice: number) {
		Swal.fire({
			title: 'Confirmación',
			text: `¿Esta seguro que desea eliminar el registro? `,
			icon: 'question',
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!'
		}).then((result) => {

			if (result.isConfirmed) {

				this.listAreas.splice(indice, 1); //renderizamos el componente de la lista de usuarios

				this.CompaniaServ.eliminar(idArea).subscribe()

				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente!',
					icon: 'success'
				});
			}
		})
	}

	eliminarDominio(idDominio: string, indice: number) {
		Swal.fire({
			title: 'Confirmación',
			text: `¿Esta seguro que desea eliminar el registro? `,
			icon: 'question',
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!'
		}).then((result) => {

			if (result.isConfirmed) {

				this.listSubDomin.splice(indice, 1); //renderizamos el componente de la lista de usuarios

				this.CompaniaDomiServ.eliminar(idDominio).subscribe()

				Swal.fire({
					title: 'Eliminado',
					text: 'Se ha eliminado correctamente!',
					icon: 'success'
				});
			}
		})
	}

}
