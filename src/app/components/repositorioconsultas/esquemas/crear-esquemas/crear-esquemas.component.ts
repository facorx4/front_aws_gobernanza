//angular imports//
import { Component, OnInit } from '@angular/core';
import { RepoEsquemaService } from 'src/app/services/repoconsultas/repoesquemas.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { RepositorioService } from 'src/app/services/repositorios/repositorios.service';
//librerias//
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-crear-esquemas',
	templateUrl: './crear-esquemas.component.html',
})

export class CrearEsquemasComponent implements OnInit {


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
	listaRepositorios = [];

	constructor(public ModuloService: RepoEsquemaService,
		private router: Router,
		private fb: FormBuilder,
	    private routerParams: ActivatedRoute,
		private repositorioService: RepositorioService,
		private estilosService: EstilosService) {

		this.idRegistro = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idRegistro) {
			this.tituloPage = "Nuevo Esquema"
		} else {
			this.tituloPage = "Editar Esquema"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewCompania();
	}

	ngOnInit(): void {
		this.repositorioService.getAll().subscribe(resp => {

			this.listaRepositorios = resp['data'];

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
			repositorio: ['', [Validators.required]]
		})
	}

	cargarDataFormulario() {
		this.ModuloService.getOne(this.idRegistro)
			.subscribe(
				datos => {
					this.nuevaFuenteOficial.reset({
						identificador: datos.identificador,
						nombre: datos.nombre,
						repositorio: datos.repositorio
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
							text: 'Se actualizo correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('repoconsulta/esquema/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar',
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
						this.router.navigateByUrl('repoconsulta/esquema/lista');
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

	get repositorioNoValid() {
		return this.nuevaFuenteOficial.get('repositorio').invalid && this.nuevaFuenteOficial.get('repositorio').touched;
	}
	get repositorioValid() {
		return this.nuevaFuenteOficial.get('repositorio').valid && this.nuevaFuenteOficial.get('repositorio').touched;
	}
}
