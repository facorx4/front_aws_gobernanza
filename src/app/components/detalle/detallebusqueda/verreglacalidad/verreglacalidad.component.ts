import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReglascalidadService } from 'src/app/services/reglascalidad/reglascalidad.service';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { TiposdereglasService } from 'src/app/services/tiposdereglas/tiposdereglas.service';
import { PrincipiosService } from 'src/app/services/principios/principios.service';
import { AplicativoService } from 'src/app/services/aplicativos/aplicativo.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-verreglacalidad',
  templateUrl: './verreglacalidad.component.html',

})
export class VerreglacalidadComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];

  estiloDetalle: String;
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
  conceptoNegocioID: string;


  constructor(public rcalidadservice: ReglascalidadService,
    private routerParams: ActivatedRoute,
    private conceptonegociosService: ConceptonegociosService,
    private perdService: PeriodicidadService,
    private entService: EntidadService,
    private tipoService: TiposdereglasService,
    private prinService: PrincipiosService,
    private aplicaService: AplicativoService,
    private estilosService: EstilosService,

    
  ) {
    this.idRc = this.routerParams.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarData();
    this.cargarEstilos();
  }

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			this.estiloDetalle = datos.tituloDetalle;
			
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
          this.conceptoNegocioID = datos.conceptoNegocio

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
