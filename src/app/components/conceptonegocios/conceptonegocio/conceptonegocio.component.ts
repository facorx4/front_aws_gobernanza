//angular imports//
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { ConceptosService } from 'src/app/services/conceptos/conceptos.service';
import { ConceptonegocioModel } from 'src/app/models/conceptonegocio.model';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias imports//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-conceptonegocio',
  templateUrl: './conceptonegocio.component.html',
 
})
export class ConceptonegocioComponent implements OnInit {

  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];

  conceptonegocioFormulario: FormGroup;//referencia local del formulario
	conceptonegocio: ConceptonegocioModel;
	listaConceptos = [];
	selectedConceptos = [];
	filterconcepto =[];
	conceptoNombre: String;
	conceptoId: String;
	conceptos = [];
  estiloBotonNuevo: String;

	/* Atributos para editar CONCEPTO NEGOCIO*/
	tituloPage: string;
	idConceptonegocio: string;

  constructor(public conceptonegocioService: ConceptonegociosService,
    private router: Router,
    private fb: FormBuilder,
    private routerParams: ActivatedRoute,
    public conceptoServ:ConceptosService,
		private estilosService: EstilosService,) {

      this.idConceptonegocio = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idConceptonegocio) {
        this.tituloPage = "Nuevo Concepto Negocio"
      } else {
        this.tituloPage = "Editar Concepto Negocio" 
        this.cargarDataFormulario();
      }
      this.crearFormularioNewuser();
    }

  ngOnInit(): void {
		this.cargarDatos();
		
		this.cargarEstilos();
  }
	
  cargarDatos() {
	this.conceptoServ.getAll().subscribe(resp => {
	
		this.listaConceptos = resp['data'];
	
		
	})
	}  

  crearFormularioNewuser() {
		this.conceptonegocioFormulario = this.fb.group({
			nombre: ['', [Validators.required]],
			definicion: [''],
			concepto: ['', [Validators.required]],
            calculo: [''],
		}, {
		
		})
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			this.estiloBotonNuevo = datos.botonGuardar
		  })
	  }


	cargarDataFormulario() {
		this.conceptonegocioService.getOne(this.idConceptonegocio)
			.subscribe(
				datos => {
					
						this.conceptonegocioFormulario.reset({
						nombre: datos.nombre,
						definicion: datos.definicion,
						concepto: datos.concepto,			
            calculo: datos.calculo,		
		
					})
					this.selectedConceptos = datos.concepto
				
				}
			)
	}
	guardarConceptonegocio() {
		if(this.idConceptonegocio) {
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
			this.conceptonegocioService.edit(this.idConceptonegocio, this.conceptonegocioFormulario.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.conceptonegocioFormulario.get('nombre').value,
							text: 'Se actualizo correctamente el concepto negocio!',
							icon: 'success'
						});
						this.router.navigateByUrl('/conceptonegocio/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar concepto negocio',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		} else {
			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.conceptonegocioFormulario.invalid) {
				return Object.values(this.conceptonegocioFormulario.controls).forEach(control => {
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
			this.conceptonegocioService.create(this.conceptonegocioFormulario.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.conceptonegocioFormulario.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo concepto negocio!',
							icon: 'success'
						});
						this.router.navigateByUrl('/conceptonegocio/lista')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar concepto negocio',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}

	selectOption(text, value) {
		this.conceptonegocioFormulario.reset({
			nombre: this.conceptonegocioFormulario.value.nombre,
			definicion: this.conceptonegocioFormulario.value.definicion,
			concepto: value,			
			calculo: this.conceptonegocioFormulario.value.calculo,		

		})
	}

//validador
	get nombreNoValid() {
		return this.conceptonegocioFormulario.get('nombre').invalid && this.conceptonegocioFormulario.get('nombre').touched;
	}
	get nombreValid() {
		return this.conceptonegocioFormulario.get('nombre').valid && this.conceptonegocioFormulario.get('nombre').touched;
	}

	get conceptoNoValid() {
		return this.conceptonegocioFormulario.get('concepto').invalid && this.conceptonegocioFormulario.get('concepto').touched;
	}
	get conceptoValid() {
		return this.conceptonegocioFormulario.get('concepto').valid && this.conceptonegocioFormulario.get('concepto').touched;
	}

}
