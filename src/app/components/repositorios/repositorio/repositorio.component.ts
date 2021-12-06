//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { RepositorioService } from 'src/app/services/repositorios/repositorios.service';
import { TipoRepositorioService } from 'src/app/services/repositorios/tipoRepositorio.service';
import { SubdominioIdService } from 'src/app/services/repositorios/subdominioId.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-repositorio',
	templateUrl: './repositorio.component.html',
	styleUrls: ['./repositorio.component.css']
})
export class RepositorioComponent implements OnInit {


	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//  
	repositorioFormulario: FormGroup; /* creamos la referencia local del formulario */
	tituloPage: string;
	idRepositorio: string;
	nombreRepositorio: String;
	listaRepositorioTipoId = [];
	listasubdominioId = [];


	constructor(private fb: FormBuilder,
		private repositorioService: RepositorioService,
		private tipoRepositorioService: TipoRepositorioService,
		private subdominioIdService: SubdominioIdService,
		private router: Router,
		private routerParams: ActivatedRoute,
		private estilosService: EstilosService
	) {

		this.idRepositorio = this.routerParams.snapshot.paramMap.get('id');
		this.nombreRepositorio = this.routerParams.snapshot.paramMap.get('nombre');
		if (!this.idRepositorio) {
			this.tituloPage = "Nuevo Repositorio"
		} else {
			this.tituloPage = "Editar Repositorio " + this.nombreRepositorio
			this.cargarDataFormulario();
		}
		this.createFormulario();

	}

	ngOnInit(): void {
		this.tipoRepositorioService.getAll().subscribe(resp => {
			this.listaRepositorioTipoId = resp['data'];
			this.listaRepositorioTipoId.unshift({
				repositorioTipoId: 'Selecione un tipo de repositorio'
			})
		})
		this.subdominioIdService.getAll().subscribe(resp => {
			this.listasubdominioId = resp['data'];
			this.listasubdominioId.unshift({
				subdominioId: 'Selecione un subdominio de repositorio'
			})
		})
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
		this.repositorioFormulario = this.fb.group({
			nombre: ['', [Validators.required]],
			descripcion: ['', [Validators.required]],
			ruta: ['', [Validators.required]],
			repositorioTipoId: ['', [Validators.required]],
			subdominioId: ['', [Validators.required]]
		});
	}

	cargarDataFormulario() {
		this.repositorioService.getOne(this.idRepositorio)
			.subscribe(
				datos => {
					this.repositorioFormulario.reset({
						nombre: datos.nombre,
						descripcion: datos.descripcion,
						ruta: datos.ruta,
						repositorioTipoId: datos.repositorioTipoId,
						subdominioId: datos.subdominioId
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
		if (!this.idRepositorio) {
			console.log(this.repositorioFormulario.value)
			this.repositorioService.create(this.repositorioFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente'
					});
					this.router.navigateByUrl('/repositorio/lista');
				}, err => {
					console.log(err)
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear el repositorio'
					});
					this.router.navigateByUrl('/repositorio/lista');
				}
			)
		} else {
			this.repositorioService.edit(this.idRepositorio, this.repositorioFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente'
					});
					this.router.navigateByUrl('/repositorio/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al actualizar'
					});
					this.router.navigateByUrl('/repositorio/lista');
				}
			)
		}
	}


	//validador//

	get nombreNoValid() {
		return this.repositorioFormulario.get('nombre').invalid && this.repositorioFormulario.get('nombre').touched;
	}
	get nombreValid() {
		return this.repositorioFormulario.get('nombre').valid && this.repositorioFormulario.get('nombre').touched;
	}

	get descripcionNoValid() {
		return this.repositorioFormulario.get('descripcion').invalid && this.repositorioFormulario.get('descripcion').touched;
	}
	get descripcionValid() {
		return this.repositorioFormulario.get('descripcion').valid && this.repositorioFormulario.get('descripcion').touched;
	}

	get rutaNoValid() {
		return this.repositorioFormulario.get('ruta').invalid && this.repositorioFormulario.get('ruta').touched;
	}
	get rutaValid() {
		return this.repositorioFormulario.get('ruta').valid && this.repositorioFormulario.get('ruta').touched;
	}


	get repositorioTipoIdNoValid() {
		return this.repositorioFormulario.get('repositorioTipoId').invalid && this.repositorioFormulario.get('repositorioTipoId').touched;
	}
	get repositorioTipoIdValid() {
		return this.repositorioFormulario.get('repositorioTipoId').valid && this.repositorioFormulario.get('repositorioTipoId').touched;
	}

	get subdominioIdNoValid() {
		return this.repositorioFormulario.get('subdominioId').invalid && this.repositorioFormulario.get('subdominioId').touched;
	}
	get subdominioIdValid() {
		return this.repositorioFormulario.get('subdominioId').valid && this.repositorioFormulario.get('subdominioId').touched;
	}



}
