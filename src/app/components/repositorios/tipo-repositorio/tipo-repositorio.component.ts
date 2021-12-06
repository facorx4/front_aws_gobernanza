//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { TipoRepositorioService } from 'src/app/services/repositorios/tipoRepositorio.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-tipo-repositorio',
	templateUrl: './tipo-repositorio.component.html',
	styleUrls: ['./tipo-repositorio.component.css']
})
export class TipoRepositorioComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//
	dataFormulario: FormGroup; /* creamos la referencia local del formulario */
	tituloPage: string;
	id: string;
	nombretr: String;

	constructor(private fb: FormBuilder,
		private componentService: TipoRepositorioService,
		private router: Router,
		private routerParams: ActivatedRoute,
		private estilosService: EstilosService
	) {

		this.id = this.routerParams.snapshot.paramMap.get('id');
		this.nombretr = this.routerParams.snapshot.paramMap.get('nombre');
		if (!this.id) {
			this.tituloPage = "Nuevo Tipo Repositorio"
		} else {
			this.tituloPage = "Editar Tipo Repositorio " + this.nombretr
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

				this.botonGuardar = datos.botonGuardar

				this.botonAgregar = datos.botonAgregar
			})
	}
	/*********************************************************************** 
		Creamos el formulario para crear nuevos roles
	***********************************************************************/
	createFormulario() {
		this.dataFormulario = this.fb.group({
			nombre: ['', [Validators.required]]
		});
	}

	cargarDataFormulario() {
		this.componentService.getOne(this.id)
			.subscribe(
				datos => {
					this.dataFormulario.reset({
						nombre: datos.nombre
					})
				}
			)
	}

	/*********************************************************************** 
	metodo para guardar el rol en la bd 
	***********************************************************************/
	guardar() {
		/***********************************************************************************
		Realizamos el alert para mostar al usuario 
		***********************************************************************************/
		Swal.fire({
			allowOutsideClick: false,
			icon: 'info',
			text: 'Espere por un momento favor..'
		});
		Swal.showLoading();
		if (!this.id) {
			this.componentService.create(this.dataFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente'
					});
					this.router.navigateByUrl('/repositorio/tipo/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear el rol'
					});
					this.router.navigateByUrl('/repositorio/tipo/lista');
				}
			)
		} else {
			this.componentService.edit(this.id, this.dataFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente'
					});
					this.router.navigateByUrl('/repositorio/tipo/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al actualizar tipo repositorio'
					});
					this.router.navigateByUrl('/repositorio/tipo/lista');
				}
			)
		}
	}


	get nombreNoValid() {
		return this.dataFormulario.get('nombre').invalid && this.dataFormulario.get('nombre').touched;
	}
	get nombreValid() {
		return this.dataFormulario.get('nombre').valid && this.dataFormulario.get('nombre').touched;
	}
}

