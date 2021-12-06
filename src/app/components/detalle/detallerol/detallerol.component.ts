import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/services/userRoles/roles.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { ModulosService } from 'src/app/services/userModulos/modulos.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-detallerol',
  templateUrl: './detallerol.component.html',

})
export class DetallerolComponent implements OnInit {
	//Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  listModulos = [];
  idRol: string;
	nombreRol: string;
	modulosRol: string;
	cargando: boolean = false;
	pageActual: number = 1;
	estiloDetalle: String;
	colorPaginador: string = "";


	constructor(
		private estilosService: EstilosService,
		private rolesServ: RolesService,
		private routerParams: ActivatedRoute,
		private moduloServicio: ModulosService,
	) {

		this.idRol = this.routerParams.snapshot.paramMap.get('id');

	}

	ngOnInit(): void {
    this.cargarDataFormulario();
		this.cargarEstilos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			this.estiloDetalle = datos.tituloDetalle;
			this.colorPaginador = datos.paginador
		  })
	  }

	  cargarDataFormulario() {
		var listModulos = [];
		this.rolesServ.getOne(this.idRol)
			.subscribe(
				datos => {

					datos.modulos.map(modulo=>{
						this.moduloServicio.getOne(modulo)
						.subscribe(
							datos =>{
								listModulos.push({modulo: datos.titulo, id: datos._id})
							}
						)
					})
					this.nombreRol = datos.nomRol
					this.listModulos = listModulos;

					
				}
			)
	}

}
