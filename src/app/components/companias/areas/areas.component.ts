//angular//
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import servicios//
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
})
export class AreasComponent implements OnInit {
  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
	//objetos locales//
  areaCompania: FormGroup;
  idArea: string;
  idCompaniaTemp: string;
  indicador: string;
  tituloPage:String;
  idCompania: string;
	//objetos de estilo//
	estiloDetalle: String;
	//constructor//
  constructor(private fb: FormBuilder,
              private CompaniaServ: CompaniaAreaService,
              private router: Router,
							private estilosService: EstilosService,
              private routerParams: ActivatedRoute) 
  {
    this.idCompania = this.routerParams.snapshot.paramMap.get('id');
    this.idArea = this.routerParams.snapshot.paramMap.get('id'); 
    this.indicador = this.routerParams.snapshot.paramMap.get('ind'); 
		
		if (this.indicador == "1") {
			this.tituloPage = "Nueva Área"
		} else {
			this.tituloPage = "Editar área "
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
			this.estiloDetalle = datos.botonGuardar;
		  })
	  }

  cargarDataFormulario() {
    this.CompaniaServ.getDetalleArea(this.idArea)
      .subscribe(
        datos => {
          this.areaCompania.reset({
            nombre: datos.nombre,
            idCompania: datos.compania,
          })
		  this.idCompaniaTemp = datos.compania
        }
      )
    }

  createFormulario() {
		this.areaCompania = this.fb.group({
			nombre: ['', Validators.required],
			compania:[this.idCompania, Validators.required]
		})
	}
  
  crearArea() {
    if (this.indicador == "1") {
      if (this.areaCompania.invalid) {
				return Object.values(this.areaCompania.controls).forEach(control => {
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

      this.CompaniaServ.create(this.idCompania,this.indicador,this.areaCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							text: 'Se ha creado correctamente el área para la compañía!',
							icon: 'success'
						});
						this.router.navigateByUrl('compania/detalle/' + this.idCompania);
					},
					err => {
						Swal.fire({
							title: 'Error al guardar el Área!',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
    }else{
      Swal.fire({
				title: 'Espere un momento...',
				text: "Estamos actualizando la información",
				icon: 'info',
				allowOutsideClick: false
			})
			Swal.showLoading();
			
			this.CompaniaServ.edit(this.idArea, this.indicador, this.areaCompania.value)
				.subscribe(
					res => {
						Swal.fire({
							title: this.areaCompania.get('nombre').value,
							text: 'Se actualizo correctamente el Área!',
							icon: 'success'
						});
						this.router.navigateByUrl('compania/detalle/' + this.idCompaniaTemp);
					},
					err => {
						Swal.fire({
							title: 'Error al actualizar el Área',
							text: err.error.message,
							icon: 'error'
						});
					}
				)
    	}
	}

	//validador
	get nombreNoValid() {
		return this.areaCompania.get('nombre').invalid && this.areaCompania.get('nombre').touched;
	}
	get nombreValid() {
		return this.areaCompania.get('nombre').valid && this.areaCompania.get('nombre').touched;
	}
}
