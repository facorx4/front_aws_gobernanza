import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  listaComponente = [];
	cargando: boolean = false;
	pageActual: number =1;
	filternomentidad='';
	filtergenerentidad = '';
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token); //decodificamos la informacion de usuario
	usuario = this.decoded['usuario'];
	permisoEditar = this.usuario.permisos[1];
	permisoEliminar = this.usuario.permisos[3];
	permisoConsultar = this.usuario.permisos[2];
	permisoCrear = this.usuario.permisos[0];
	estiloBotonNuevo: string = "";
  botonAccion: string = "";
  colorPaginador: string = "";

	constructor(private entidadService: EntidadService,
    private router: Router,
	private estilosService: EstilosService
	) { 

		
	}

	ngOnInit(): void {
		this.listRepositorios();
		this.cargarEstilos();

	}
  
	cargarEstilos() {
	  this.estilosService.getOne(this.usuario.estilo).subscribe(
		datos => {
		  this.estiloBotonNuevo = datos.botonCrear
		  this.botonAccion = datos.botonAcciones
		  this.colorPaginador = datos.paginador
		})
	}

	/**********************************************************************************************
	Imprimimos la lista de roles 
	**********************************************************************************************/
	listRepositorios() {
		this.cargando = true;
		this.entidadService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaComponente = resp['data'];
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
      text: `Esta seguro que desea eliminar`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar repositorio!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaComponente.splice(i, 1);//renderizamos el componente de la lista de usuarios
        this.entidadService.eliminar(id).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente la entidad!',
          icon: 'success'
        });
      }
    })
	}
}
