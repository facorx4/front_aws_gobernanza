import { Component, OnInit } from '@angular/core';
import { AplicativoService } from 'src/app/services/aplicativos/aplicativo.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AplicativoModel } from 'src/app/models/aplicativo.model';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-crear-aplicativos',
  templateUrl: './crear-aplicativos.component.html',
})

export class CrearAplicativosComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""

  nuevaAplicativo: FormGroup;
  tituloPage: string;
  idAplicativo: string;

  constructor(public AplicativoService: AplicativoService,
              private router: Router,
              private fb: FormBuilder,
              private validadores: ValidadoresService,
              private routerParams: ActivatedRoute,
			  private estilosService: EstilosService) {
	
	  this.idAplicativo = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idAplicativo) {
        this.tituloPage = "Nuevo Aplicativo"
      } else {
        this.tituloPage = "Editar Aplicativo"
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
		this.nuevaAplicativo = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombre: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {
	  this.AplicativoService.getOne(this.idAplicativo)
		.subscribe(
			datos => {
				this.nuevaAplicativo.reset({
					nombre: datos.nombre
				})
			}	
		)
  }
  
  crearAplicativo() {
		if(this.idAplicativo) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.AplicativoService.edit(this.idAplicativo, this.nuevaAplicativo.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaAplicativo.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/aplicativo/lista');
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

			if (this.nuevaAplicativo.invalid) {
				return Object.values(this.nuevaAplicativo.controls).forEach(control => {
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
			
			this.AplicativoService.create(this.nuevaAplicativo.value)
				.subscribe(
					res => {

						Swal.fire({
							title: this.nuevaAplicativo.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/aplicativo/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar el Aplicativo!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}

	get nombreNoValid() {
		return this.nuevaAplicativo.get('nombre').invalid && this.nuevaAplicativo.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevaAplicativo.get('nombre').valid && this.nuevaAplicativo.get('nombre').touched;
	}

}
