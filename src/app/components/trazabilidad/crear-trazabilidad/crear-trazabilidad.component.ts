//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import servicios//
import { TrazabilidadService } from 'src/app/services/trazabilidad/trazabilidad.service';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { SubDominioService } from 'src/app/services/companiaSubDominio/companiaSubDominio.service';
import { TipoEntDatoService } from 'src/app/services/tipoentidadDato/tipoentdato.service';
import { FuenteOficialService } from 'src/app/services/fuentesoficiales/fuenteoficial.service';
import { TipoRepositorioService } from 'src/app/services/repositorios/tipoRepositorio.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { ConceptonegocioModel } from 'src/app/models/conceptonegocio.model';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-crear-trazabilidad',
	templateUrl: './crear-trazabilidad.component.html',
})

export class CrearTrazabilidadComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	//objetos estilos//
	botonGuardar: string = ""
	botonAgregar: string = ""
	//objetos locales//
	trazabilidadFormulario: FormGroup;
	conceptonegocio: ConceptonegocioModel;
	listaConceptos = [];
	listaConceptonegocios = [];
	listaDominios = [];
	listaSubDominios = [];
	listaTipoEntDato = [];
	listaFuenteOficial = [];
	listaTipoRepo = [];
	listaPeriodicidad = [];
	selectedConceptos = [];
	filterconcepto = [];
	conceptoNombre: String;
	conceptoId: String;
	conceptos = [];
	listaEntidad = [];
	selectedEnt = [];
	tituloPage: string;
	idRegistro: string;

	constructor(public appService: TrazabilidadService,
		private router: Router,
		private fb: FormBuilder,
		private routerParams: ActivatedRoute,
		public dominioServ: CompaniaDominioService,
		public subdominioServ: SubDominioService,
		public tipoEntDatoServ: TipoEntDatoService,
		private tipoRepositorioService: TipoRepositorioService,
		public fuenteOficialServ: FuenteOficialService,
		public periodicidadServ: PeriodicidadService,
		public cnServ: ConceptonegociosService,
		public entServ: EntidadService,
		private estilosService: EstilosService

	) {

		this.idRegistro = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idRegistro) {
			this.tituloPage = "Nueva Trazabilidad"
		} else {
			this.tituloPage = "Editar Trazabilidad"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewuser();
	}

	ngOnInit(): void {
		this.dominioServ.getAll().subscribe(resp => {
			this.listaDominios = resp['companias'];
		})

	

		this.tipoEntDatoServ.getAll().subscribe(resp => {
			this.listaTipoEntDato = resp['data'];
		})

		this.fuenteOficialServ.getAll().subscribe(resp => {
			this.listaFuenteOficial = resp['data'];
		})

		this.periodicidadServ.getAll().subscribe(resp => {
			this.listaPeriodicidad = resp['data'];
		})

		this.tipoRepositorioService.getAll().subscribe(resp => {
			this.listaTipoRepo = resp['data'];
		})

		this.cnServ.getAll().subscribe(resp => {
			this.listaConceptonegocios = resp['data'];
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
		this.trazabilidadFormulario = this.fb.group({
			dominio: [''],
			subDominio: [''],
			conceptoNegocio: [''],
			nombreEntidadDato: ['', [Validators.required]],
			tipoEntidadDato: ['', [Validators.required]],
			nombreFuente: ['', [Validators.required]],
			fuenteOficial: ['', [Validators.required]],
			repoFuenteOficial: ['', [Validators.required]],
			rutaOrigenRepositorio: ['', [Validators.required]],
			tipoRepositorio: ['', [Validators.required]],
			tablaFuenteOficial: ['', [Validators.required]],
			nombreCampoFuenteOficial: ['', [Validators.required]],
			descripcionCampo: ['', [Validators.required]],
			dataEntry: ['', [Validators.required]],
			periodicidadAct: ['', [Validators.required]],
			profundidadDato: ['', [Validators.required]],
			tipoDato: ['', [Validators.required]],
			longitud: ['', [Validators.required]],
			valoresValidos: ['', [Validators.required]],
			esLlavePrimaria: ['', [Validators.required]],
			responsableDefinición: ['', [Validators.required]],
		}, {

		})
	}

	cargarDataFormulario() {
		
		this.appService.getOne(this.idRegistro)
			.subscribe(
				datos => {
					console.log(datos)
					this.trazabilidadFormulario.reset({
						dominio: datos.dominio,
						subDominio: datos.subDominio,
						conceptoNegocio: datos.conceptoNegocio,
						nombreEntidadDato: datos.nombreEntidadDato,
						tipoEntidadDato: datos.tipoEntidadDato,
						nombreFuente: datos.nombreFuente,
						fuenteOficial: datos.fuenteOficial,
						repoFuenteOficial: datos.repoFuenteOficial,
						rutaOrigenRepositorio: datos.rutaOrigenRepositorio,
						tipoRepositorio: datos.tipoRepositorio,
						tablaFuenteOficial: datos.tablaFuenteOficial,
						nombreCampoFuenteOficial: datos.nombreCampoFuenteOficial,
						descripcionCampo: datos.descripcionCampo,
						dataEntry: datos.dataEntry,
						periodicidadAct: datos.periodicidadAct,
						profundidadDato: datos.profundidadDato,
						tipoDato: datos.tipoDato,
						longitud: datos.longitud,
						valoresValidos: datos.valoresValidos,
						esLlavePrimaria: datos.esLlavePrimaria,
						responsableDefinición: datos.responsableDefinición,
					})

					//	this.selectedEnt = datos['reglascalidad'].nombreEntidadDato
					
					this.subdominioServ.getSubDominiosxDominio( datos.dominio) //datos['trazabilidad'].dominio
					.subscribe(resp => {
						this.listaSubDominios = resp['subdominios'];
					})
				}
			)
	}

	guardarRegistro() {
		if (this.idRegistro) {
			/***********************************************************************************
			Funcion para editar concepto negocio
			***********************************************************************************/
			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos actualizando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			this.appService.edit(this.idRegistro, this.trazabilidadFormulario.value)
				.subscribe(
					res => {
						Swal.fire({
							//title: this.trazabilidadFormulario.get('nombre').value,
							text: 'Se actualizo correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('/trazabilidad/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		} else {
			if (this.trazabilidadFormulario.invalid) {
				return Object.values(this.trazabilidadFormulario.controls).forEach(control => {
					control.markAllAsTouched();
					console.log('Error campos invalidos')
				});
			}
			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos Guardando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			this.appService.create(this.trazabilidadFormulario.value)
				.subscribe(
					res => {
						Swal.fire({
							//title: this.trazabilidadFormulario.get('nombre').value,
							text: 'Se ha creado correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('/trazabilidad/lista')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar registro!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}



	changeList(id) {
		this.subdominioServ.getSubDominiosxDominio(id).subscribe(resp => {
			this.listaSubDominios = resp['subdominios'];
		})
	}



	get userNombresEntNoValid() {
		return this.trazabilidadFormulario.get('nombreEntidadDato').invalid && this.trazabilidadFormulario.get('nombreEntidadDato').touched;
	}
	get userNombresEntValid() {
		return this.trazabilidadFormulario.get('nombreEntidadDato').valid && this.trazabilidadFormulario.get('nombreEntidadDato').touched;
	}

	get userDominioNoValid() {
		return this.trazabilidadFormulario.get('dominio').invalid && this.trazabilidadFormulario.get('dominio').touched;
	}
	get userDominioValid() {
		return this.trazabilidadFormulario.get('dominio').valid && this.trazabilidadFormulario.get('dominio').touched;
	}

	get userSubDominioNoValid() {
		return this.trazabilidadFormulario.get('subDominio').invalid && this.trazabilidadFormulario.get('subDominio').touched;
	}
	get userSubDominioValid() {
		return this.trazabilidadFormulario.get('subDominio').valid && this.trazabilidadFormulario.get('subDominio').touched;
	}

	get userConceptoNNoValid() {
		return this.trazabilidadFormulario.get('conceptoNegocio').invalid && this.trazabilidadFormulario.get('conceptoNegocio').touched;
	}
	get userConceptoNValid() {
		return this.trazabilidadFormulario.get('conceptoNegocio').valid && this.trazabilidadFormulario.get('conceptoNegocio').touched;
	}

	get userTipoEntDatoNoValid() {
		return this.trazabilidadFormulario.get('tipoEntidadDato').invalid && this.trazabilidadFormulario.get('tipoEntidadDato').touched;
	}
	get userTipoEntDatoValid() {
		return this.trazabilidadFormulario.get('tipoEntidadDato').valid && this.trazabilidadFormulario.get('tipoEntidadDato').touched;
	}

	get userFuentesNoValid() {
		return this.trazabilidadFormulario.get('nombreFuente').invalid && this.trazabilidadFormulario.get('nombreFuente').touched;
	}
	get userFuentesValid() {
		return this.trazabilidadFormulario.get('nombreFuente').valid && this.trazabilidadFormulario.get('nombreFuente').touched;
	}

	get userFuenteOfiNoValid() {
		return this.trazabilidadFormulario.get('fuenteOficial').invalid && this.trazabilidadFormulario.get('fuenteOficial').touched;
	}
	get userFuenteOfiValid() {
		return this.trazabilidadFormulario.get('fuenteOficial').valid && this.trazabilidadFormulario.get('fuenteOficial').touched;
	}

	get userRepoFuenteOfiNoValid() {
		return this.trazabilidadFormulario.get('repoFuenteOficial').invalid && this.trazabilidadFormulario.get('repoFuenteOficial').touched;
	}
	get userRepoFuenteOfiValid() {
		return this.trazabilidadFormulario.get('repoFuenteOficial').valid && this.trazabilidadFormulario.get('repoFuenteOficial').touched;
	}

	get userRutaRepoNoValid() {
		return this.trazabilidadFormulario.get('rutaOrigenRepositorio').invalid && this.trazabilidadFormulario.get('rutaOrigenRepositorio').touched;
	}
	get userRutaRepoValid() {
		return this.trazabilidadFormulario.get('rutaOrigenRepositorio').valid && this.trazabilidadFormulario.get('rutaOrigenRepositorio').touched;
	}

	get userTipoRepoNoValid() {
		return this.trazabilidadFormulario.get('tipoRepositorio').invalid && this.trazabilidadFormulario.get('tipoRepositorio').touched;
	}
	get userTipoRepoValid() {
		return this.trazabilidadFormulario.get('tipoRepositorio').valid && this.trazabilidadFormulario.get('tipoRepositorio').touched;
	}

	get userTablaFuenteOfiNoValid() {
		return this.trazabilidadFormulario.get('tablaFuenteOficial').invalid && this.trazabilidadFormulario.get('tablaFuenteOficial').touched;
	}
	get userTablaFuenteOfiValid() {
		return this.trazabilidadFormulario.get('tablaFuenteOficial').valid && this.trazabilidadFormulario.get('tablaFuenteOficial').touched;
	}

	get userNombreCampoFuenteOfiNoValid() {
		return this.trazabilidadFormulario.get('nombreCampoFuenteOficial').invalid && this.trazabilidadFormulario.get('nombreCampoFuenteOficial').touched;
	}
	get userNombreCampoFuenteOfiValid() {
		return this.trazabilidadFormulario.get('nombreCampoFuenteOficial').valid && this.trazabilidadFormulario.get('nombreCampoFuenteOficial').touched;
	}

	get userDesCampoNoValid() {
		return this.trazabilidadFormulario.get('descripcionCampo').invalid && this.trazabilidadFormulario.get('descripcionCampo').touched;
	}
	get userDesCampoValid() {
		return this.trazabilidadFormulario.get('descripcionCampo').valid && this.trazabilidadFormulario.get('descripcionCampo').touched;
	}

	get userPeriodicidadNoValid() {
		return this.trazabilidadFormulario.get('periodicidadAct').invalid && this.trazabilidadFormulario.get('periodicidadAct').touched;
	}
	get userPeriodicidadValid() {
		return this.trazabilidadFormulario.get('periodicidadAct').valid && this.trazabilidadFormulario.get('periodicidadAct').touched;
	}

	get userProfundidadNoValid() {
		return this.trazabilidadFormulario.get('profundidadDato').invalid && this.trazabilidadFormulario.get('profundidadDato').touched;
	}
	get userProfundidadValid() {
		return this.trazabilidadFormulario.get('profundidadDato').valid && this.trazabilidadFormulario.get('profundidadDato').touched;
	}

	get userTipoDatoNoValid() {
		return this.trazabilidadFormulario.get('tipoDato').invalid && this.trazabilidadFormulario.get('tipoDato').touched;
	}
	get userTipoDatoValid() {
		return this.trazabilidadFormulario.get('tipoDato').valid && this.trazabilidadFormulario.get('tipoDato').touched;
	}

	get userLongitudNoValid() {
		return this.trazabilidadFormulario.get('longitud').invalid && this.trazabilidadFormulario.get('longitud').touched;
	}
	get userLongitudValid() {
		return this.trazabilidadFormulario.get('longitud').valid && this.trazabilidadFormulario.get('longitud').touched;
	}

	get userValoresValidosNoValid() {
		return this.trazabilidadFormulario.get('valoresValidos').invalid && this.trazabilidadFormulario.get('valoresValidos').touched;
	}
	get userValoresValidosValid() {
		return this.trazabilidadFormulario.get('valoresValidos').valid && this.trazabilidadFormulario.get('valoresValidos').touched;
	}

	get userRespDefiNoValid() {
		return this.trazabilidadFormulario.get('responsableDefinición').invalid && this.trazabilidadFormulario.get('responsableDefinición').touched;
	}
	get userRespDefiValid() {
		return this.trazabilidadFormulario.get('responsableDefinición').valid && this.trazabilidadFormulario.get('responsableDefinición').touched;
	}
}
