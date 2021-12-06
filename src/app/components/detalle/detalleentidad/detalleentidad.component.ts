import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadService } from 'src/app/services/entidad/entidad.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service'
import { SubDominioService } from 'src/app/services/companiaSubDominio/companiaSubDominio.service';
import { ConceptonegociosService } from 'src/app/services/conceptonegocio/conceptonegocios.service'
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service'
import { TipoEntDatoService } from 'src/app/services/tipoentidadDato/tipoentdato.service';
import { PrioridadService } from 'src/app/services/prioridad/prioridad.service';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { IndicadorService } from 'src/app/services/indicador/indicador.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { AplicativoService } from 'src/app/services/aplicativos/aplicativo.service';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
import { FuenteOficialService } from 'src/app/services/fuentesoficiales/fuenteoficial.service';
import { subscribeOn } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-detalleentidad',
  templateUrl: './detalleentidad.component.html',

})
export class DetalleentidadComponent implements OnInit {
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  usuario = this.decoded['usuario'];

public tituloDetalle = '';

  selectedReporte = [];
  selectedAplicativos = [];
  selectedOtros = [];
  idEntidad: string;
  nombre: string;
  dominio: string;
  subdominio: string;
  conceptoNegocio: string;
  dataOwner: string;
  definicionNegocio: string;
  tipoEntidad: string;
  logicaCalculo: string;
  ejemploValores: string;
  prioridad: string;
  indicadorDimencion: string;
  periodicidadGeneracion: string;
  capoFuenteOficial: string;
  fuenteOficial: string;
  pantalla: string;
  campoFuente: string;
  validado: string;
  idEntidadP: string;
  conceptoNegocioID: string;

  constructor(private fb: FormBuilder,
    private componentService: EntidadService,
    private router: Router,
    private routerParams: ActivatedRoute,
    private companiaDominioService: CompaniaDominioService,
    private subdominioService: SubDominioService,
    private conceptonegociosService: ConceptonegociosService,
    private usuariosService: UsuariosService,
    private tipoEntDatoService: TipoEntDatoService,
    private prioridadService: PrioridadService,
    private reportesService: ReportesService,
    private indicadorService: IndicadorService,
    private periodicidadService: PeriodicidadService,
    private aplicativoService: AplicativoService,
    private OtrosConsumidoresService: CompaniaAreaService,
    private fuenteOficialService: FuenteOficialService,
    private estilosService: EstilosService) {
    this.idEntidad = this.routerParams.snapshot.paramMap.get('id');
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
      this.componentService.getOne(this.idEntidad)
        .subscribe(
          datos => {
  
            this.nombre = datos.nombre;
  
            this.companiaDominioService.getDetalleDominio(datos.dominio)
              .subscribe(data => {
                this.dominio = data.nombreDom;
              })
  
            this.subdominioService.getDetalleSubDominio(datos.subdominio)
              .subscribe(
                datos => {
                  this.subdominio = datos.nombre
                }
              )
  
            this.conceptonegociosService.getOne(datos.conceptoNegocio)
              .subscribe(
                datos => {
                  this.conceptoNegocio = datos.nombre
                }
              )
            this.usuariosService.getOne(datos.dataOwner)
              .subscribe(
                datos => {
                  this.dataOwner = datos.userNombres
                }
              )
  
            this.definicionNegocio = datos.definicionNegocio;
  
            this.tipoEntDatoService.getOne(datos.tipoEntidad)
              .subscribe(
                datos => {
                  this.tipoEntidad = datos.nombre
                }
              )
  
            this.logicaCalculo = datos.logicaCalculo;
  
            this.ejemploValores = datos.ejemploValores;
  
            this.prioridadService.getOne(datos.prioridad)
              .subscribe(
                datos => {
                  this.prioridad = datos.nombre
                }
              )
  
            this.indicadorService.getOne(datos.indicadorDimencion)
              .subscribe(
                datos => {
                  this.indicadorDimencion = datos.nombre
                }
              )
            this.periodicidadService.getOne(datos.periodicidadGeneracion)
              .subscribe(
                datos => {
                  this.periodicidadGeneracion = datos.nombre
                }
              )
            this.capoFuenteOficial = datos.capoFuenteOficial;
            this.fuenteOficialService.getOne(datos.fuenteOficial)
              .subscribe(
                datos => {
                  this.fuenteOficial = datos.nombre
                }
              )
            this.pantalla = datos.pantalla;
            this.campoFuente = datos.campoFuente;
            this.validado = datos.validado;
            this.conceptoNegocioID = datos.conceptoNegocio;

            
  
            datos.reportes.map(x => {
              this.reportesService.getOne(x)
                .subscribe(data => {
                  this.selectedReporte.push({ nombre: data['reporte'].nombre, id: data['reporte']._id });
                })
            })
            datos.aplicativos.map(x => {
              this.aplicativoService.getOne(x)
                .subscribe(data => {
                  this.selectedAplicativos.push({ nombre: data.nombre, id: data._id });
                })
            })
            datos.otrosConsumidores.map(x => {
              this.OtrosConsumidoresService.getDetalleArea(x)
                .subscribe(data => {
                  this.selectedOtros.push({ nombre: data.nombre, id: data._id });
                })
            })
          }
        )
    }
  
  }
  


 
