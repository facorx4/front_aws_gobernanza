//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { ModulosService } from 'src/app/services/userModulos/modulos.service';
import { RolesService } from 'src/app/services/userRoles/roles.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-rol',
	templateUrl: './rol.component.html'
})
export class RolComponent implements OnInit {

	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//objetos estilos//
	estiloBotonNuevo: String;
	botonAgregar: string = ""
	//objetos locales// 
	rolFormulario: FormGroup; /* creamos la referencia local del formulario */
	listModulos = [];
	modulos = [];
	tituloPage: string;
	idRol: string;
	nomRol: string;
	moduloNombre: string;
	moduloId: string;


	constructor(private fb: FormBuilder,
		private moduloServicio: ModulosService,
		private rolesServ: RolesService,
		private router: Router,
		private estilosService: EstilosService,
		private routerParams: ActivatedRoute
	) {

		this.idRol = this.routerParams.snapshot.paramMap.get('id');
		this.nomRol = this.routerParams.snapshot.paramMap.get('nomRol');
		if (!this.idRol) {
			this.tituloPage = "Nuevo Rol"
		} else {
			this.tituloPage = "Editar Rol " + this.nomRol;
			this.cargarDataFormulario();
		}
		this.createFormulario();

	}

	ngOnInit(): void {
		this.cargarEstilos();
		this.listaModulos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonNuevo = datos.botonGuardar
				this.botonAgregar = datos.botonAgregar
			})
	}
	/*********************************************************************** 
		Creamos el formulario para crear nuevos roles
	***********************************************************************/
	createFormulario() {
		this.rolFormulario = this.fb.group({
			nomRol: ['', [Validators.required]],
			modulos: ['', [Validators.required]]
		});
	}


	/********************************************************************************
		listamos todos los modulos que estan en la BD 
	********************************************************************************/
	listaModulos() {
		this.moduloServicio.getAll().subscribe(modulo => {
			this.modulos = modulo['data'];
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
					console.log(listModulos)
					this.listModulos = listModulos;
					this.rolFormulario.reset({
						nomRol: datos.nomRol,
						modulos: listModulos
					})
					
				}
			)
	}

	/*********************************************************************** 
	metodo para guardar el rol en la bd 
	***********************************************************************/
	guardarRol() {
		this.rolFormulario.value.modulos = this.listModulos.map(x => { return x.id });
		/***********************************************************************************
		Realizamos el alert para mostar al usuario 
		***********************************************************************************/
		Swal.fire({
			allowOutsideClick: false,
			icon: 'info',
			text: 'Espere por un momento favor..'
		});
		Swal.showLoading();
		if (!this.idRol) {
			this.rolesServ.create(this.rolFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente'
					});
					this.router.navigateByUrl('/rol/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear el rol'
					});
					this.router.navigateByUrl('/rol/lista');
				}
			)
		} else {
			this.rolesServ.edit(this.idRol, this.rolFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente un nuevo rol'
					});
					this.router.navigateByUrl('/rol/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear el rol'
					});
					this.router.navigateByUrl('/rol/lista');
				}
			)
		}
	}

	selectOption(text, value) {
		this.moduloNombre = text;
		this.moduloId = value;
	}

	agregar() {
		this.listModulos.push({ modulo: this.moduloNombre, id: this.moduloId });
	}

	quitar(i) {
		this.listModulos.splice(i, 1)
	}

	//validaciones

	get nomRolNoValid() {
		return this.rolFormulario.get('nomRol').invalid && this.rolFormulario.get('nomRol').touched;
	}
	get nomRolValid() {
		return this.rolFormulario.get('nomRol').valid && this.rolFormulario.get('nomRol').touched;
	}

	get modulosNoValid() {
		return this.rolFormulario.get('modulos').invalid && this.rolFormulario.get('modulos').touched;
	}
	get modulosValid() {
		return this.rolFormulario.get('modulos').valid && this.rolFormulario.get('modulos').touched;
	}




}
