import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrazabilidadService } from 'src/app/services/trazabilidad/trazabilidad.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { SubDominioService } from 'src/app/services/companiaSubDominio/companiaSubDominio.service';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { TipoEntDatoService } from 'src/app/services/tipoentidadDato/tipoentdato.service';
import { TipoRepositorioService } from 'src/app/services/repositorios/tipoRepositorio.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { FuenteOficialService } from 'src/app/services/fuentesoficiales/fuenteoficial.service';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';





@Component({
  selector: 'app-detalletrazabilidad',
  templateUrl: './detalletrazabilidadModulo.component.html',

})
export class DetalletrazabilidadModuloComponent implements OnInit {

  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

  public tituloDetalle = '';

  idtraza: string;
  dominio: string;
  subDominio: string;
  conceptoNegocio: string;
  nombreEntidadDato: string;
  tipoEntidadDato: string;

  nombreFuente: string;
  fuenteOficial: string;
  repoFuenteOficial: string;
  rutaOrigenRepositorio: string;
  tipoRepositorio: string;
  tablaFuenteOficial: string;
  nombreCampoFuenteOficial: string;
  descripcionCampo: string;
  dataEntry: string;
  periodicidadAct: string;
  profundidadDato: string;
  tipoDato: string;
  longitud: string;
  valoresValidos: string;
  esLlavePrimaria: string;
  responsableDefinicion: string;


  constructor(private routerParams: ActivatedRoute,

    private trzservice: TrazabilidadService,
    private cdservice: CompaniaDominioService,
    private sdservice: SubDominioService,
    private cnservice: ConceptonegociosService,
    private eservice: EntidadService,
    private tedservice: TipoEntDatoService,
    private trservice: TipoRepositorioService,
    private perioservice: PeriodicidadService,
    private fuenteoservice: FuenteOficialService,
    private estilosService: EstilosService

  ) {

    this.idtraza = this.routerParams.snapshot.paramMap.get('id');
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

    this.trzservice.getOne(this.idtraza)
      .subscribe(
        datos => {

          this.cdservice.getDetalleDominio(datos.dominio)
            .subscribe(
              datos => {
                this.dominio = datos.nombreDom
              }
            )
          this.sdservice.getDetalleSubDominio(datos.subDominio)
            .subscribe(
              datos => {
                this.subDominio = datos.nombre
              }
            )
          this.cnservice.getOne(datos.conceptoNegocio)
            .subscribe(
              datos => {
                this.conceptoNegocio = datos.nombre
              }
            )
          this.eservice.getOne(datos.nombreEntidadDato)
            .subscribe(
              datos => {
                this.nombreEntidadDato = datos.nombre
              }
            )
          this.tedservice.getOne(datos.tipoEntidadDato)
            .subscribe(
              datos => {
                this.tipoEntidadDato = datos.nombre
              }
            )

          this.nombreFuente = datos.nombreFuente
          this.fuenteoservice.getOne(datos.fuenteOficial)
            .subscribe(
              datos => {
                this.fuenteOficial = datos.nombre
              }
            )

          this.repoFuenteOficial = datos.repoFuenteOficial
          this.rutaOrigenRepositorio = datos.rutaOrigenRepositorio
          this.tipoRepositorio = datos.tipoRepositorio

          this.tablaFuenteOficial = datos.tablaFuenteOficial
          this.nombreCampoFuenteOficial = datos.nombreCampoFuenteOficial
          this.descripcionCampo = datos.descripcionCampo
          this.dataEntry = datos.dataEntry
          this.perioservice.getOne(datos.periodicidadAct)
            .subscribe(
              datos => {
                this.periodicidadAct = datos.nombre
              }
            )
          this.profundidadDato = datos.profundidadDato
          this.tipoDato = datos.tipoDato
          this.longitud = datos.longitud
          this.valoresValidos = datos.valoresValidos
          this.esLlavePrimaria = datos.esLlavePrimaria

          this.responsableDefinicion = datos.responsableDefinición







        }
      )
  }

}
