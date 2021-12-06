//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//imports servicios//
import { CompaniaService } from 'src/app/services/companias/companias.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//import librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-crear-compania',
  templateUrl: './crear-compania.component.html',
})

export class CrearCompaniaComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
	//objetos locales//
  nuevaCompania: FormGroup;
  tituloPage: string;
  idCompania: string;
	//objetos de estilo//
	estiloGuardar: String;

  constructor(public companiaService: CompaniaService,
		private estilosService: EstilosService,
    private router: Router,
    private fb: FormBuilder,
    private routerParams: ActivatedRoute) {
	
	this.idCompania = this.routerParams.snapshot.paramMap.get('id');
    
	if (!this.idCompania) {
      this.tituloPage = "Nueva Compañía"
    } else {
      this.tituloPage = "Editar Compañía"
      this.cargarDataFormulario();
    }
    this.crearFormularioNewCompania();
  }

  ngOnInit(): void {
		this.cargarEstilos();
  }

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			this.estiloGuardar = datos.botonGuardar;
		  })
	  }

  crearFormularioNewCompania() {

		this.nuevaCompania = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombreCompania: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {

	this.companiaService.getOne(this.idCompania)
		.subscribe(
			datos => {
				this.nuevaCompania.reset({
					nombreCompania: datos.nombreCompania
				})
			}
		)
  }
  

  crearCompania() {
		if(this.idCompania) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.companiaService.edit(this.idCompania, this.nuevaCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaCompania.get('nombreCompania').value,
							text: 'Se actualizo correctamente la Compañía!',
							icon: 'success'
						});
						this.router.navigateByUrl('compania/lista')
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar la Compañía',
							text: err.error.message,
							icon: 'error'
						});
					}

				)

		} else {

			/***********************************************************************************
			Validamos si el formulario es valido de no ser asi retornamos el posteo 
			***********************************************************************************/
			if (this.nuevaCompania.invalid) {
				return Object.values(this.nuevaCompania.controls).forEach(control => {
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
			
			this.companiaService.create(this.nuevaCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaCompania.get('nombreCompania').value,
							text: 'Se ha creado correctamente una nueva Compañía!',
							icon: 'success'
						});
						this.router.navigateByUrl('compania/lista')
					},
					err => {
						//console.log(err)
						Swal.fire({
							title: 'Error al guardar!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)

		}//end else
	}

	//validador
	get nombreNoValid() {
		return this.nuevaCompania.get('nombreCompania').invalid && this.nuevaCompania.get('nombreCompania').touched;
	}
	get nombreValid() {
		return this.nuevaCompania.get('nombreCompania').valid && this.nuevaCompania.get('nombreCompania').touched;
	}
}
