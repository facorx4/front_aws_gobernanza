//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { ReporteModel } from 'src/app/models/reporte.model';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-reporte',
	templateUrl: './reporte.component.html',

})
export class ReporteComponent implements OnInit {

	//Extraer info token
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//	
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//
	reporteFormulario: FormGroup;//referencia local del formulario
	reporte: ReporteModel;
	nombreReporte: String;
	listaCompaniaDominio = [];
	selectedDominios = [];
	filterdominio = [];
	dominioNombre: String;
	dominioId: String;
	dominios = [];
	listaPeriodicidad = [];
	selectedPeridiocidad = [];
	listaAreas = [];
	selectedAreas = [];
	areasNombre: string;
	arerasId: string;

	/* Atributos para editar reporte*/
	tituloPage: string;
	idReporte: string;


	constructor(public reporteService: ReportesService,
		private router: Router,
		private fb: FormBuilder,
		private routerParams: ActivatedRoute,
		public dominioServ: CompaniaDominioService,
		public periodicidadServ: PeriodicidadService,
		public areaserv: CompaniaAreaService,
		private estilosService: EstilosService

	) {

		this.idReporte = this.routerParams.snapshot.paramMap.get('id');
		this.nombreReporte = this.routerParams.snapshot.paramMap.get('nombre');

		if (!this.idReporte) {
			this.tituloPage = "Nuevo Reporte"
		} else {
			this.tituloPage = "Editar Reporte" 
			this.cargarDataFormulario();
		}
		this.crearFormularioNewuser();
	}



	ngOnInit(): void {
		this.dominioServ.getAll().subscribe(resp => {
			this.listaCompaniaDominio = resp['companias']
		})

		this.periodicidadServ.getAll().subscribe(resp => {
			this.listaPeriodicidad = resp['data']
		})

		this.areaserv.getAllA()
			.subscribe(
				datos => {
					this.listaAreas = datos['companias']

				}
			)

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
		this.reporteFormulario = this.fb.group({
			identificador: ['', [Validators.required]],
			nombre: ['', [Validators.required]],
			propietario: ['', [Validators.required]],
			descripcion: [''],
			regulatorio: ['', [Validators.required]],
			periodicidad: ['', [Validators.required]],
			dimenciones: ['', [Validators.required]],
			indicadores: ['', [Validators.required]],
			cuadro: ['', [Validators.required]],
			nombreCuadro: [''],
			areas: ['', [Validators.required]],
			validado: ['', [Validators.required]],
			DominiosCompania: ['', [Validators.required]],


		}, {

		})
	}




	cargarDataFormulario() {
		this.reporteService.getOne(this.idReporte)
			.subscribe(
				datos => {
					this.reporteFormulario.reset({
						identificador: datos.identificador,
						nombre: datos.nombre,
						propietario: datos.propietario,
						descripcion: datos.descripcion,
						regulatorio: datos.regulatorio,
						periodicidad: datos.periodicidad,
						dimenciones: datos.dimenciones,
						indicadores: datos.indicadores,
						cuadro: datos.cuadro,
						nombreCuadro: datos.nombreCuadro,
						areas: datos.areas,
						validado: datos.validado,
						DominiosCompania: datos.DominiosCompania,


					})
					this.selectedDominios = datos.DominiosCompania
					this.selectedPeridiocidad = datos.periodicidad


					datos.areas.map(x => {
						this.areaserv.getDetalleAreas(x)
							.subscribe(data => {
								this.selectedAreas.push({ nombre: data.nombre, id: data._id });
							})
					})






				}
			)
	}

	guardarReporte() {
		/***********************************************************************************
		Realizamos el alert para mostar al usuario 
		***********************************************************************************/
		this.reporteFormulario.value.areas = this.selectedAreas.map(x => { return x.id });

		Swal.fire({
			allowOutsideClick: false,
			icon: 'info',
			text: 'Espere por un momento favor..'
		});
		Swal.showLoading();
		if (!this.idReporte) {

			this.reporteService.create(this.reporteFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente el nuevo reporte'
					});
					this.router.navigateByUrl('/reporte/lista');
				}, err => {

					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear el reporte'
					});
					this.router.navigateByUrl('/reporte/lista');
				}
			)
		} else {
			this.reporteService.edit(this.idReporte, this.reporteFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente el reporte'
					});
					this.router.navigateByUrl('/reporte/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al actualizar el reporte'
					});
					this.router.navigateByUrl('/reporte/lista');
				}
			)
		}
	}


	selectOptionPeriodicidad(text, value) {
		this.reporteFormulario.reset({
			identificador: this.reporteFormulario.value.identificador,
			nombre: this.reporteFormulario.value.nombre,
			propietario: this.reporteFormulario.value.propietario,
			descripcion: this.reporteFormulario.value.descripcion,
			regulatorio: this.reporteFormulario.value.regulatorio,
			periodicidad: value,
			dimenciones: this.reporteFormulario.value.dimenciones,
			indicadores: this.reporteFormulario.value.indicadores,
			cuadro: this.reporteFormulario.value.cuadro,
			nombreCuadro: this.reporteFormulario.value.nombreCuadro,
			areas: this.reporteFormulario.value.areas,
			validado: this.reporteFormulario.value.validado,
			DominiosCompania: this.reporteFormulario.value.DominiosCompania,
		})
	}

	selectOptionDominio(text, value) {
		this.reporteFormulario.reset({
			identificador: this.reporteFormulario.value.identificador,
			nombre: this.reporteFormulario.value.nombre,
			propietario: this.reporteFormulario.value.propietario,
			descripcion: this.reporteFormulario.value.descripcion,
			regulatorio: this.reporteFormulario.value.regulatorio,
			periodicidad: this.reporteFormulario.value.periodicidad,
			dimenciones: this.reporteFormulario.value.dimenciones,
			indicadores: this.reporteFormulario.value.indicadores,
			cuadro: this.reporteFormulario.value.cuadro,
			nombreCuadro: this.reporteFormulario.value.nombreCuadro,
			areas: this.reporteFormulario.value.areas,
			validado: this.reporteFormulario.value.validado,
			DominiosCompania: value,





		})
	}

	selectAreas(text, value) {
		this.areasNombre = text;
		this.arerasId = value;
	}

	agregarArea() {
		this.selectedAreas.push({ nombre: this.areasNombre, id: this.arerasId });
	}
	quitarArea(i) {
		this.selectedAreas.splice(i, 1)
	}




	//validador//
	get nombreNoValid() {
		return this.reporteFormulario.get('nombre').invalid && this.reporteFormulario.get('nombre').touched;
	}
	get nombreValid() {
		return this.reporteFormulario.get('nombre').valid && this.reporteFormulario.get('nombre').touched;
	}


	get identificadorNoValid() {
		return this.reporteFormulario.get('identificador').invalid && this.reporteFormulario.get('identificador').touched;
	}
	get identificadorValid() {
		return this.reporteFormulario.get('identificador').valid && this.reporteFormulario.get('identificador').touched;
	}

	get propietarioNoValid() {
		return this.reporteFormulario.get('propietario').invalid && this.reporteFormulario.get('propietario').touched;
	}
	get propietarioValid() {
		return this.reporteFormulario.get('propietario').valid && this.reporteFormulario.get('propietario').touched;
	}

	get regulatorioNoValid() {
		return this.reporteFormulario.get('regulatorio').invalid && this.reporteFormulario.get('regulatorio').touched;
	}
	get regulatorioValid() {
		return this.reporteFormulario.get('regulatorio').valid && this.reporteFormulario.get('regulatorio').touched;
	}

	get periodicidadNoValid() {
		return this.reporteFormulario.get('periodicidad').invalid && this.reporteFormulario.get('periodicidad').touched;
	}
	get periodicidadValid() {
		return this.reporteFormulario.get('periodicidad').valid && this.reporteFormulario.get('periodicidad').touched;
	}
	get dimencionesNoValid() {
		return this.reporteFormulario.get('dimenciones').invalid && this.reporteFormulario.get('dimenciones').touched;
	}
	get dimencionesValid() {
		return this.reporteFormulario.get('dimenciones').valid && this.reporteFormulario.get('dimenciones').touched;
	}

	get indicadoresNoValid() {
		return this.reporteFormulario.get('indicadores').invalid && this.reporteFormulario.get('indicadores').touched;
	}
	get indicadoresValid() {
		return this.reporteFormulario.get('indicadores').valid && this.reporteFormulario.get('indicadores').touched;
	}

	get cuadroNoValid() {
		return this.reporteFormulario.get('cuadro').invalid && this.reporteFormulario.get('cuadro').touched;
	}
	get cuadroValid() {
		return this.reporteFormulario.get('cuadro').valid && this.reporteFormulario.get('cuadro').touched;
	}

	get validadoNoValid() {
		return this.reporteFormulario.get('validado').invalid && this.reporteFormulario.get('validado').touched;
	}
	get validadoValid() {
		return this.reporteFormulario.get('validado').valid && this.reporteFormulario.get('validado').touched;
	}

	get DominiosCompaniaNoValid() {
		return this.reporteFormulario.get('DominiosCompania').invalid && this.reporteFormulario.get('DominiosCompania').touched;
	}
	get DominiosCompaniaValid() {
		return this.reporteFormulario.get('DominiosCompania').valid && this.reporteFormulario.get('DominiosCompania').touched;
	}

}
