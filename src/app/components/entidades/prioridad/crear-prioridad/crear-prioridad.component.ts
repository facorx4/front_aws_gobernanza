import { Component, OnInit } from '@angular/core';
import { PrioridadService } from 'src/app/services/prioridad/prioridad.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-crear-prioridad',
  templateUrl: './crear-prioridad.component.html',
})

export class CrearPrioridadComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""


  nuevaPrioridad: FormGroup;
  tituloPage: string;
  idPrioridad: string;

  constructor(public PrioridadService: PrioridadService,
              private router: Router,
              private fb: FormBuilder,
              private routerParams: ActivatedRoute,
			  private estilosService: EstilosService) {
	
	  this.idPrioridad = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idPrioridad) {
        this.tituloPage = "Nueva Prioridad"
      } else {
        this.tituloPage = "Editar Prioridad"
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
		this.nuevaPrioridad = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombre: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {
	  this.PrioridadService.getOne(this.idPrioridad)
		.subscribe(
			datos => {
				this.nuevaPrioridad.reset({
					nombre: datos.nombre
				})
			}
			
		)
  }
  
  crearPrioridad() {
		if(this.idPrioridad) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.PrioridadService.edit(this.idPrioridad, this.nuevaPrioridad.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaPrioridad.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/prioridad/lista');
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

			if (this.nuevaPrioridad.invalid) {
				return Object.values(this.nuevaPrioridad.controls).forEach(control => {
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
			
			this.PrioridadService.save(this.nuevaPrioridad.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaPrioridad.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/prioridad/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar la Prioridad',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}


	//validador
get nombreNoValid() {
	return this.nuevaPrioridad.get('nombre').invalid && this.nuevaPrioridad.get('nombre').touched;
}
get nombreValid() {
	return this.nuevaPrioridad.get('nombre').valid && this.nuevaPrioridad.get('nombre').touched;
}
}
