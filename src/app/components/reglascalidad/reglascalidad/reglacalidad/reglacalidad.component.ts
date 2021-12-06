//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { ReglascalidadService } from 'src/app/services/reglascalidad/reglascalidad.service';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { TiposdereglasService } from 'src/app/services/tiposdereglas/tiposdereglas.service';
import { PrincipiosService } from 'src/app/services/principios/principios.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { AplicativoService } from 'src/app/services/aplicativos/aplicativo.service';
import { ReglascalidadModel } from 'src/app/models/reglascalidad.model';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';



@Component({
	selector: 'app-reglacalidad',
	templateUrl: './reglacalidad.component.html',

})
export class ReglacalidadComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//	
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//
	reglacalidadFormulario: FormGroup;//referencia local del formulario
	reglacalidadM: ReglascalidadModel;
	identificador: string;

	//traer lista concepto negocios//
	listaConceptonegocios = [];
	selectedConceptonegocios = [];
	//traer lista tipo de regla//
	listaTipo = [];
	selectedTipo = [];
	//traer lista principios//
	listaPrin = [];
	selectedPrin = [];
	//traer lista periocidad//
	listaPerio = [];
	selectedPerio = [];
	//traer lista aplicativo//
	listaApli = [];
	selectedApli = [];
	//traer lista nombre entidad//
	listaEntidad = [];
	selectedEnt = [];


	/* Atributos para editar regla calidad*/
	tituloPage: string;
	idReglacalidad: string;

	constructor(public rcService: ReglascalidadService,
		private router: Router,
		private fb: FormBuilder,
		private routerParams: ActivatedRoute,
		public cnServ: ConceptonegociosService,
		public trServ: TiposdereglasService,
		public prinServ: PrincipiosService,
		public perioServ: PeriodicidadService,
		public apliServ: AplicativoService,
		public entServ: EntidadService,
		private estilosService: EstilosService

	) {

		this.idReglacalidad = this.routerParams.snapshot.paramMap.get('id');
		this.identificador = this.routerParams.snapshot.paramMap.get('identificador');
		if (!this.idReglacalidad) {
			this.tituloPage = "Nuevo Regla de calidad"
		} else {
			this.tituloPage = "Editar Regla de calidad" + this.identificador
			this.cargarDataFormulario();
		}
		this.crearFormularioNewuser();
	}

	ngOnInit(): void {
		this.cnServ.getAll().subscribe(resp => {
			this.listaConceptonegocios = resp['data'];

		})

		this.trServ.getAll().subscribe(resp => {
			this.listaTipo = resp['data'];

		})

		this.prinServ.getAll().subscribe(resp => {
			this.listaPrin = resp['data'];

		})

		this.perioServ.getAll().subscribe(resp => {
			this.listaPerio = resp['data'];

		})
		this.apliServ.getAll().subscribe(resp => {
			this.listaApli = resp['data'];

		})


		this.entServ.getAll().subscribe(resp => {
			this.listaEntidad = resp['data'];

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

	crearFormularioNewuser() {
		this.reglacalidadFormulario = this.fb.group({
			nombreEntidadDato: ['', [Validators.required]],
			identificador: ['', [Validators.required]],
			descripcion: [''],
			umbralSuperior: [''],
			umbralInferior: [''],
			validado: ['', [Validators.required]],
			aplicativo: ['', [Validators.required]],
			periodicidad: ['', [Validators.required]],
			tipo: ['', [Validators.required]],
			principio: ['', [Validators.required]],
			conceptoNegocio: ['', [Validators.required]],

		}, {

		})
	}




	cargarDataFormulario() {
		this.rcService.getOne(this.idReglacalidad)
			.subscribe(
				datos => {
					console.log(datos)
					this.reglacalidadFormulario.reset({
						nombreEntidadDato: datos.nombreEntidadDato,
						identificador: datos.identificador,
						descripcion: datos.descripcion,
						umbralSuperior: datos.umbralSuperior,
						umbralInferior: datos.umbralInferior,
						validado: datos.validado,
						aplicativo: datos.aplicativo,
						periodicidad: datos.periodicidad,
						tipo: datos.tipo,
						principio: datos.principio,
						conceptoNegocio: datos.conceptoNegocio,


					})
					this.selectedConceptonegocios = datos.conceptoNegocio
					this.selectedTipo = datos.tipo
					this.selectedPrin = datos.principio
					this.selectedPerio = datos.periodicidad
					this.selectedApli = datos.aplicativo
					this.selectedEnt = datos.nombreEntidadDato



				}
			)
	}
	guardarReglaCalidad() {
		/***********************************************************************************
			Realizamos el alert para mostar al usuario 
			***********************************************************************************/
		Swal.fire({
			allowOutsideClick: false,
			icon: 'info',
			text: 'Espere por un momento favor..'
		});
		Swal.showLoading();
		if (!this.idReglacalidad) {
			console.log(this.reglacalidadFormulario.value)
			this.rcService.create(this.reglacalidadFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente una nueva regla de calidad'
					});
					this.router.navigateByUrl('/reglacalidad/lista');
				}, err => {
					console.log(err)
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear la regla de calidad'
					});
					this.router.navigateByUrl('/reglacalidad/lista');
				}
			)
		} else {
			this.rcService.edit(this.idReglacalidad, this.reglacalidadFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente la regla de calidad'
					});
					this.router.navigateByUrl('/reglacalidad/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al actualizar la regla de calidad'
					});
					this.router.navigateByUrl('/reglacalidad/lista');
				}
			)
		}
	}


	selectOptionEntidad(text, value) {
		this.reglacalidadFormulario.reset({
			nombreEntidadDato: value,
			identificador: this.reglacalidadFormulario.value.identificador,
			descripcion: this.reglacalidadFormulario.value.descripcion,
			umbralSuperior: this.reglacalidadFormulario.value.umbralSuperior,
			umbralInferior: this.reglacalidadFormulario.value.umbralInferior,
			validado: this.reglacalidadFormulario.value.validado,
			aplicativo: this.reglacalidadFormulario.value.aplicativo,
			periodicidad: this.reglacalidadFormulario.value.periodicidad,
			tipo: this.reglacalidadFormulario.value.tipo,
			principio: this.reglacalidadFormulario.value.principio,
			conceptoNegocio: this.reglacalidadFormulario.value.conceptoNegocio,



		})
	}

	selectOptionConceptoN(text, value) {
		this.reglacalidadFormulario.reset({
			nombreEntidadDato: this.reglacalidadFormulario.value.nombreEntidadDato,
			identificador: this.reglacalidadFormulario.value.identificador,
			descripcion: this.reglacalidadFormulario.value.descripcion,
			umbralSuperior: this.reglacalidadFormulario.value.umbralSuperior,
			umbralInferior: this.reglacalidadFormulario.value.umbralInferior,
			validado: this.reglacalidadFormulario.value.validado,
			aplicativo: this.reglacalidadFormulario.value.aplicativo,
			periodicidad: this.reglacalidadFormulario.value.periodicidad,
			tipo: this.reglacalidadFormulario.value.tipo,
			principio: this.reglacalidadFormulario.value.principio,
			conceptoNegocio: value,



		})
	}

	selectOptionTipoRegla(text, value) {
		this.reglacalidadFormulario.reset({
			nombreEntidadDato: this.reglacalidadFormulario.value.nombreEntidadDato,
			identificador: this.reglacalidadFormulario.value.identificador,
			descripcion: this.reglacalidadFormulario.value.descripcion,
			umbralSuperior: this.reglacalidadFormulario.value.umbralSuperior,
			umbralInferior: this.reglacalidadFormulario.value.umbralInferior,
			validado: this.reglacalidadFormulario.value.validado,
			aplicativo: this.reglacalidadFormulario.value.aplicativo,
			periodicidad: this.reglacalidadFormulario.value.periodicidad,
			tipo: value,
			principio: this.reglacalidadFormulario.value.principio,
			conceptoNegocio: this.reglacalidadFormulario.value.conceptoNegocio,

		})
	}

	selectOptionPrincipio(text, value) {
		this.reglacalidadFormulario.reset({
			nombreEntidadDato: this.reglacalidadFormulario.value.nombreEntidadDato,
			identificador: this.reglacalidadFormulario.value.identificador,
			descripcion: this.reglacalidadFormulario.value.descripcion,
			umbralSuperior: this.reglacalidadFormulario.value.umbralSuperior,
			umbralInferior: this.reglacalidadFormulario.value.umbralInferior,
			validado: this.reglacalidadFormulario.value.validado,
			aplicativo: this.reglacalidadFormulario.value.aplicativo,
			periodicidad: this.reglacalidadFormulario.value.periodicidad,
			tipo: this.reglacalidadFormulario.value.tipo,
			principio: value,
			conceptoNegocio: this.reglacalidadFormulario.value.conceptoNegocio,

		})
	}

	selectOptionPeriodicidad(text, value) {
		this.reglacalidadFormulario.reset({
			nombreEntidadDato: this.reglacalidadFormulario.value.nombreEntidadDato,
			identificador: this.reglacalidadFormulario.value.identificador,
			descripcion: this.reglacalidadFormulario.value.descripcion,
			umbralSuperior: this.reglacalidadFormulario.value.umbralSuperior,
			umbralInferior: this.reglacalidadFormulario.value.umbralInferior,
			validado: this.reglacalidadFormulario.value.validado,
			aplicativo: this.reglacalidadFormulario.value.aplicativo,
			periodicidad: value,
			tipo: this.reglacalidadFormulario.value.tipo,
			principio: this.reglacalidadFormulario.value.principio,
			conceptoNegocio: this.reglacalidadFormulario.value.conceptoNegocio,

		})
	}

	selectOptionAplicativo(text, value) {
		this.reglacalidadFormulario.reset({
			nombreEntidadDato: this.reglacalidadFormulario.value.nombreEntidadDato,
			identificador: this.reglacalidadFormulario.value.identificador,
			descripcion: this.reglacalidadFormulario.value.descripcion,
			umbralSuperior: this.reglacalidadFormulario.value.umbralSuperior,
			umbralInferior: this.reglacalidadFormulario.value.umbralInferior,
			validado: this.reglacalidadFormulario.value.validado,
			aplicativo: value,
			periodicidad: this.reglacalidadFormulario.value.periodicidad,
			tipo: this.reglacalidadFormulario.value.tipo,
			principio: this.reglacalidadFormulario.value.principio,
			conceptoNegocio: this.reglacalidadFormulario.value.conceptoNegocio,

		})
	}

	//validador//
	get validadoNoValid() {
		return this.reglacalidadFormulario.get('validado').invalid && this.reglacalidadFormulario.get('validado').touched;
	}
	get validadoValid() {
		return this.reglacalidadFormulario.get('validado').valid && this.reglacalidadFormulario.get('validado').touched;
	}


	get identificadorNoValid() {
		return this.reglacalidadFormulario.get('identificador').invalid && this.reglacalidadFormulario.get('identificador').touched;
	}
	get identificadorValid() {
		return this.reglacalidadFormulario.get('identificador').valid && this.reglacalidadFormulario.get('identificador').touched;
	}

	get nombreEntidadDatoNoValid() {
		return this.reglacalidadFormulario.get('nombreEntidadDato').invalid && this.reglacalidadFormulario.get('nombreEntidadDato').touched;
	}
	get nombreEntidadDatoValid() {
		return this.reglacalidadFormulario.get('nombreEntidadDato').valid && this.reglacalidadFormulario.get('nombreEntidadDato').touched;
	}
	get aplicativoNoValid() {
		return this.reglacalidadFormulario.get('aplicativo').invalid && this.reglacalidadFormulario.get('aplicativo').touched;
	}
	get aplicativoValid() {
		return this.reglacalidadFormulario.get('aplicativo').valid && this.reglacalidadFormulario.get('aplicativo').touched;
	}

	get periodicidadNoValid() {
		return this.reglacalidadFormulario.get('periodicidad').invalid && this.reglacalidadFormulario.get('periodicidad').touched;
	}
	get periodicidadValid() {
		return this.reglacalidadFormulario.get('periodicidad').valid && this.reglacalidadFormulario.get('periodicidad').touched;
	}

	get tipoNoValid() {
		return this.reglacalidadFormulario.get('tipo').invalid && this.reglacalidadFormulario.get('tipo').touched;
	}
	get tipoValid() {
		return this.reglacalidadFormulario.get('tipo').valid && this.reglacalidadFormulario.get('tipo').touched;
	}

	get principioNoValid() {
		return this.reglacalidadFormulario.get('principio').invalid && this.reglacalidadFormulario.get('principio').touched;
	}
	get principioValid() {
		return this.reglacalidadFormulario.get('principio').valid && this.reglacalidadFormulario.get('principio').touched;
	}


	get concepttoNegocioNoValid() {
		return this.reglacalidadFormulario.get('conceptoNegocio').invalid && this.reglacalidadFormulario.get('conceptoNegocio').touched;
	}
	get concepttoNegocioValid() {
		return this.reglacalidadFormulario.get('conceptoNegocio').valid && this.reglacalidadFormulario.get('conceptoNegocio').touched;
	}




}
