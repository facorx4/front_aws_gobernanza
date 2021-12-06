//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { SubDominioService } from 'src/app/services/companiaSubDominio/companiaSubDominio.service';
//import librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
	selector: 'app-crear-subdominios',
	templateUrl: './crear-subdominios.component.html',
})

export class CrearSubdominiosComponent implements OnInit {
	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//objetos locales//
	subdominioCompania: FormGroup;
	idDominio: string;
	indicador: string;
	idCompaniaTemp: string;
	idDominioTemp: string;
	tituloPage: String;
	idCompania: string;
	//objetos estilo//
	botonGuardar: string;

	constructor(private fb: FormBuilder,
		private SubDominioService: SubDominioService,
		private estilosService: EstilosService,
		private router: Router,
		private routerParams: ActivatedRoute) {
		this.idCompania = this.routerParams.snapshot.paramMap.get('idCompania');
		this.idDominio = this.routerParams.snapshot.paramMap.get('id');
		this.indicador = this.routerParams.snapshot.paramMap.get('ind');

		if (this.indicador == "1") {
			this.tituloPage = "Nuevo SubDominio";
		} else {
			this.tituloPage = "Editar SubDominio";
			this.cargarDataFormulario();
		}
		this.createFormulario();
	}

	ngOnInit(): void {
		this.cargarEstilos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			
			this.botonGuardar = datos.botonGuardar
		
		
		  })
	  }

	cargarDataFormulario() {
		this.SubDominioService.getDetalleSubDominio(this.idDominio)
			.subscribe(
				datos => {
					this.subdominioCompania.reset({
						nombre: datos.nombre,
						propietario: datos.propietario
					})
					this.idCompaniaTemp = datos.compania;
					this.idDominioTemp = datos.dominio;
				}
			)
	}

	createFormulario() {
		this.subdominioCompania = this.fb.group({
			nombre: ['', Validators.required],
			propietario: ['', Validators.required],
		})
	}

	crearSubDominio() {
		if (this.indicador == "1") {
			if (this.subdominioCompania.invalid) {
				return Object.values(this.subdominioCompania.controls).forEach(control => {
					control.markAllAsTouched();
				});
			}

			Swal.fire({
				title: 'Espere un momento',
				text: "Estamos Guardando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();

			this.SubDominioService.create(this.indicador, this.idCompania, this.idDominio, this.subdominioCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							text: 'Se ha creado correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('dominio/detalle/' + this.idCompania + '/' + this.idDominio);
					},
					err => {
						Swal.fire({
							title: 'Error al guardar!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		} else {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();

			this.SubDominioService.edit(this.idDominio, this.indicador, this.subdominioCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.subdominioCompania.get('nombre').value,
							text: 'Se actualizo correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('dominio/detalle/' + this.idCompaniaTemp + '/' + this.idDominioTemp);
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar el SubDominio',
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
		return this.subdominioCompania.get('nombre').invalid && this.subdominioCompania.get('nombre').touched;
	}
	get nombreValid() {
		return this.subdominioCompania.get('nombre').valid && this.subdominioCompania.get('nombre').touched;
	}

	get propietarioNoValid() {
		return this.subdominioCompania.get('propietario').invalid && this.subdominioCompania.get('propietario').touched;
	}
	get propietarioValid() {
		return this.subdominioCompania.get('propietario').valid && this.subdominioCompania.get('propietario').touched;
	}

}
