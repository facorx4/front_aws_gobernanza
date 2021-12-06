//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { SubdominioIdService } from 'src/app/services/repositorios/subdominioId.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-subdominio',
	templateUrl: './subdominio.component.html',
	styleUrls: ['./subdominio.component.css']
})
export class SubdominioComponent implements OnInit {

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
	nombre: String;

	constructor(private fb: FormBuilder,
		private componentService: SubdominioIdService,
		private router: Router,
		private routerParams: ActivatedRoute,
		private estilosService: EstilosService
	) {

		this.id = this.routerParams.snapshot.paramMap.get('id');
		this.nombre = this.routerParams.snapshot.paramMap.get('nombre');
		if (!this.id) {
			this.tituloPage = "Nuevo Subdominio"
		} else {
			this.tituloPage = "Editar Subdominio " + this.nombre
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
					this.router.navigateByUrl('/repositorio/subdominio/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear'
					});
					this.router.navigateByUrl('/repositorio/subdominio/lista');
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
					this.router.navigateByUrl('repositorio/subdominio/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al actualizar'
					});
					this.router.navigateByUrl('/repositorio/subdominio/listas');
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
