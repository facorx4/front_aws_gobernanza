//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import jwt_decode from 'jwt-decode';
//librerias//
import Swal from 'sweetalert2';



@Component({
	selector: 'app-tickets',
	templateUrl: './tickets.component.html',

})
export class TicketsComponent implements OnInit {


	//objetos locales//
	nuevoTicket: FormGroup;//referencia local del formulario
	idTicket: string;
	tituloPage: string;

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token); //decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	constructor(public ticketService: TicketsService,
		private router: Router,
		private fb: FormBuilder,
		private routerParams: ActivatedRoute,) {

		this.idTicket = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idTicket) {
			this.tituloPage = "Nuevo Ticket"
		} else {
			this.tituloPage = "Editar Ticket"

		}
		this.crearFormularioNewuser();

	}

	ngOnInit(): void {
	}
	crearFormularioNewuser() {

		this.nuevoTicket = this.fb.group({

			userNombres: [this.datosUsuario.userNombres, [Validators.required]],
			userApellidos: [this.datosUsuario.userApellidos, [Validators.required]],
			userContacto: [this.datosUsuario.userContacto, [Validators.required]],
			userAvatar: [this.datosUsuario.userAvatar, [Validators.required]],
			otroContacto: [''],
			descripcion: ['', [Validators.required]],
			titulo: ['', [Validators.required]],


		}, {

		})

	}

	crearTicket() {
		if (this.idTicket) {
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

			this.ticketService.edit(this.idTicket, this.nuevoTicket.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoTicket.get('userNombres').value,
							text: 'Se actualizo correctamente el ticket!',
							icon: 'success'
						});
						this.router.navigateByUrl('/inicio/0')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar ticket',
							text: err.error.message,
							icon: 'error'
						});
					}

				)

		} else {

			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.nuevoTicket.invalid) {
				return Object.values(this.nuevoTicket.controls).forEach(control => {
					control.markAllAsTouched();
				});
			}

			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos Guardando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();


			this.ticketService.create(this.nuevoTicket.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoTicket.get('userNombres').value,
							text: 'Se ha creado correctamente un nuevo ticket!',
							icon: 'success'
						});
						this.router.navigateByUrl('/inicio/0')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar ticket',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}
}
