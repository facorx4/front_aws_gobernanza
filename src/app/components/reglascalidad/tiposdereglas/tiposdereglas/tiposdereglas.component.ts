//angular imports//
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
//import servicios//
import { TiposdereglasService } from 'src/app/services/tiposdereglas/tiposdereglas.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-tiposdereglas',
  templateUrl: './tiposdereglas.component.html',

})
export class TiposdereglasComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

  //objetos permisos//	
  permisoEditar = this.usuario.permisos[1];
  permisoEliminar = this.usuario.permisos[3];
  permisoConsultar = this.usuario.permisos[2];
  permisoCrear = this.usuario.permisos[0];
  //objetos estilos//	
  estiloBotonNuevo: string = "";
  botonAccion: string = "";
  colorPaginador: string = "";
  //objetos locales//	
  listaTiposdereglasUser = [];
  cargando: boolean = false;
  pageActual: number = 1;

  constructor(private tipoService: TiposdereglasService, private router: Router,
    private estilosService: EstilosService) { }

  //pipes filter//
  filterNomTr = '';
  filtergenTr = '';

  ngOnInit(): void {
    this.listaTiposdereglas();

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

  eliminar(idTipoR: string, indice: number) {



    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar a `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar tipo de regla!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaTiposdereglasUser.splice(indice, 1);
        this.tipoService.eliminar(idTipoR).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente el tipo de regla!',
          icon: 'success'
        });

      }


    })

  }

  listaTiposdereglas() {
    this.cargando = true;
    this.tipoService.getAll().subscribe(
      resp => {
        this.cargando = false;
        this.listaTiposdereglasUser = resp['data'];


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
