//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { RepoTablaService } from 'src/app/services/repoconsultas/repotablas.service';
import { RepoEsquemaService } from 'src/app/services/repoconsultas/repoesquemas.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-crear-tablas',
	templateUrl: './crear-tablas.component.html',
})

export class CrearTablasComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//
	nuevaFuenteOficial: FormGroup;
	tituloPage: string;
	idRegistro: string;
	listaEsquemas = [];

	constructor(public ModuloService: RepoTablaService,
		private router: Router,
		private fb: FormBuilder,
		private repoEsquemaService: RepoEsquemaService,
		private routerParams: ActivatedRoute,
		private estilosService: EstilosService) {

		this.idRegistro = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idRegistro) {
			this.tituloPage = "Nueva Tabla"
		} else {
			this.tituloPage = "Editar Tabla"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewCompania();
	}

	ngOnInit(): void {
		this.repoEsquemaService.getAll().subscribe(resp => {
			console.log(resp)
			this.listaEsquemas = resp['data'];

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

	crearFormularioNewCompania() {
		this.nuevaFuenteOficial = this.fb.group({
			identificador: ['', [Validators.required]],
			nombre: ['', [Validators.required]],
			repositorioEsquema: ['', [Validators.required]]
		})
	}

	cargarDataFormulario() {
		this.ModuloService.getOne(this.idRegistro)
			.subscribe(
				datos => {
					this.nuevaFuenteOficial.reset({
						identificador: datos.identificador,
						nombre: datos.nombre,
						repositorioEsquema: datos.repositorioEsquema
					})
				}
			)
	}

	crearRegistro() {
		if (this.idRegistro) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();

			this.ModuloService.edit(this.idRegistro, this.nuevaFuenteOficial.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaFuenteOficial.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('repoconsulta/tabla/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar el registro',
							text: err.error.message,
							icon: 'error'
						});
					}
				)

		} else {

			if (this.nuevaFuenteOficial.invalid) {
				return Object.values(this.nuevaFuenteOficial.controls).forEach(control => {
					control.markAllAsTouched();
					console.log('Error!!!, campos inválidos')
				});
			}

			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos Guardando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();

			this.ModuloService.create(this.nuevaFuenteOficial.value)
				.subscribe(
					res => {

						Swal.fire({
							title: this.nuevaFuenteOficial.get('nombre').value,
							text: 'Se ha creado correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('repoconsulta/tabla/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}


	get nombreNoValid() {
		return this.nuevaFuenteOficial.get('nombre').invalid && this.nuevaFuenteOficial.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevaFuenteOficial.get('nombre').valid && this.nuevaFuenteOficial.get('nombre').touched;
	}


	get identificadorNoValid() {
		return this.nuevaFuenteOficial.get('identificador').invalid && this.nuevaFuenteOficial.get('identificador').touched;
	}
	get identificadorValid() {
		return this.nuevaFuenteOficial.get('identificador').valid && this.nuevaFuenteOficial.get('identificador').touched;
	}

	get repositorioEsquemaNoValid() {
		return this.nuevaFuenteOficial.get('repositorioEsquema').invalid && this.nuevaFuenteOficial.get('repositorioEsquema').touched;
	}
	get repositorioEsquemaValid() {
		return this.nuevaFuenteOficial.get('repositorioEsquema').valid && this.nuevaFuenteOficial.get('repositorioEsquema').touched;
	}
}
