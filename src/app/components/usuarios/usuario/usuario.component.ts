//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { RolesService } from 'src/app/services/userRoles/roles.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//librerias//
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';



@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//objetos locales//
	nuevoUsuario: FormGroup;//referencia local del formulario
	usuario: UsuarioModel;
	listaRolesUser = [];
	listaEstilos = [];
	tituloPage: string;
	idUsuario: string;
	//objetos estilos//
	permisoImportar: string;
	estiloBotonNuevo: String;


	constructor(public usuarioService: UsuariosService,
		private router: Router,
		private fb: FormBuilder,
		private validadores: ValidadoresService,
		private routerParams: ActivatedRoute,
		public rolesServ: RolesService,
		private estilosService: EstilosService
	) {

		this.idUsuario = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idUsuario) {
			this.tituloPage = "Nuevo usuario"
		} else {
			this.tituloPage = "Editar usuario"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewuser();
	}

	ngOnInit(): void {
		this.cargarRoles();
		this.cargarEstilos();
		//this.listaRoles();
	}

	cargarRoles(){
		this.rolesServ.getAll().subscribe(resp => {
		this.listaRolesUser = resp['data'];
		})
	}

	cargarEstilos() {
		this.estilosService.getAll().subscribe(
			datos => {
				this.listaEstilos = datos['data'];
			})
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonNuevo = datos.botonGuardar
			})
	}

	crearFormularioNewuser() {

		this.nuevoUsuario = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			userNombres: ['', [Validators.required]],
			userApellidos: ['', [Validators.required]],
			userSys: ['', [Validators.required]],
			userEmail: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
			userPassword: ['', [Validators.required]],
			userConfirPassword: ['', [Validators.required]],
			userEstado: ['activo', [Validators.required]],
			userRolID: ['', [Validators.required]],
			estilo: ['', [Validators.required]],
			userAvatar: ['http://placehold.it/100x100'],
			permisos: this.fb.array([])
		}, {
			//validaciones a nivel del formulario 
			validators: this.validadores.passwordIguales('userPassword', 'userConfirPassword')
		})
		for (let index = 0; index < 7; index++) {
			this.PermisosArray.push(new FormControl(false))
		}
	}



	cargarDataFormulario() {
		this.usuarioService.getOne(this.idUsuario)
			.subscribe(
				datos => {
					const estado = datos.userEstado ? "activo" : "inactivo"
					//this.nuevoUsuario.setValue({
					this.nuevoUsuario.reset({
						userNombres: datos.userNombres,
						userApellidos: datos.userApellidos,
						userSys: datos.userSys,
						userEmail: datos.userEmail,
						userPassword: datos.userPassword,
						userEstado: estado,
						userRolID: datos.userRolID,
						estilo: datos.estilo,
						userAvatar: datos.userAvatar,
						permisos: datos.permisos
					})
				}
			)
	}




	crearUsuario() {
		if (this.idUsuario) {
			/***********************************************************************************
			Funcion para editar usuario
			***********************************************************************************/
			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos actualizando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();

			this.usuarioService.edit(this.idUsuario, this.nuevoUsuario.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoUsuario.get('userNombres').value,
							text: 'Se actualizo correctamente un el usuario!',
							icon: 'success'
						});
						this.router.navigateByUrl('/usuario/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar usuario',
							text: err.error.message,
							icon: 'error'
						});
					}

				)

		} else {

			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.nuevoUsuario.invalid) {
				return Object.values(this.nuevoUsuario.controls).forEach(control => {
					control.markAllAsTouched();
					console.log('Error campos invalidos')
				});
			}

			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos Guardando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();


			this.usuarioService.create(this.nuevoUsuario.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoUsuario.get('userNombres').value,
							text: 'Se ha creado correctamente un nuevo usuario!',
							icon: 'success'
						});
						this.router.navigateByUrl('/usuario/lista')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar usuario',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}



	/**************************************************************************************
	agregamos get's para las validaciones de los input
	**************************************************************************************/
	get userNombresNoValid() {
		return this.nuevoUsuario.get('userNombres').invalid && this.nuevoUsuario.get('userNombres').touched;
	}
	get userNombresValid() {
		return this.nuevoUsuario.get('userNombres').valid && this.nuevoUsuario.get('userNombres').touched;
	}

	get userEmailNoValid() {
		return this.nuevoUsuario.get('userEmail').invalid && this.nuevoUsuario.get('userEmail').touched;
	}
	get userEmailValid() {
		return this.nuevoUsuario.get('userEmail').valid && this.nuevoUsuario.get('userEmail').touched;
	}

	get userPasswordNoValid() {
		return this.nuevoUsuario.get('userPassword').invalid && this.nuevoUsuario.get('userPassword').touched;
	}

	get userPasswordValid() {
		return this.nuevoUsuario.get('userPassword').valid && this.nuevoUsuario.get('userPassword').touched;
	}

	get estiloNoValid() {
		return this.nuevoUsuario.get('estilo').invalid && this.nuevoUsuario.get('estilo').touched;
	}

	get estiloValid() {
		return this.nuevoUsuario.get('estilo').valid && this.nuevoUsuario.get('estilo').touched;
	}

	get userRolIDNoValid() {
		return this.nuevoUsuario.get('userRolID').invalid && this.nuevoUsuario.get('userRolID').touched;
	}

	get userRolIDValid() {
		return this.nuevoUsuario.get('userRolID').valid && this.nuevoUsuario.get('userRolID').touched;
	}

	get permisosNoValid() {
		return this.nuevoUsuario.get('permisos').invalid && this.nuevoUsuario.get('permisos').touched;
	}

	get permisosValid() {
		return this.nuevoUsuario.get('permisos').valid && this.nuevoUsuario.get('permisos').touched;
	}


	get userConfirPasswordNoValid() {

		const pass1 = this.nuevoUsuario.get('userPassword').value;
		const pass2 = this.nuevoUsuario.get('userConfirPassword').value;

		return (pass1 === pass2) ? false : true;
	}

	get userConfirPasswordValid() {

		const pass1 = this.nuevoUsuario.get('userPassword').value;
		const pass2 = this.nuevoUsuario.get('userConfirPassword').value;

		return (pass1 === pass2 && this.nuevoUsuario.get('userConfirPassword').touched) ? true : false;
	}

	handleFileInput(files: FileList) {
		var image = { file: files.item(0), upload_preset: 'hsgcl027' }
		let formData: FormData = new FormData();
		formData.append('upload_preset', 'hsgcl027');
		formData.append('file', files.item(0));
		this.usuarioService.uploadImage(formData)
			.subscribe(
				datos => {
					this.imageUpload(datos.secure_url)
				})
	}

	imageUpload(url) {
		const estado = this.nuevoUsuario.value.userEstado == "activo" ? "activo" : "inactivo";
		this.nuevoUsuario.reset({
			userNombres: this.nuevoUsuario.value.userNombres,
			userApellidos: this.nuevoUsuario.value.userApellidos,
			userSys: this.nuevoUsuario.value.userSys,
			userEmail: this.nuevoUsuario.value.userEmail,
			userPassword: this.nuevoUsuario.value.userPassword,
			userConfirPassword: this.nuevoUsuario.value.userConfirPassword,
			userEstado: estado,
			estilo: this.nuevoUsuario.value.estilo,
			userRolID: this.nuevoUsuario.value.userRolID,
			userAvatar: url,
			permisos: this.nuevoUsuario.value.permisos
		});
	}
	//clase css valido => has-success
	//calse css invalido =>has-error

	get PermisosArray() {
		return this.nuevoUsuario.get('permisos') as FormArray;
	}
}
