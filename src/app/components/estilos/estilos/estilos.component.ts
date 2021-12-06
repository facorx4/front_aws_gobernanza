//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-estilos',
  templateUrl: './estilos.component.html',

})
export class EstilosComponent implements OnInit {

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
  listaEstilo = [];
  cargando: boolean = false;
  pageActual: number = 1;

  constructor(private estiloService: EstilosService, private router: Router) { }



  ngOnInit(): void {
    this.listaEstilos();
    this.cargarEstilos();


  }

  cargarEstilos() {
    this.estiloService.getOne(this.usuario.estilo).subscribe(
      datos => {
        this.estiloBotonNuevo = datos.botonCrear
        this.botonAccion = datos.botonAcciones
        this.colorPaginador = datos.paginador
      })
  }

  listaEstilos() {
    this.cargando = true;
    this.estiloService.getAll().subscribe(
      resp => {
        this.cargando = false;
        this.listaEstilo = resp['data'];
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }

      })
  }

  eliminar(i, id) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar el estilo`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar estilo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaEstilo.splice(i, 1);//renderizamos el componente de la lista de usuarios
        this.estiloService.eliminar(id).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente el estilo!',
          icon: 'success'
        });
      }
    })
  }
}
