import { Component, OnInit } from '@angular/core';
import { IndicadorService } from 'src/app/services/indicador/indicador.service';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndicadorModel } from 'src/app/models/indicador.model';
import { ValidadoresService } from 'src/app/services/usuarios/validadores.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-crear-indicador',
  templateUrl: './crear-indicador.component.html',
})

export class CrearIndicadorComponent implements OnInit {

	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];

	
	public botonGuardar: string = ""
	public botonAgregar: string = ""

  nuevaIndicador: FormGroup;
  tituloPage: string;
  idIndicador: string;

  constructor(public IndicadorService: IndicadorService,
              private router: Router,
              private fb: FormBuilder,
              private validadores: ValidadoresService,
              private routerParams: ActivatedRoute,
			  private estilosService: EstilosService) {
	
	  this.idIndicador = this.routerParams.snapshot.paramMap.get('id');
      if (!this.idIndicador) {
        this.tituloPage = "Nuevo Indicador"
      } else {
        this.tituloPage = "Editar Indicador"
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
		this.nuevaIndicador = this.fb.group({
			//userNombres: ['valor x defecto',[Validators.], [] ],
			nombre: ['', [Validators.required]]
		})
  }
  
  cargarDataFormulario() {
	  this.IndicadorService.getOne(this.idIndicador)
		.subscribe(
			datos => {
				this.nuevaIndicador.reset({
					nombre: datos.nombre
				})
			}	
		)
  }
  
  crearIndicador() {
		if(this.idIndicador) {
			Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.IndicadorService.edit(this.idIndicador, this.nuevaIndicador.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaIndicador.get('nombre').value,
							text: 'Se actualizo correctamente el registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/indicador/lista');
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

			if (this.nuevaIndicador.invalid) {
				return Object.values(this.nuevaIndicador.controls).forEach(control => {
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
			
			this.IndicadorService.save(this.nuevaIndicador.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.nuevaIndicador.get('nombre').value,
							text: 'Se ha creado correctamente un nuevo registro!',
							icon: 'success'
						});
						this.router.navigateByUrl('entidad/indicador/lista');
					},
					err => {
						Swal.fire({
							title: 'Error al guardar el Indicador!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
		}
	}

	get nombreNoValid() {
		return this.nuevaIndicador.get('nombre').invalid && this.nuevaIndicador.get('nombre').touched;
	}
	get nombreValid() {
		return this.nuevaIndicador.get('nombre').valid && this.nuevaIndicador.get('nombre').touched;
	}

}
