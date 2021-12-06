import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtrosConsumidoresService } from 'src/app/services/otrosconsumidores/otrosconsumidores.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-ver-consumidores',
  templateUrl: './ver-consumidores.component.html',
})

export class VerConsumidoresComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];


	permisoEditar = this.usuario.permisos[1];
	permisoEliminar = this.usuario.permisos[3];
	permisoConsultar = this.usuario.permisos[2];
	permisoCrear = this.usuario.permisos[0];

  public estiloBotonNuevo: string = "";
  public botonAccion: string = "";
  public colorPaginador: string = "";

  listaDatos = [];
  cargando: boolean = false;
  pageActual: number = 1;

  constructor(private OtrosConsumidoresService: OtrosConsumidoresService, private router: Router,
    private estilosService: EstilosService) { }


  filterNomcon= '';
  filterGeneralcon = '';
  ngOnInit(): void {
    this.listaOtrosConsumidores();
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

  listaOtrosConsumidores() {
	  this.cargando = true;
		this.OtrosConsumidoresService.getAll().subscribe(
			resp => {
				this.cargando = false;
				this.listaDatos = resp['data'];
			},
			err => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}
			})
  }

  eliminar(idOtrosConsumidores: string, indice: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar el registro `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar otros consumidores!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaDatos.splice(indice, 1);
        this.OtrosConsumidoresService.eliminar(idOtrosConsumidores).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente el registro!',
          icon: 'success'
        });
      }
    })
  }

}
