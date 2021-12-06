//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { PrincipiosService } from 'src/app/services/principios/principios.service';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import { PrincipioModel } from 'src/app/models/principio.model';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-principio',
	templateUrl: './principio.component.html',

})
export class PrincipioComponent implements OnInit {
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//	
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//
	nuevoPrincipio: FormGroup;//referencia local del formulario
	principio: PrincipioModel;
	tituloPage: string;
	idPrincipio: string;

	constructor(public principioService: PrincipiosService,
		private router: Router,
		private fb: FormBuilder,
	    private routerParams: ActivatedRoute,
		private estilosService: EstilosService
	) {

		this.idPrincipio = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idPrincipio) {
			this.tituloPage = "Nuevo Principio"
		} else {
			this.tituloPage = "Editar Principio"
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

		this.nuevoPrincipio = this.fb.group({

			nombre: ['', [Validators.required]],
			descripcion: ['', [Validators.required]],


		}, {
			//validaciones a nivel del formulario 
			//validators: this.validadores.passwordIguales('userPassword', 'userConfirPassword')
		})

	}



	cargarDataFormulario() {
		this.principioService.getOne(this.idPrincipio)
			.subscribe(
				datos => {
					this.nuevoPrincipio.reset({
						nombre: datos.nombre,
						descripcion: datos.descripcion,

					})
				}
			)
	}




	crearPrincipio() {
		if (this.idPrincipio) {
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

			this.principioService.edit(this.idPrincipio, this.nuevoPrincipio.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoPrincipio.get('nombre').value,
							text: 'Se actualizo correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('/principio/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar principio',
							text: err.error.message,
							icon: 'error'
						});
					}

				)

		} else {

			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.nuevoPrincipio.invalid) {
				return Object.values(this.nuevoPrincipio.controls).forEach(control => {
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


			this.principioService.create(this.nuevoPrincipio.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoPrincipio.get('nombre').value,
							text: 'Se ha creado correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('/principio/lista')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar',
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
		return this.nuevoPrincipio.get('nombre').invalid && this.nuevoPrincipio.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevoPrincipio.get('nombre').valid && this.nuevoPrincipio.get('nombre').touched;
	}

	get descripcionNoValid() {
		return this.nuevoPrincipio.get('descripcion').invalid && this.nuevoPrincipio.get('descripcion').touched;
	}
	get descripcionValid() {
		return this.nuevoPrincipio.get('descripcion').valid && this.nuevoPrincipio.get('descripcion').touched;
	}


}

