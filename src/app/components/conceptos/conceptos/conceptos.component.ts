import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConceptosService } from 'src/app/services/conceptos/conceptos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import Swal from 'sweetalert2';
//jwt//
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  
})
export class ConceptosComponent implements OnInit {

  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];
  //Permisos Usuario//
	permisoEditar = this.datosUsuario.permisos[1];
	permisoEliminar = this.datosUsuario.permisos[3];
	permisoConsultar = this.datosUsuario.permisos[2];
	permisoCrear = this.datosUsuario.permisos[0];
  listaConceptosUser = [];
  cargando: boolean = false;
  pageActual: number = 1;
  estiloBotonoAccion: String;
  estiloBotonNuevo: String;
  colorPaginador: string = "";

  constructor(private conceptoService: ConceptosService, 
    private estilosService: EstilosService,
    private router: Router) { }

  nombrePipe='';
  generalPipe = '';

  ngOnInit(): void {
    this.listaConceptos();
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

  eliminar(idConcepto: string, indice: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar a `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar concepto!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaConceptosUser.splice(indice, 1);//renderizamos el componente de la lista de componentes
        this.conceptoService.eliminar(idConcepto).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente el concepto!',
          icon: 'success'
        });
      }
    })
  }
  
  listaConceptos() {
		this.cargando = true;
		this.conceptoService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaConceptosUser = resp['data'];
			},
			err => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}

			})
}

}
