//angular imports//
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import servicios//
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//librerias//
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',

})
export class ReportesComponent implements OnInit {


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
  listaReporteUser = [];
  public idDominio: string;
  cargando: boolean = false;
  pageActual: number = 1;
  listaDominios = [];


  constructor(private reporteService: ReportesService, private router: Router,
    public dominioService: CompaniaDominioService,
    private estilosService: EstilosService) { }

  //pipes filter//
  nombrePipe = '';
  identificadorRPipe = '';
  propietarioPipe = '';
  generalePipe = '';



  ngOnInit(): void {
    this.listaReportes();
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


  listaReportes() {
    this.cargando = true;
    this.reporteService.getAll().subscribe(
      resp => {
        this.cargando = false;
        this.listaReporteUser = resp['data'];
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
      text: `Esta seguro que desea eliminar el reporte `,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminar reporte!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.listaReporteUser.splice(i, 1);
        this.reporteService.eliminar(id).subscribe()
        Swal.fire({
          title: 'Eliminado',
          text: 'Se ha eliminado correctamente el reporte!',
          icon: 'success'
        });

      }


    })
  }
}