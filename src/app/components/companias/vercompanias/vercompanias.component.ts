//imports angular//
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//imports servicios//
import { CompaniaService } from 'src/app/services/companias/companias.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//imports librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-vercompanias',
  templateUrl: './vercompanias.component.html',
})
export class VercompaniasComponent implements OnInit {

  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];

  permisoEditar = this.datosUsuario.permisos[1];
  permisoEliminar = this.datosUsuario.permisos[3];
  permisoConsultar = this.datosUsuario.permisos[2];
  permisoCrear = this.datosUsuario.permisos[0];

  listaCompan = [];
  cargando: boolean = false;
  estiloBotonoAccion: String;
  estiloBotonNuevo: String;

  constructor(private CompaniaServ: CompaniaService,
    private estilosService: EstilosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listaCompania();
    this.cargarEstilos();
  }

  cargarEstilos() {
    this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
      datos => {
        this.estiloBotonoAccion = datos.botonAcciones
        this.estiloBotonNuevo = datos.botonCrear
      })
  }

  eliminarCompania(idCompania: string, indice: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar a `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar Compañía!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaCompan.splice(indice, 1);//renderizamos el componente de la lista de usuarios
        this.CompaniaServ.eliminar(idCompania).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente la Compañía!',
          icon: 'success'
        });

      }

    })

  }

  /**********************************************************************************************
  Imprimimos la lista de roles 
  **********************************************************************************************/
  listaCompania() {
    this.cargando = true;
    this.CompaniaServ.getAll().subscribe(
      resp => {
        this.cargando = false;
        this.listaCompan = resp['data'];
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
