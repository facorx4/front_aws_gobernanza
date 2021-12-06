//angular imports//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//imports services//
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias imports//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'app-dominios',
	templateUrl: './dominios.component.html',
})

export class DominiosComponent implements OnInit {
	//Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//objetos locales//
	dominioCompania: FormGroup;
	idDominio: string;
	indicador: string;
	idCompaniaTemp: string;
	tituloPage: String;
	idCompania: string;
	estiloDetalle: string;

	constructor(private fb: FormBuilder,
		private CompaniaServ: CompaniaDominioService,
		private estilosService: EstilosService,
		private router: Router,
		private routerParams: ActivatedRoute) {
		this.idCompania = this.routerParams.snapshot.paramMap.get('id');
		this.idDominio = this.routerParams.snapshot.paramMap.get('id');
		this.indicador = this.routerParams.snapshot.paramMap.get('ind');

		if (this.indicador == "1") {
			this.tituloPage = "Nuevo Dominio";
		} else {
			this.tituloPage = "Editar Dominio ";
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
				this.estiloDetalle = datos.tituloDetalle;
			})
	}

	cargarDataFormulario() {
		this.CompaniaServ.getDetalleDominio(this.idDominio)
			.subscribe(
				datos => {
					this.dominioCompania.reset({
						nombreDom: datos.nombreDom,
						detalle: datos.detalle,
						idCompania: datos.compania
					})
					this.idCompaniaTemp = datos.compania
				})
	}

	createFormulario() {
		this.dominioCompania = this.fb.group({
			nombreDom: ['', Validators.required],
			detalle: ['', Validators.required],
			compania: [this.idCompania, Validators.required]
		})
	}

	crearDominio() {
		if (this.indicador == "1") {
			if (this.dominioCompania.invalid) {
				return Object.values(this.dominioCompania.controls).forEach(control => {
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

			this.CompaniaServ.create(this.idCompania, this.indicador, this.dominioCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							//title: this.areaCompania.get('nombreCompania').value,
							text: 'Se ha creado correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('compania/detalle/' + this.idCompania);
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

			this.CompaniaServ.edit(this.idDominio, this.indicador, this.dominioCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.dominioCompania.get('nombreDom').value,
							text: 'Se actualizo correctamente!',
							icon: 'success'
						});
						this.router.navigateByUrl('compania/detalle/' + this.idCompaniaTemp);
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}


	//validador
	get nombreNoValid() {
		return this.dominioCompania.get('nombreDom').invalid && this.dominioCompania.get('nombreDom').touched;
	}
	get nombreValid() {
		return this.dominioCompania.get('nombreDom').valid && this.dominioCompania.get('nombreDom').touched;
	}

	get detalleNoValid() {
		return this.dominioCompania.get('detalle').invalid && this.dominioCompania.get('detalle').touched;
	}
	get detalleValid() {
		return this.dominioCompania.get('detalle').valid && this.dominioCompania.get('detalle').touched;
	}
}

