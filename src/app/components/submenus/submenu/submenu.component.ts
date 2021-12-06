//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { SubmenusService } from 'src/app/services/submenus/submenus.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-submenu',
	templateUrl: './submenu.component.html',
	styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {

	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//Permisos Usuario//
	permisoEditar = this.datosUsuario.permisos[1];
	permisoEliminar = this.datosUsuario.permisos[3];
	permisoConsultar = this.datosUsuario.permisos[2];
	permisoCrear = this.datosUsuario.permisos[0];
	//objetos locales//
	submenuFormulario: FormGroup; /* creamos la referencia local del formulario */
	tituloPage: string;
	idSubmenu: string;
	nomSubmenu: String;
	//objetos estilos//
	estiloBotonNuevo: String;

	constructor(private fb: FormBuilder,
		private submenuServ: SubmenusService,
		private estilosService: EstilosService,
		private router: Router,
		private routerParams: ActivatedRoute
	) {

		this.idSubmenu = this.routerParams.snapshot.paramMap.get('id');
		this.nomSubmenu = this.routerParams.snapshot.paramMap.get('nombre');
		if (!this.idSubmenu) {
			this.tituloPage = "Nuevo Submenu"
		} else {
			this.tituloPage = "Editar Submenu " + this.nomSubmenu
			this.cargarDataFormulario();
		}
		this.createFormulario();

	}

	ngOnInit(): void {
		this.cargarEstilos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonNuevo = datos.botonGuardar
			})
	}

	/*********************************************************************** 
		Creamos el formulario para crear nuevos roles
	***********************************************************************/
	createFormulario() {
		this.submenuFormulario = this.fb.group({
			titulo: ['', [Validators.required, Validators.minLength(2)]],
			ruta: ['', [Validators.required]]
		});
	}

	cargarDataFormulario() {
		this.submenuServ.getOne(this.idSubmenu)
			.subscribe(
				datos => {
					this.submenuFormulario.reset({
						titulo: datos.titulo,
						ruta: datos.ruta
					})
				}
			)
	}

	/*********************************************************************** 
	metodo para guardar el rol en la bd 
	***********************************************************************/
	guardarSubmenu() {
		/***********************************************************************************
		Realizamos el alert para mostar al usuario 
		***********************************************************************************/
		Swal.fire({
			allowOutsideClick: false,
			icon: 'info',
			text: 'Espere por un momento favor..'
		});
		Swal.showLoading();
		if (!this.idSubmenu) {
			this.submenuServ.create(this.submenuFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente'
					});
					this.router.navigateByUrl('/submenu/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear el rol'
					});
					this.router.navigateByUrl('/submenu/lista');
				}
			)
		} else {
			this.submenuServ.edit(this.idSubmenu, this.submenuFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente'
					});
					this.router.navigateByUrl('/submenu/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al actualizar'
					});
					this.router.navigateByUrl('/submenu/lista');
				}
			)
		}
	}

	get tituloNoValid() {
		return this.submenuFormulario.get('titulo').invalid && this.submenuFormulario.get('titulo').touched;
	}
	get tituloValid() {
		return this.submenuFormulario.get('titulo').valid && this.submenuFormulario.get('titulo').touched;
	}




}
