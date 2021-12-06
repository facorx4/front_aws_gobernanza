//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import { RepoTablaCampoService } from 'src/app/services/repoconsultas/repotablacampo.service';
import { RepoTablaService } from 'src/app/services/repoconsultas/repotablas.service';
//librerias//
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-crear-tablacampo',
	templateUrl: './crear-tablacampo.component.html',
})

export class CrearTablacampoComponent implements OnInit {

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
	listaTablas = [];

	constructor(public ModuloService: RepoTablaCampoService,
		private router: Router,
		private fb: FormBuilder,
		private validadores: ValidadoresService,
		private routerParams: ActivatedRoute,
		private repoTablas: RepoTablaService,
		private estilosService: EstilosService) {

		this.idRegistro = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idRegistro) {
			this.tituloPage = "Nueva Tabla Campo"
		} else {
			this.tituloPage = "Editar Tabla Campo"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewCompania();
	}

	ngOnInit(): void {
		this.repoTablas.getAll().subscribe(resp => {

			this.listaTablas = resp['data'];

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
			Nombre: ['', [Validators.required]],
			Descripcion: [''],
			Manual: ['', [Validators.required]],
			Profundidad: ['', [Validators.required]],
			Longitud: ['', [Validators.required]],
			Decimales: ['', [Validators.required]],
			LlavePrimaria: ['', [Validators.required]],
			PermiteNulos: ['', [Validators.required]],
			repositorioTabla: ['', [Validators.required]],
		})
	}

	cargarDataFormulario() {
		this.ModuloService.getOne(this.idRegistro)
			.subscribe(
				datos => {
					this.nuevaFuenteOficial.reset({
						identificador: datos.identificador,
						Nombre: datos.Nombre,
						Descripcion: datos.Descripcion,
						Manual: datos.Manual,
						Profundidad: datos.Profundidad,
						Longitud: datos.Longitud,
						Decimales: datos.Decimales,
						LlavePrimaria: datos.LlavePrimaria,
						PermiteNulos: datos.PermiteNulos,
						repositorioTabla: datos.repositorioTabla
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
							title: this.nuevaFuenteOficial.get('Nombre').value,
							text: 'Se actualizo correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('repoconsulta/tablacampo/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar Tabla Campo',
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

			this.ModuloService.save(this.nuevaFuenteOficial.value)
				.subscribe(
					res => {

						Swal.fire({
							title: this.nuevaFuenteOficial.get('Nombre').value,
							text: 'Se ha creado correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('repoconsulta/tablacampo/lista');
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

	get NombreNoValid() {
		return this.nuevaFuenteOficial.get('Nombre').invalid && this.nuevaFuenteOficial.get('Nombre').touched;
	}
	get NombreValid() {
		return this.nuevaFuenteOficial.get('Nombre').valid && this.nuevaFuenteOficial.get('Nombre').touched;
	}


	get identificadorNoValid() {
		return this.nuevaFuenteOficial.get('identificador').invalid && this.nuevaFuenteOficial.get('identificador').touched;
	}
	get identificadorValid() {
		return this.nuevaFuenteOficial.get('identificador').valid && this.nuevaFuenteOficial.get('identificador').touched;
	}



	get ManualNoValid() {
		return this.nuevaFuenteOficial.get('Manual').invalid && this.nuevaFuenteOficial.get('Manual').touched;
	}
	get ManualValid() {
		return this.nuevaFuenteOficial.get('Manual').valid && this.nuevaFuenteOficial.get('Manual').touched;
	}

	get ProfundidadNoValid() {
		return this.nuevaFuenteOficial.get('Profundidad').invalid && this.nuevaFuenteOficial.get('Profundidad').touched;
	}
	get ProfundidadValid() {
		return this.nuevaFuenteOficial.get('Profundidad').valid && this.nuevaFuenteOficial.get('Profundidad').touched;
	}

	get LongitudNoValid() {
		return this.nuevaFuenteOficial.get('Longitud').invalid && this.nuevaFuenteOficial.get('Longitud').touched;
	}
	get LongitudValid() {
		return this.nuevaFuenteOficial.get('Longitud').valid && this.nuevaFuenteOficial.get('Longitud').touched;
	}

	get DecimalesNoValid() {
		return this.nuevaFuenteOficial.get('Decimales').invalid && this.nuevaFuenteOficial.get('Decimales').touched;
	}
	get DecimalesValid() {
		return this.nuevaFuenteOficial.get('Decimales').valid && this.nuevaFuenteOficial.get('Decimales').touched;
	}

	get LlavePrimariaNoValid() {
		return this.nuevaFuenteOficial.get('LlavePrimaria').invalid && this.nuevaFuenteOficial.get('LlavePrimaria').touched;
	}
	get LlavePrimariaValid() {
		return this.nuevaFuenteOficial.get('LlavePrimaria').valid && this.nuevaFuenteOficial.get('LlavePrimaria').touched;
	}

	get PermiteNulosNoValid() {
		return this.nuevaFuenteOficial.get('PermiteNulos').invalid && this.nuevaFuenteOficial.get('PermiteNulos').touched;
	}
	get PermiteNulosValid() {
		return this.nuevaFuenteOficial.get('PermiteNulos').valid && this.nuevaFuenteOficial.get('PermiteNulos').touched;
	}
	get repositorioTablaNoValid() {
		return this.nuevaFuenteOficial.get('repositorioTabla').invalid && this.nuevaFuenteOficial.get('repositorioTabla').touched;
	}
	get repositorioTablaValid() {
		return this.nuevaFuenteOficial.get('repositorioTabla').valid && this.nuevaFuenteOficial.get('repositorioTabla').touched;
	}

}
