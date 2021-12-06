import { Component, OnInit } from '@angular/core';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicidadModel } from 'src/app/models/periodicidad.model';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-crear-periodicidad',
  templateUrl: './crear-periodicidad.component.html',
  })

export class CrearPeriodicidadComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""

  nuevaPeriodicidad: FormGroup;
  tituloPage: string;
  idPeriodicidad: string;

  constructor(public PeriodicidadService: PeriodicidadService,
              private router: Router,
              private fb: FormBuilder,
              private validadores: ValidadoresService,
              private routerParams: ActivatedRoute,
			  private estilosService: EstilosService) {
	
	  this.idPeriodicidad = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idPeriodicidad) {
        this.tituloPage = "Nueva Periodicidad"
      } else {
        this.tituloPage = "Editar Periodicidad"
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
		this.nuevaPeriodicidad = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombre: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {
	  this.PeriodicidadService.getOne(this.idPeriodicidad)
		.subscribe(
			datos => {
				this.nuevaPeriodicidad.reset({
					nombre: datos.nombre
				})
			}
			
		)
  }
  
  crearPeriodicidad() {
		if(this.idPeriodicidad) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.PeriodicidadService.edit(this.idPeriodicidad, this.nuevaPeriodicidad.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaPeriodicidad.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/periodicidad/lista');
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

			if (this.nuevaPeriodicidad.invalid) {
				return Object.values(this.nuevaPeriodicidad.controls).forEach(control => {
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
			
			this.PeriodicidadService.create(this.nuevaPeriodicidad.value)
				.subscribe(
					res => {

						console.log(res);
						Swal.fire({
							title: this.nuevaPeriodicidad.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/periodicidad/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar la Periodicidad',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}
//validador
get nombreNoValid() {
	return this.nuevaPeriodicidad.get('nombre').invalid && this.nuevaPeriodicidad.get('nombre').touched;
}
get nombreValid() {
	return this.nuevaPeriodicidad.get('nombre').valid && this.nuevaPeriodicidad.get('nombre').touched;
}

}
