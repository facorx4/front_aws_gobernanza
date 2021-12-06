//angular imports//
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
//import servicios//
import { PrincipiosService } from 'src/app/services/principios/principios.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-principios',
  templateUrl: './principios.component.html',

})
export class PrincipiosComponent implements OnInit {

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
  listaPrincipioUser = [];
  cargando: boolean = false;
  pageActual: number = 1;

  constructor(private principioService: PrincipiosService, private router: Router,
    private estilosService: EstilosService) { }

  //pipes filter//
  filterNompri = '';
  filterGeneralpri = '';
  filterDescrippri = '';

  ngOnInit(): void {
    this.listaPrincipios();
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

  eliminar(idPrincipio: string, indice: number) {



    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaPrincipioUser.splice(indice, 1);//renderizamos el componente de la lista de componentes
        this.principioService.eliminar(idPrincipio).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente!',
          icon: 'success'
        });

      }


    })

  }

  listaPrincipios() {
    this.cargando = true;
    this.principioService.getAll().subscribe(
      resp => {
        this.cargando = false;
        this.listaPrincipioUser = resp['data'];


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
