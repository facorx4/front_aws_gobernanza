//angular imports//
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
//import servicios//
import { RepoTablaService } from 'src/app/services/repoconsultas/repotablas.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-ver-tablas',
  templateUrl: './ver-tablas.component.html',

})

export class VerTablasComponent implements OnInit {

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
  listaDatos = [];
  cargando: boolean = false;
  pageActual: number = 1;

  constructor(private ModuloService: RepoTablaService, private router: Router,
    private estilosService: EstilosService) { }

    //pipes filter//
  filterNomTba = '';
  filterIdenTba = '';
  filtergeneralTba = '';

  ngOnInit(): void {
    this.listaRegistros();
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
  listaRegistros() {
    this.cargando = true;
    this.ModuloService.getAll().subscribe(
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

  eliminar(idRegistro: string, indice: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar Tabla!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaDatos.splice(indice, 1);
        this.ModuloService.eliminar(idRegistro).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente!',
          icon: 'success'
        });
      }
    })
  }

}
