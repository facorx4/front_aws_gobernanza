//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-detalle-compania',
	templateUrl: './detalle-compania.component.html',
})

export class DetalleCompaniaComponent implements OnInit {
	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//permisos//
	permisoEditar = this.datosUsuario.permisos[1];
	permisoEliminar = this.datosUsuario.permisos[3];
	permisoConsultar = this.datosUsuario.permisos[2];
	permisoCrear = this.datosUsuario.permisos[0];
	//objetos locales//
	cargandoAreas: boolean = false;
	cargando: boolean = false;
	areaCompania: FormGroup;
	listAreas = [];
	listDomin = [];
	tituloCompania: String;
	idCompania: string;
	moduloNombre: string;
	pageActual: number = 1;
	filterNomArea = '';
	filterGeneralArea = '';
	pageActual2: number = 1;
	filterNomDom = '';
	filterGeneralDom = '';
	//objetos estilos//
	estiloDetalle: string;
	estiloBotonNuevo: string = "";
	botonAccion: string = "";
	colorPaginador: string = "";

	constructor(private fb: FormBuilder,
		private CompaniaServ: CompaniaAreaService,
		private CompaniaDomiServ: CompaniaDominioService,
		private estilosService: EstilosService,
		private routerParams: ActivatedRoute
	) {
		this.idCompania = this.routerParams.snapshot.paramMap.get('id');
		this.createFormulario();
		this.listaAreasCompania();
		this.listaDominiosCompania();
	}

	ngOnInit(): void {
		this.cargarEstilos();
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

	listaAreasCompania() {
		this.cargandoAreas = true;
		this.CompaniaServ.getAreasCompania(this.idCompania)
			.subscribe(resp => {
				this.cargandoAreas = false;
				this.listAreas = resp.areas
				this.tituloCompania = resp.compania
			})
	}

	listaDominiosCompania() {
		this.cargando = true;
		this.CompaniaDomiServ.getDominiosCompania(this.idCompania)
			.subscribe(resp => {
				this.cargando = false;
				this.listDomin = resp.dominios
				this.tituloCompania = resp.compania
			})
	}

	eliminarArea(idArea: string, indice: number) {
		Swal.fire({
			title: 'Confirmación',
			text: `¿Esta seguro que desea eliminar? `,
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
			text: `¿Esta seguro que desea eliminar? `,
			icon: 'question',
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!'
		}).then((result) => {

			if (result.isConfirmed) {

				this.listDomin.splice(indice, 1); //renderizamos el componente de la lista de usuarios

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
