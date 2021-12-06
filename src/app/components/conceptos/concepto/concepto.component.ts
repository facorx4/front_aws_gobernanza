import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptosService } from 'src/app/services/conceptos/conceptos.service';
import { ConceptoModel } from 'src/app/models/concepto.model';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
 
})
export class ConceptoComponent implements OnInit {

  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];

  nuevoConcepto: FormGroup;//referencia local del formulario
	concepto: ConceptoModel;
  
  tituloPage: string;
	idConcepto: string;
  estiloBotonNuevo: String;

  constructor(public conceptoService: ConceptosService,
    private router: Router,
    private fb: FormBuilder,
    private routerParams: ActivatedRoute,
		private estilosService: EstilosService,
    ) { 

    this.idConcepto = this.routerParams.snapshot.paramMap.get('id');
		if (!this.idConcepto) {
			this.tituloPage = "Nuevo Concepto Uso"
		} else {
			this.tituloPage = "Editar Concepto Uso"
			this.cargarDataFormulario();
		}
		this.crearFormularioNewuser();
	}

	ngOnInit(): void {
		this.cargarEstilos();
		}
		
		cargarEstilos() {
			this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
				datos => {
				this.estiloBotonNuevo = datos.botonGuardar
				})
			}

	crearFormularioNewuser() {

		this.nuevoConcepto = this.fb.group({
			
			nombre: ['', [Validators.required]],
		
		
		}, {
			//validaciones a nivel del formulario 
			//validators: this.validadores.passwordIguales('userPassword', 'userConfirPassword')
		})

	}

	

	cargarDataFormulario() {
		this.conceptoService.getOne(this.idConcepto)
			.subscribe(
				datos => {
						this.nuevoConcepto.reset({
						nombre: datos.nombre,
					
					})
				}
			)
	}




	crearConcepto() {
		if(this.idConcepto) {
			/***********************************************************************************
			Funcion para editar modulo
			***********************************************************************************/
			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos actualizando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();

			this.conceptoService.edit(this.idConcepto, this.nuevoConcepto.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoConcepto.get('nombre').value,
							text: 'Se actualizo correctamente el concepto!',
							icon: 'success'
						});
						this.router.navigateByUrl('/concepto/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar concepto',
							text: err.error.message,
							icon: 'error'
						});
					}

				)

		} else {

			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.nuevoConcepto.invalid) {
				return Object.values(this.nuevoConcepto.controls).forEach(control => {
					control.markAllAsTouched();
				});
			}

			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos Guardando la informacion",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();


			this.conceptoService.create(this.nuevoConcepto.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevoConcepto.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo concepto!',
							icon: 'success'
						});
						this.router.navigateByUrl('/concepto/lista')
					},
					err => {

						Swal.fire({
							title: 'Error al guardar concepto',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}



	/**************************************************************************************
	agregamos get's para las validaciones de los input
	**************************************************************************************/

	get nombreNoValid() {
		return this.nuevoConcepto.get('nombre').invalid && this.nuevoConcepto.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevoConcepto.get('nombre').valid && this.nuevoConcepto.get('nombre').touched;
	}


}
