import { Component, OnInit } from '@angular/core';
import { FuenteOficialService } from 'src/app/services/fuentesoficiales/fuenteoficial.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuentesOficialesModel } from 'src/app/models/fuentesoficiales.model';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-crear-fuentes',
  templateUrl: './crear-fuentes.component.html',
})

export class CrearFuentesComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""

  nuevaFuenteOficial: FormGroup;
  tituloPage: string;
  idFuenteOficial: string;

  constructor(public FuenteOficialService: FuenteOficialService,
              private router: Router,
              private fb: FormBuilder,
              private validadores: ValidadoresService,
              private routerParams: ActivatedRoute,
			  private estilosService: EstilosService) {
	
	  this.idFuenteOficial = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idFuenteOficial) {
        this.tituloPage = "Nueva Fuente Oficial"
      } else {
        this.tituloPage = "Editar Fuente Oficial"
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
		
		this.botonGuardar = datos.botonGuardar
	
		this.botonAgregar = datos.botonAgregar
	  })
  }

  crearFormularioNewCompania() {
		this.nuevaFuenteOficial = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombre: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {
	  this.FuenteOficialService.getOne(this.idFuenteOficial)
		.subscribe(
			datos => {
				this.nuevaFuenteOficial.reset({
					nombre: datos.nombre
				})
			}	
		)
  }
  
  crearFuenteOficial() {
		if(this.idFuenteOficial) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.FuenteOficialService.edit(this.idFuenteOficial, this.nuevaFuenteOficial.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaFuenteOficial.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/fuenteoficial/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar el registro',
							text: err.error.message,
							icon: 'error'
						});
					}
				)

		} else {

			if (this.nuevaFuenteOficial.invalid) {
				return Object.values(this.nuevaFuenteOficial.controls).forEach(control => {
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
			
			this.FuenteOficialService.create(this.nuevaFuenteOficial.value)
				.subscribe(
					res => {

						Swal.fire({
							title: this.nuevaFuenteOficial.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/fuenteoficial/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar la Fuente Oficial!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}
	get nombreNoValid() {
		return this.nuevaFuenteOficial.get('nombre').invalid && this.nuevaFuenteOficial.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevaFuenteOficial.get('nombre').valid && this.nuevaFuenteOficial.get('nombre').touched;
	}

}
