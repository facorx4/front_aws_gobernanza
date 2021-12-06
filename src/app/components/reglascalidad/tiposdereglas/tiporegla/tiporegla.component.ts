//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { TiposdereglasService } from 'src/app/services/tiposdereglas/tiposdereglas.service';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import { TipodereglaModel } from 'src/app/models/tiposdereglas.model';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-tiporegla',
	templateUrl: './tiporegla.component.html',

})
export class TiporeglaComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//	
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//	
	nuevoTiporegla: FormGroup;//referencia local del formulario
	tiporegla: TipodereglaModel;
	tituloPage: string;
	idTipo: string;

	constructor(public tipoService: TiposdereglasService,
		private router: Router,
		private fb: FormBuilder,
	    private routerParams: ActivatedRoute,
		private estilosService: EstilosService
	) {

		this.idTipo = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idTipo) {
			this.tituloPage = "Nuevo Tipo de regla"
		} else {
			this.tituloPage = "Editar Tipo de regla"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewuser();
	}

	ngOnInit(): void {

		this.cargarEstilos();


	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {

				this.botonGuardar = datos.botonGuardar

				this.botonAgregar = datos.botonAgregar
			})
	}


	crearFormularioNewuser() {

		this.nuevoTiporegla = this.fb.group({

			nombre: ['', [Validators.required]],


		}, {

		})

	}



	cargarDataFormulario() {
		this.tipoService.getOne(this.idTipo)
			.subscribe(
				datos => {
					this.nuevoTiporegla.reset({
						nombre: datos.nombre,

					})
				}
			)
	}




	crearTiporegla() {
		if (this.idTipo) {
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

			this.tipoService.edit(this.idTipo, this.nuevoTiporegla.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoTiporegla.get('nombre').value,
							text: 'Se actualizo correctamente el tipo de regla!',
							icon: 'success'
						});
						this.router.navigateByUrl('/tiporegla/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar tipo de regla',
							text: err.error.message,
							icon: 'error'
						});
					}

				)

		} else {

			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.nuevoTiporegla.invalid) {
				return Object.values(this.nuevoTiporegla.controls).forEach(control => {
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


			this.tipoService.create(this.nuevoTiporegla.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoTiporegla.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo tipo de regla!',
							icon: 'success'
						});
						this.router.navigateByUrl('/tiporegla/lista')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar tipo de regla',
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
	get nombreNoValid() {
		return this.nuevoTiporegla.get('nombre').invalid && this.nuevoTiporegla.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevoTiporegla.get('nombre').valid && this.nuevoTiporegla.get('nombre').touched;
	}


}

