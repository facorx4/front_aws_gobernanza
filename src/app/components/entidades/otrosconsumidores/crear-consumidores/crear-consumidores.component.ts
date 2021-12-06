import { Component, OnInit } from '@angular/core';
import { OtrosConsumidoresService } from 'src/app/services/otrosconsumidores/otrosconsumidores.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtrosConsumidoresModel } from 'src/app/models/otrosconsumidores.model';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-crear-consumidores',
  templateUrl: './crear-consumidores.component.html',
})

export class CrearConsumidoresComponent implements OnInit {
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""

  nuevaOtrosConsumidores: FormGroup;
  tituloPage: string;
  idOtrosConsumidores: string;

  constructor(public OtrosConsumidoresService: OtrosConsumidoresService,
              private router: Router,
              private fb: FormBuilder,
              private validadores: ValidadoresService,
              private routerParams: ActivatedRoute,
			  private estilosService: EstilosService) {
	
	  this.idOtrosConsumidores = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idOtrosConsumidores) {
        this.tituloPage = "Nuevo Otros Consumidores"
      } else {
        this.tituloPage = "Editar Otros Consumidores"
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
		this.nuevaOtrosConsumidores = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombre: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {
	  this.OtrosConsumidoresService.getOne(this.idOtrosConsumidores)
		.subscribe(
			datos => {
				this.nuevaOtrosConsumidores.reset({
					nombre: datos.nombre
				})
			}	
		)
  }
  
  crearOtrosConsumidores() {
		if(this.idOtrosConsumidores) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.OtrosConsumidoresService.edit(this.idOtrosConsumidores, this.nuevaOtrosConsumidores.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaOtrosConsumidores.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/otroconsumidor/lista');
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

			if (this.nuevaOtrosConsumidores.invalid) {
				return Object.values(this.nuevaOtrosConsumidores.controls).forEach(control => {
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
			
			this.OtrosConsumidoresService.create(this.nuevaOtrosConsumidores.value)
				.subscribe(
					res => {

						Swal.fire({
							title: this.nuevaOtrosConsumidores.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/otroconsumidor/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar el Registro!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}
	get nombreNoValid() {
		return this.nuevaOtrosConsumidores.get('nombre').invalid && this.nuevaOtrosConsumidores.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevaOtrosConsumidores.get('nombre').valid && this.nuevaOtrosConsumidores.get('nombre').touched;
	}
}
