import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service'
import { SubDominioService } from 'src/app/services/companiaSubDominio/companiaSubDominio.service';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service'
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service'
import { TipoEntDatoService } from 'src/app/services/tipoentidadDato/tipoentdato.service';
import { PrioridadService } from 'src/app/services/prioridad/prioridad.service';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { IndicadorService } from 'src/app/services/indicador/indicador.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { AplicativoService } from 'src/app/services/aplicativos/aplicativo.service';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
import { FuenteOficialService } from 'src/app/services/fuentesoficiales/fuenteoficial.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'app-entidad',
	templateUrl: './entidad.component.html',
	styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""

	dataFormulario: FormGroup; /* creamos la referencia local del formulario */
	tituloPage: string;
	id: string;
	nombre: String;
	listaDominios = [];
	listaSubdominios = [];
	listaConceptoNegocio = [];
	listaDataOwner = [];
	listaTipoEntidad = [];
	listaPrioridad = [];
	listaReportes = [];
	listaIndicadorDimencion = [];
	listaPeriodicidadGeneracion = [];
	listaAplicativos = [];
	listaFuenteOficial = [];
	listaOtrosConsumidores = [];
	selectedReporte = [];
	selectedAplicativos = [];
	selectedOtros = [];
	reporteNombre: string;
	reporteId: string;
	aplicativoNombre: string;
	aplicativoId: string;
	otroNombre: string;
	otroId: string;

	constructor(private fb: FormBuilder,
		private componentService: EntidadService,
		private router: Router,
		private routerParams: ActivatedRoute,
		private companiaDominioService: CompaniaDominioService,
		private subdominioService: SubDominioService,
		private conceptonegociosService: ConceptonegociosService,
		private usuariosService: UsuariosService,
		private tipoEntDatoService: TipoEntDatoService,
		private prioridadService: PrioridadService,
		private reportesService: ReportesService,
		private indicadorService: IndicadorService,
		private periodicidadService: PeriodicidadService,
		private aplicativoService: AplicativoService,
		private OtrosConsumidoresService: CompaniaAreaService,
		private fuenteOficialService: FuenteOficialService,
		private estilosService: EstilosService
	) {

		this.id = this.routerParams.snapshot.paramMap.get('id');
		this.nombre = this.routerParams.snapshot.paramMap.get('nombre');
		if (!this.id) {
			this.tituloPage = "Nueva Entidad"
		} else {
			this.tituloPage = "Editar Entidad " + this.nombre
			this.cargarDataFormulario();
		}
		this.createFormulario();

	}

	ngOnInit(): void {
		this.companiaDominioService.getAll()
			.subscribe(
				datos => {
					this.listaDominios = datos['companias']
				}
			)

		this.conceptonegociosService.getAll()
			.subscribe(
				datos => {
					this.listaConceptoNegocio = datos['data']
				}
			)
		this.usuariosService.getAll()
			.subscribe(
				datos => {
					this.listaDataOwner = datos['data']
				}
			)
		this.tipoEntDatoService.getAll()
			.subscribe(
				datos => {
					this.listaTipoEntidad = datos['data']
				}
			)
		this.prioridadService.getAll()
			.subscribe(
				datos => {
					this.listaPrioridad = datos['data']
				}
			)

		this.indicadorService.getAll()
			.subscribe(
				datos => {
					this.listaIndicadorDimencion = datos['data']
				}
			)
		this.periodicidadService.getAll()
			.subscribe(
				datos => {
					this.listaPeriodicidadGeneracion = datos['data']
				}
			)
		this.aplicativoService.getAll()
			.subscribe(
				datos => {
					this.listaAplicativos = datos['data']
				}
			)
		this.fuenteOficialService.getAll()
			.subscribe(
				datos => {
					this.listaFuenteOficial = datos['data']
				}
			)
		this.OtrosConsumidoresService.getAllA()
			.subscribe(
				datos => {
					this.listaOtrosConsumidores = datos['companias']
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
	/*********************************************************************** 
		Creamos el formulario para crear nuevos roles
	***********************************************************************/
	createFormulario() {
		this.dataFormulario = this.fb.group({
			nombre: ['', [Validators.required]],
			dominio: ['', [Validators.required]],
			subdominio: ['', [Validators.required]],
			conceptoNegocio: ['', [Validators.required]],
			dataOwner: ['', [Validators.required]],
			definicionNegocio: ['', [Validators.required]],
			tipoEntidad: ['', [Validators.required]],
			logicaCalculo: ['', [Validators.required]],
			ejemploValores: ['', [Validators.required]],
			prioridad: ['', [Validators.required]],
			reportes: ['', [Validators.required]],
			indicadorDimencion: ['', [Validators.required]],
			periodicidadGeneracion: ['', [Validators.required]],
			aplicativos: ['', [Validators.required]],
			capoFuenteOficial: ['', [Validators.required]],
			fuenteOficial: ['', [Validators.required]],
			pantalla: ['', [Validators.required]],
			campoFuente: ['', [Validators.required]],
			otrosConsumidores: ['', [Validators.required]],
			validado: ['', [Validators.required]]
		});
	}

	cargarDataFormulario() {
		this.componentService.getOne(this.id)
			.subscribe(
				datos => {
					this.dataFormulario.reset({
						nombre: datos.nombre,
						dominio: datos.dominio,
						subdominio: datos.subdominio,
						conceptoNegocio: datos.conceptoNegocio,
						dataOwner: datos.dataOwner,
						definicionNegocio: datos.definicionNegocio,
						tipoEntidad: datos.tipoEntidad,
						logicaCalculo: datos.logicaCalculo,
						ejemploValores: datos.ejemploValores,
						prioridad: datos.prioridad,
						indicadorDimencion: datos.indicadorDimencion,
						periodicidadGeneracion: datos.periodicidadGeneracion,
						capoFuenteOficial: datos.capoFuenteOficial,
						fuenteOficial: datos.fuenteOficial,
						pantalla: datos.pantalla,
						campoFuente: datos.campoFuente,
						validado: datos.validado
					})
					this.reportesService.getDominio(datos.dominio)
						.subscribe(
							datos => {
								console.log(datos)
								this.listaReportes = datos['data']
							}
						)

					this.subdominioService.getSubDominiosxDominio(datos.dominio)
						.subscribe(
							datos => {
								console.log(datos['subdominios'])
								this.listaSubdominios = datos['subdominios']
							}
						)
					datos.reportes.map( x=> {
						this.reportesService.getOne(x)
						.subscribe( data=>{
							console.log(data)
							this.selectedReporte.push({ nombre: data['repodatarte'].nombre, id: data['reporte']._id });
						})
					})
					datos.aplicativos.map( x=> {
						this.aplicativoService.getOne(x)
						.subscribe( data=>{
					this.selectedAplicativos.push({ nombre: data.nombre, id: data._id });
						})
					})
					datos.otrosConsumidores.map( x=> {
						this.OtrosConsumidoresService.getDetalleArea(x)
						.subscribe( data=>{
							this.selectedOtros.push({ nombre: data.nombre, id: data._id });
						})
					})
				}
			)
	}

	actualizarReporte(id) {

		this.reportesService.getDominio(id)
			.subscribe(
				datos => {
					this.listaReportes = datos
				}
			)

		this.subdominioService.getSubDominiosxDominio(id)
			.subscribe(
				datos => {
					console.log(datos)
					this.listaSubdominios = datos['subdominios']
				}
			)
	}
	selectReporte(text, value) {
		this.reporteNombre = text;
		this.reporteId = value;
	}

	selectAplicativos(text, value) {
		this.aplicativoNombre = text;
		this.aplicativoId = value;
	}

	selectOtros(text, value) {
		this.otroNombre = text;
		this.otroId = value;
	}

	agregarReporte() {
		this.selectedReporte.push({ nombre: this.reporteNombre, id: this.reporteId });
	}
	agregarAplicativo() {
		this.selectedAplicativos.push({ nombre: this.aplicativoNombre, id: this.aplicativoId });
	}
	agregarOtros() {
		this.selectedOtros.push({ nombre: this.otroNombre, id: this.otroId });
	}
	quitarReporte(i) {
		this.selectedReporte.splice(i, 1)
	}
	quitarAplicativo(i) {
		this.selectedAplicativos.splice(i, 1)
	}
	quitarOtros(i) {
		this.selectedOtros.splice(i, 1)
	}
	/*********************************************************************** 
	metodo para guardar el rol en la bd 
	***********************************************************************/
	guardar() {
		this.dataFormulario.value.reportes = this.selectedReporte.map(x => { return x.id });
		this.dataFormulario.value.aplicativos = this.selectedAplicativos.map(x => { return x.id });
		this.dataFormulario.value.otros = this.selectedOtros.map(x => { return x.id });
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
						text: 'Se ha guardado correctamente una nueva entidad'
					});
					this.router.navigateByUrl('/entidad');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al crear la entidad'
					});
					this.router.navigateByUrl('/entidad');
				}
			)
		} else {
			this.componentService.edit(this.id, this.dataFormulario.value).subscribe(
				res => {
					Swal.close();
					Swal.fire({
						icon: 'success',
						title: 'Nuevo registro',
						text: 'Se ha guardado correctamente la entidad'
					});
					this.router.navigateByUrl('/entidad/lista');
				}, err => {
					Swal.close();
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error al actualizar la entidad'
					});
					this.router.navigateByUrl('/entidad/lista');
				}
			)
		}
	}

	//validador
	get nombreNoValid() {
		return this.dataFormulario.get('nombre').invalid && this.dataFormulario.get('nombre').touched;
	}
	get nombreValid() {
		return this.dataFormulario.get('nombre').valid && this.dataFormulario.get('nombre').touched;
	}


	get dominioNoValid() {
		return this.dataFormulario.get('dominio').invalid && this.dataFormulario.get('dominio').touched;
	}
	get dominioValid() {
		return this.dataFormulario.get('dominio').valid && this.dataFormulario.get('dominio').touched;
	}

	get subdominioNoValid() {
		return this.dataFormulario.get('subdominio').invalid && this.dataFormulario.get('subdominio').touched;
	}
	get subdominioValid() {
		return this.dataFormulario.get('subdominio').valid && this.dataFormulario.get('subdominio').touched;
	}

	get conceptoNegocioNoValid() {
		return this.dataFormulario.get('conceptoNegocio').invalid && this.dataFormulario.get('conceptoNegocio').touched;
	}
	get conceptoNegocioValid() {
		return this.dataFormulario.get('conceptoNegocio').valid && this.dataFormulario.get('conceptoNegocio').touched;
	}

	get dataOwnerNoValid() {
		return this.dataFormulario.get('dataOwner').invalid && this.dataFormulario.get('dataOwner').touched;
	}
	get dataOwnerValid() {
		return this.dataFormulario.get('dataOwner').valid && this.dataFormulario.get('dataOwner').touched;
	}

	get definicionNegocioNoValid() {
		return this.dataFormulario.get('definicionNegocio').invalid && this.dataFormulario.get('definicionNegocio').touched;
	}
	get definicionNegocioValid() {
		return this.dataFormulario.get('definicionNegocio').valid && this.dataFormulario.get('definicionNegocio').touched;
	}

	get tipoEntidadNoValid() {
		return this.dataFormulario.get('tipoEntidad').invalid && this.dataFormulario.get('tipoEntidad').touched;
	}
	get tipoEntidadValid() {
		return this.dataFormulario.get('tipoEntidad').valid && this.dataFormulario.get('tipoEntidad').touched;
	}

	get logicaCalculoNoValid() {
		return this.dataFormulario.get('logicaCalculo').invalid && this.dataFormulario.get('logicaCalculo').touched;
	}
	get logicaCalculoValid() {
		return this.dataFormulario.get('logicaCalculo').valid && this.dataFormulario.get('logicaCalculo').touched;
	}

	get ejemploValoresNoValid() {
		return this.dataFormulario.get('ejemploValores').invalid && this.dataFormulario.get('ejemploValores').touched;
	}
	get ejemploValoresValid() {
		return this.dataFormulario.get('ejemploValores').valid && this.dataFormulario.get('ejemploValores').touched;
	}

	get prioridadNoValid() {
		return this.dataFormulario.get('prioridad').invalid && this.dataFormulario.get('prioridad').touched;
	}
	get prioridadValid() {
		return this.dataFormulario.get('prioridad').valid && this.dataFormulario.get('prioridad').touched;
	}
	get reportesNoValid() {
		return this.dataFormulario.get('reportes').invalid && this.dataFormulario.get('reportes').touched;
	}
	get reportesValid() {
		return this.dataFormulario.get('reportes').valid && this.dataFormulario.get('reportes').touched;
	}
	get indicadorDimencionNoValid() {
		return this.dataFormulario.get('indicadorDimencion').invalid && this.dataFormulario.get('indicadorDimencion').touched;
	}
	get indicadorDimencionValid() {
		return this.dataFormulario.get('indicadorDimencion').valid && this.dataFormulario.get('indicadorDimencion').touched;
	}

	get periodicidadGeneracionNoValid() {
		return this.dataFormulario.get('periodicidadGeneracion').invalid && this.dataFormulario.get('periodicidadGeneracion').touched;
	}
	get periodicidadGeneracionValid() {
		return this.dataFormulario.get('periodicidadGeneracion').valid && this.dataFormulario.get('periodicidadGeneracion').touched;
	}
	get aplicativosGeneracionNoValid() {
		return this.dataFormulario.get('aplicativos').invalid && this.dataFormulario.get('aplicativos').touched;
	}
	get aplicativosGeneracionValid() {
		return this.dataFormulario.get('aplicativos').valid && this.dataFormulario.get('aplicativos').touched;
	}
	get capoFuenteOficialNoValid() {
		return this.dataFormulario.get('capoFuenteOficial').invalid && this.dataFormulario.get('capoFuenteOficial').touched;
	}
	get capoFuenteOficialValid() {
		return this.dataFormulario.get('capoFuenteOficial').valid && this.dataFormulario.get('capoFuenteOficial').touched;
	}
	get fuenteOficialNoValid() {
		return this.dataFormulario.get('fuenteOficial').invalid && this.dataFormulario.get('fuenteOficial').touched;
	}
	get fuenteOficialValid() {
		return this.dataFormulario.get('fuenteOficial').valid && this.dataFormulario.get('fuenteOficial').touched;
	}

	get pantallaNoValid() {
		return this.dataFormulario.get('pantalla').invalid && this.dataFormulario.get('pantalla').touched;
	}
	get pantallaValid() {
		return this.dataFormulario.get('pantalla').valid && this.dataFormulario.get('pantalla').touched;
	}

	get campoFuenteNoValid() {
		return this.dataFormulario.get('campoFuente').invalid && this.dataFormulario.get('campoFuente').touched;
	}
	get campoFuenteValid() {
		return this.dataFormulario.get('campoFuente').valid && this.dataFormulario.get('campoFuente').touched;
	}
		
	get otrosConsumidoresNoValid() {
		return this.dataFormulario.get('otrosConsumidores').invalid && this.dataFormulario.get('otrosConsumidores').touched;
	}
	get otrosConsumidoresValid() {
		return this.dataFormulario.get('otrosConsumidores').valid && this.dataFormulario.get('otrosConsumidores').touched;
	}
	get validadoNoValid() {
		return this.dataFormulario.get('validado').invalid && this.dataFormulario.get('validado').touched;
	}
	get validadoValid() {
		return this.dataFormulario.get('validado').valid && this.dataFormulario.get('validado').touched;
	}

}
