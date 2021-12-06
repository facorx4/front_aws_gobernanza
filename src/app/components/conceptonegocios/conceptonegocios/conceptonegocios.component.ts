import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { ConceptosService } from 'src/app/services/conceptos/conceptos.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-conceptonegocios',
  templateUrl: './conceptonegocios.component.html',
  
})
export class ConceptonegociosComponent implements OnInit {

  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
	//Permisos Usuario//
	permisoEditar = this.datosUsuario.permisos[1];
	permisoEliminar = this.datosUsuario.permisos[3];
	permisoConsultar = this.datosUsuario.permisos[2];
	permisoCrear = this.datosUsuario.permisos[0];

  listaConceptonegocioUser = [];
  idConcepto: string;
	cargando: boolean = false;
	pageActual: number = 1;
	listaConceptos = [];
	estiloBotonoAccion: String;
  estiloBotonNuevo: String;
  colorPaginador: string = "";

  constructor(private conceptonegocioService: ConceptonegociosService, 
		private router: Router,
		private estilosService: EstilosService,
		public conceptoService: ConceptosService) { }

	nombrePipe='';
	definicionPipe='';
	usoPipe='';
	calculoPipe='';
	generalPipe='';

  ngOnInit(): void {
    this.listaConceptonegocios();
		this.cargarEstilos();
  }

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			this.estiloBotonoAccion = datos.botonAcciones
			this.estiloBotonNuevo = datos.botonCrear
			this.colorPaginador = datos.paginador
		  })
	  }


 listaConceptonegocios() {
		this.cargando = true;
		this.conceptonegocioService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaConceptonegocioUser = resp['data'];
			},
			err => {

				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}

			})
		}

	

eliminar(i, id){
	Swal.fire({
		title: 'Estas seguro?',
		text: `Esta seguro que desea eliminar el concepto negocio `,
		icon: 'question',
		showCancelButton: true,
		showConfirmButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'SI, eliminar concepto negocio!'
	}).then((result) => {

		if (result.isConfirmed) {

			this.listaConceptonegocioUser.splice(i, 1);
			this.conceptonegocioService.eliminar(id).subscribe()
			Swal.fire({
				title: 'Eliminado',
				text: 'Se ha eliminado correctamente el concepto negocio!',
				icon: 'success'
			});

		}


	})
}
}