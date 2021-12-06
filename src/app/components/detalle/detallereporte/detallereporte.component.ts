import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';

import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';



@Component({
  selector: 'app-detallereporte',
  templateUrl: './detallereporte.component.html',

})
export class DetallereporteComponent implements OnInit {


  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  listReportes = [];
  listaDominios = [];
  listaareas = [];
  nombreReporte: string;
  idReporte: string;
  identificador: string;
  propietario: string;
  descripcion: string;
  DominiosCompania: string;
  regulatorio: string;
  periodicidad: string
  dimenciones: string;
  indicadores: string;
  cuadro: string;
  nombreCuadro: string;
  areas: string;
  validado: string;


  constructor(public reporteService: ReportesService,
    private routerParams: ActivatedRoute, private router: Router,
    public dominioServ: CompaniaDominioService,
    private periodService: PeriodicidadService,
    private areaService:CompaniaAreaService,
    private estilosService: EstilosService
    ) {

    this.idReporte = this.routerParams.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.cargarData();
    this.cargarEstilos()
   

  }

  cargarEstilos() {
    this.estilosService.getOne(this.usuario.estilo).subscribe(
      datos => {
        this.tituloDetalle = datos.tituloDetalle
      })
  }


  cargarData() {
    this.reporteService.getOne(this.idReporte)
      .subscribe(
        datos => {
          this.listReportes = datos.reporte;
          this.nombreReporte = datos.nombre;
          this.identificador = datos.identificador;
          this.propietario = datos.propietario;
          this.descripcion = datos.descripcion;
          this.dominioServ.getDetalleDominio(datos.DominiosCompania)
          .subscribe(
            datos => {
              this.DominiosCompania = datos.nombreDom
            }
          )
          this.regulatorio = datos.regulatorio;
          this.periodService.getOne(datos.periodicidad)
              .subscribe(
                datos => {
                  this.periodicidad = datos.nombre
                  
                }
              )
          this.dimenciones = datos.dimenciones;
          this.indicadores= datos.indicadores;
          this.cuadro= datos.cuadro;
          this.nombreCuadro= datos.nombreCuadro;
          this.validado= datos.validado;
          datos.areas.map(x => {
            this.areaService.getDetalleArea(x)
              .subscribe(data => {
                this.listaareas.push({ nombre: data.nombre, id: data._id });
              })
          })
         

        }
      )
  }

}
