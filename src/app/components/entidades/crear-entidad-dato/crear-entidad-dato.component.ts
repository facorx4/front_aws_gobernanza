import { Component, OnInit } from '@angular/core';
import { TipoEntDatoService } from 'src/app/services/tipoentidadDato/tipoentdato.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEntidadDatoModel } from 'src/app/models/tipoentidaddato.model';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-crear-entidad-dato',
  templateUrl: './crear-entidad-dato.component.html',
})

export class CrearEntidadDatoComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""

  nuevaEntidadDato: FormGroup;
  tituloPage: string;
  idEntDato: string;

  constructor(public tipoEntDatoService: TipoEntDatoService,
              private router: Router,
              private fb: FormBuilder,
              private validadores: ValidadoresService,
              private routerParams: ActivatedRoute,
			  private estilosService: EstilosService) {
	
	  this.idEntDato = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idEntDato) {
        this.tituloPage = "Nuevo Tipo Entidad Dato"
      } else {
        this.tituloPage = "Editar Tipo Entidad Dato"
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
		this.nuevaEntidadDato = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombre: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {
	  this.tipoEntDatoService.getOne(this.idEntDato)
		.subscribe(
			datos => {
				this.nuevaEntidadDato.reset({
					nombre: datos.nombre
				})
			}
			
		)
  }
  

  crearEntidadDato() {
		if(this.idEntDato) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.tipoEntDatoService.edit(this.idEntDato, this.nuevaEntidadDato.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaEntidadDato.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/tipoentidaddato/lista');
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

			if (this.nuevaEntidadDato.invalid) {
				return Object.values(this.nuevaEntidadDato.controls).forEach(control => {
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
			
			this.tipoEntDatoService.create(this.nuevaEntidadDato.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaEntidadDato.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/tipoentidaddato/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar la Compañía',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}
	get nombreNoValid() {
		return this.nuevaEntidadDato.get('nombre').invalid && this.nuevaEntidadDato.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevaEntidadDato.get('nombre').valid && this.nuevaEntidadDato.get('nombre').touched;
	}
}
