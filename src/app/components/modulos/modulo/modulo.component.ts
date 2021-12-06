//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { ModuloModel } from 'src/app/models/modulo.model';
import { ModulosService } from 'src/app/services/userModulos/modulos.service';
import { SubmenusService } from 'src/app/services/submenus/submenus.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//jwt//
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-modulo',
	templateUrl: './modulo.component.html',

})
export class ModuloComponent implements OnInit {

	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos locales//
	moduloFormulario: FormGroup;//referencia local del formulario
	modulo: ModuloModel;
	listaSubmenus = [];
	selectedSubmenus = [];
	filtersubmenu = [];
	submenuNombre: String;
	submenuId: String;
	estiloBotonNuevo: String;
	botonAgregar: string;
	/* Atributos para editar modulo*/
	tituloPage: string;
	idModulo: string;
	constructor(public moduloService: ModulosService,
		private router: Router,
		private fb: FormBuilder,
		private routerParams: ActivatedRoute,
		public submenusServ: SubmenusService,
		private estilosService: EstilosService,
	) {
		this.idModulo = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idModulo) {
			this.tituloPage = "Nuevo Modulo"
		} else {
			this.tituloPage = "Editar Modulo"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewuser();
	}

	ngOnInit(): void {
		this.submenusServ.getAll().subscribe(resp => {
			this.listaSubmenus = resp['data'];
		})
		this.cargarEstilos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonNuevo = datos.botonGuardar
				this.botonAgregar = datos.botonAgregar
			})
	}

	crearFormularioNewuser() {
		this.moduloFormulario = this.fb.group({
			titulo: ['', [Validators.required]],
			icono: [''],
			submenus: [''],
		}, {
			//validaciones a nivel del formulario 
			//validators: this.validadores.passwordIguales('userPassword', 'userConfirPassword')
		})
	}
	cargarDataFormulario() {
		this.moduloService.getOne(this.idModulo)
			.subscribe(
				datos => {
					this.moduloFormulario.reset({
						titulo: datos.titulo,
						icono: datos.icono,
						submenus: datos.submenu,
					})
					this.selectedSubmenus = datos.submenu
				}
			)
	}
	guardarModulo() {
		this.moduloFormulario.value.submenu = this.selectedSubmenus.map(x => { return x._id });
		if (this.idModulo) {
			/***********************************************************************************
			Funcion para editar modulo
			***********************************************************************************/
			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos actualizando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			this.moduloService.edit(this.idModulo, this.moduloFormulario.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.moduloFormulario.get('titulo').value,
							text: 'Se actualizo correctamente el modulo!',
							icon: 'success'
						});
						this.router.navigateByUrl('/modulo/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar modulo',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		} else {
			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.moduloFormulario.invalid) {
				return Object.values(this.moduloFormulario.controls).forEach(control => {
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
			this.moduloService.save(this.moduloFormulario.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.moduloFormulario.get('titulo').value,
							text: 'Se ha creado correctamente un nuevo modulo!',
							icon: 'success'
						});
						this.router.navigateByUrl('/modulo/lista')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar modulo',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}

	selectOption(text, value) {
		this.submenuNombre = text;
		this.submenuId = value;
	}

	agregar() {
		this.selectedSubmenus.push({ titulo: this.submenuNombre, _id: this.submenuId });
	}

	quitar(i) {
		this.selectedSubmenus.splice(i, 1)
	}

	//validador

	get tituloNoValid() {
		return this.moduloFormulario.get('titulo').invalid && this.moduloFormulario.get('titulo').touched;
	}
	get tituloValid() {
		return this.moduloFormulario.get('titulo').valid && this.moduloFormulario.get('titulo').touched;
	}
}
