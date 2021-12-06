import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReglascalidadService } from 'src/app/services/reglascalidad/reglascalidad.service';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { TiposdereglasService } from 'src/app/services/tiposdereglas/tiposdereglas.service';
import { PrincipiosService } from 'src/app/services/principios/principios.service';
import { AplicativoService } from 'src/app/services/aplicativos/aplicativo.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';


@Component({
  selector: 'app-detallercalidad',
  templateUrl: './detallercalidad.component.html',

})
export class DetallercalidadComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  listrcalidad = [];
  idRc: string;
  nombreEntidadDato: string;
  identificador: string;
  descripcion: string;
  umbralSuperior: string;
  umbralInferior: string;
  fechaCreacion: string;
  validado: string;
  aplicativo: string;
  periodicidad: string;
  tipo: string;
  principio: string;
  conceptoNegocio: string;

  constructor(public rcalidadservice: ReglascalidadService,
    private routerParams: ActivatedRoute,
    private conceptonegociosService: ConceptonegociosService,
    private perdService: PeriodicidadService,
    private entService: EntidadService,
    private tipoService: TiposdereglasService,
    private prinService: PrincipiosService,
    private aplicaService: AplicativoService,
    private estilosService: EstilosService

    
  ) {
    this.idRc = this.routerParams.snapshot.paramMap.get('id');
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
    this.rcalidadservice.getOne(this.idRc)
      .subscribe(
        datos => {

          this.entService.getOne(datos.nombreEntidadDato)
            .subscribe(
              datos => {
                this.nombreEntidadDato = datos.nombre
              }
            )
          this.identificador = datos.identificador
          this.descripcion = datos.descripcion
          this.umbralSuperior = datos.umbralSuperior
          this.umbralInferior = datos.umbralInferior
          this.fechaCreacion = datos.fechaCreacion
          this.validado = datos.validado

          this.aplicaService.getOne(datos.aplicativo)
            .subscribe(
              datos => {
                this.aplicativo = datos.nombre
              }
            )
          this.perdService.getOne(datos.periodicidad)
            .subscribe(
              datos => {
                this.periodicidad = datos.nombre
              }
            )




          this.tipoService.getOne(datos.tipo)
            .subscribe(
              datos => {
                this.tipo = datos.nombre
              }
            )



          this.prinService.getOne(datos.principio)
            .subscribe(
              datos => {
                this.principio = datos.nombre
              }
            )

          this.conceptonegociosService.getOne(datos.conceptoNegocio)
            .subscribe(
              datos => {
                this.conceptoNegocio = datos.nombre
              }
            )


        }
      )
  }

}
