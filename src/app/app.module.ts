/* importacion de librerias propias de angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import { ChartsModule } from 'ng2-charts';

registerLocaleData(localEs);


/* Imporamos directivas */
import { DataBackGroundColorDirective } from './directives/data-back-ground-color.directive'
/* importacion de los componentes creados  */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { PerfilComponent } from './components/usuarios/perfil/perfil.component';
import { RolesComponent } from './components/Roles/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { RolComponent } from './components/Roles/rol/rol.component';

//importamos el servicio del token interceptor
import { TokenInterceptorService } from './services/userLogin/token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { RouterModule } from '@angular/router';
import { CrearCompaniaComponent } from './components/companias/crear-compania/crear-compania.component';
import { VercompaniasComponent } from './components/companias/vercompanias/vercompanias.component';
import { FilterPipe } from './pipes/roles/filter.pipe';
import { FilterNomRolPipe } from './pipes/roles/filter-nom-rol.pipe';
import { NombreRepoPipe } from './pipes/respositorios/repositorio/nombre-repo.pipe';

import { RutaRepoPipe } from './pipes/respositorios/repositorio/ruta-repo.pipe';

import { ModulosComponent } from './components/modulos/modulos/modulos.component';
import { ModuloComponent } from './components/modulos/modulo/modulo.component';
import { SubmenusComponent } from './components/submenus/submenus/submenus.component';
import { DetalleCompaniaComponent } from './components/companias/detalle-compania/detalle-compania.component';
import { AreasComponent } from './components/companias/areas/areas.component';
import { DominiosComponent } from './components/companias/dominios/dominios.component';
import { ConceptosComponent } from './components/conceptos/conceptos/conceptos.component';
import { ConceptoComponent } from './components/conceptos/concepto/concepto.component';
import { DetalleComponent } from './components/detalle/detalleconcepto/detalle.component';
import { nombrePipe } from './pipes/conceptos/nombre.pipe';
import { SubmenuComponent } from './components/submenus/submenu/submenu.component';
import { DetallerolComponent } from './components/detalle/detallerol/detallerol.component';
import { TituloPipe } from './pipes/submenu/titulo.pipe';
import { RutaPipe } from './pipes/submenu/ruta.pipe';
import { TituloModuloPipe } from './pipes/modulos/tituloModulo.pipe';
import { DetallesubmenuComponent } from './components/detalle/detallesubmenu/detallesubmenu.component';
import { DetallemoduloComponent } from './components/detalle/detallemodulo/detallemodulo.component';
import { DetalleusuarioComponent } from './components/detalle/detalleusuario/detalleusuario.component';
import { ConceptonegociosComponent } from './components/conceptonegocios/conceptonegocios/conceptonegocios.component';
import { ConceptonegocioComponent } from './components/conceptonegocios/conceptonegocio/conceptonegocio.component';
import { NombrePipe } from './pipes/conceptonegocio/nombre.pipe';
import { DefinicionPipe } from './pipes/conceptonegocio/definicion.pipe';
import { UsoPipe } from './pipes/conceptonegocio/uso.pipe';
import { CalculoPipe } from './pipes/conceptonegocio/calculo.pipe';
import { GeneralPipe } from './pipes/conceptonegocio/general.pipe';
import { DetallecnegocioComponent } from './components/detalle/detallecnegocio/detallecnegocio.component';
import { ReportesComponent } from './components/reportes/reportes/reportes.component';
import { ReporteComponent } from './components/reportes/reporte/reporte.component';
import { DetallereporteComponent } from './components/detalle/detallereporte/detallereporte.component';
import { IdentificadorRPipe } from './pipes/reporte/identificador.pipe';
import { PropietarioPipe } from './pipes/reporte/propietario.pipe';
import { GeneralePipe } from './pipes/reporte/general.pipe';

import { VerentidadDatoComponent } from './components/entidades/verentidad-dato/verentidad-dato.component';
import { CrearEntidadDatoComponent } from './components/entidades/crear-entidad-dato/crear-entidad-dato.component';
import { VerPrioridadComponent } from './components/entidades/prioridad/ver-prioridad/ver-prioridad.component';
import { CrearPrioridadComponent } from './components/entidades/prioridad/crear-prioridad/crear-prioridad.component';
import { VerPeriodicidadComponent } from './components/entidades/periodicidad/ver-periodicidad/ver-periodicidad.component';
import { CrearPeriodicidadComponent } from './components/entidades/periodicidad/crear-periodicidad/crear-periodicidad.component';
import { VerIndicadorComponent } from './components/entidades/indicador/ver-indicador/ver-indicador.component';
import { CrearIndicadorComponent } from './components/entidades/indicador/crear-indicador/crear-indicador.component';
import { CrearAplicativosComponent } from './components/entidades/aplicativos/crear-aplicativos/crear-aplicativos.component';
import { VerAplicativosComponent } from './components/entidades/aplicativos/ver-aplicativos/ver-aplicativos.component';
import { VerFuentesComponent } from './components/entidades/fuentesoficiales/ver-fuentes/ver-fuentes.component';
import { CrearFuentesComponent } from './components/entidades/fuentesoficiales/crear-fuentes/crear-fuentes.component';
import { CrearConsumidoresComponent } from './components/entidades/otrosconsumidores/crear-consumidores/crear-consumidores.component';
import { VerConsumidoresComponent } from './components/entidades/otrosconsumidores/ver-consumidores/ver-consumidores.component';
import { RepositoriosComponent } from './components/repositorios/repositorios/repositorios.component';
import { RepositorioComponent } from './components/repositorios/repositorio/repositorio.component';
import { TipoRepositorioComponent } from './components/repositorios/tipo-repositorio/tipo-repositorio.component';
import { TipoRepositoriosComponent } from './components/repositorios/tipo-repositorios/tipo-repositorios.component';
import { SubdominioComponent } from './components/repositorios/subdominio/subdominio.component';
import { SubdominiosComponent } from './components/repositorios/subdominios/subdominios.component';
import { GlobalRolesPipe } from './pipes/roles/global-roles.pipe';
import { GeneralusuarioPipe } from './pipes/usuarios/generalusuario.pipe';
import { GeneralsubPipe } from './pipes/submenu/generalsub.pipe';
import { GeneralmodPipe } from './pipes/modulos/generalmod.pipe';
import { GeneralcpPipe } from './pipes/conceptos/generalcp.pipe';
import { DetalletipoComponent } from './components/detalle/detalleentidades/detalletipo/detalletipo.component';
import { NombretipoPipe } from './pipes/entidades/tipo/nombretipo.pipe';
import { NomtiPipe } from './pipes/entidades/tipo/nomti.pipe';
import { NombrepriPipe } from './pipes/entidades/prioridades/nombrepri.pipe';
import { GeneralpriPipe } from './pipes/entidades/prioridades/generalpri.pipe';
import { GeneralareaPipe } from './pipes/companias/areas/generalarea.pipe';
import { NombreareaPipe } from './pipes/companias/areas/nombrearea.pipe';
import { GeneraldomPipe } from './pipes/companias/dominios/generaldom.pipe';
import { NombredomPipe } from './pipes/companias/dominios/nombredom.pipe';
import { GeneralsubdomPipe } from './pipes/companias/subdominios/general.pipe';
import { NombresubdomPipe } from './pipes/companias/subdominios/nombre.pipe';
import { DetalleprioridadComponent } from './components/detalle/detalleentidades/detalleprioridad/detalleprioridad.component';
import { NomperPipe } from './pipes/entidades/periocidad/nomper.pipe';
import { GeneralperPipe } from './pipes/entidades/periocidad/generalper.pipe';
import { DetalleperiocidadComponent } from './components/detalle/detalleentidades/detalleperiocidad/detalleperiocidad.component';
import { DetalleaplicativoComponent } from './components/detalle/detalleentidades/detalleaplicativo/detalleaplicativo.component';
import { NomaplPipe } from './pipes/entidades/aplicativo/nomapl.pipe';
import { GeneralaplPipe } from './pipes/entidades/aplicativo/generalapl.pipe';
import { DetalleindicadorComponent } from './components/detalle/detalleentidades/detalleindicador/detalleindicador.component';
import { NomidenPipe } from './pipes/entidades/identificador/nomiden.pipe';
import { GeneralidenPipe } from './pipes/entidades/identificador/generaliden.pipe';
import { DetallefuentesComponent } from './components/detalle/detalleentidades/detallefuentes/detallefuentes.component';
import { NomfuenPipe } from './pipes/entidades/fuentes/nomfuen.pipe';
import { GenefuenPipe } from './pipes/entidades/fuentes/genefuen.pipe';
import { DetalleconsumidoresComponent } from './components/detalle/detalleentidades/detalleconsumidores/detalleconsumidores.component';
import { NomconPipe } from './pipes/entidades/consumidores/nomcon.pipe';
import { GeneralconPipe } from './pipes/entidades/consumidores/generalcon.pipe';
import { EntidadComponent } from './components/entidades/entidad/entidad.component';
import { EntidadesComponent } from './components/entidades/entidades/entidades.component';
import { PrincipiosComponent } from './components/reglascalidad/principiosR/principios/principios.component';
import { PrincipioComponent } from './components/reglascalidad/principiosR/principio/principio.component';
import { DetalleprincipioComponent } from './components/detalle/detallereglascalidad/detalleprincipio/detalleprincipio.component';
import { NompriPipe } from './pipes/principios/nompri.pipe';
import { DescripprinPipe } from './pipes/principios/descripprin.pipe';
import { TiposdereglasComponent } from './components/reglascalidad/tiposdereglas/tiposdereglas/tiposdereglas.component';
import { TiporeglaComponent } from './components/reglascalidad/tiposdereglas/tiporegla/tiporegla.component';
import { DetalletiposdereglasComponent } from './components/detalle/detallereglascalidad/detalletiposdereglas/detalletiposdereglas.component';
import { NomtrPipe } from './pipes/tiposdereglas/nomtr.pipe';
import { GentrPipe } from './pipes/tiposdereglas/gentr.pipe';
import { VerreglascalidadComponent } from './components/reglascalidad/reglascalidad/verreglascalidad/verreglascalidad.component';
import { ReglacalidadComponent } from './components/reglascalidad/reglascalidad/reglacalidad/reglacalidad.component';
import { VerEsquemasComponent } from './components/repositorioconsultas/esquemas/ver-esquemas/ver-esquemas.component';
import { CrearEsquemasComponent } from './components/repositorioconsultas/esquemas/crear-esquemas/crear-esquemas.component';
import { CrearTablasComponent } from './components/repositorioconsultas/tablas/crear-tablas/crear-tablas.component';
import { VerTablasComponent } from './components/repositorioconsultas/tablas/ver-tablas/ver-tablas.component';
import { VerTablacampoComponent } from './components/repositorioconsultas/tablacampos/ver-tablacampo/ver-tablacampo.component';
import { CrearTablacampoComponent } from './components/repositorioconsultas/tablacampos/crear-tablacampo/crear-tablacampo.component';
import { TicketsComponent } from './components/tickets/tickets.component';

import { DetalleesquemaComponent } from './components/detalle/detallerconsultas/detalleesquema/detalleesquema.component';
import { IndicadoresqPipe } from './pipes/repositorioconsultas/resquema/indicadoresq.pipe';
import { NombreesqPipe } from './pipes/repositorioconsultas/resquema/nombreesq.pipe';
import { GeneralesqPipe } from './pipes/repositorioconsultas/resquema/generalesq.pipe';
import { DetallertablaComponent } from './components/detalle/detallerconsultas/detallertabla/detallertabla.component';
import { NomrtablaPipe } from './pipes/repositorioconsultas/rtabla/nomrtabla.pipe';
import { IdenttablaPipe } from './pipes/repositorioconsultas/rtabla/identtabla.pipe';
import { GentablaPipe } from './pipes/repositorioconsultas/rtabla/gentabla.pipe';
import { DetallertcampoComponent } from './components/detalle/detallerconsultas/detallertcampo/detallertcampo.component';
import { NomrcampoPipe } from './pipes/repositorioconsultas/rtcampo/nomrcampo.pipe';
import { GenrtcampoPipe } from './pipes/repositorioconsultas/rtcampo/genrtcampo.pipe';
import { IdentifirtcampoPipe } from './pipes/repositorioconsultas/rtcampo/identifirtcampo.pipe';
import { DetallercalidadComponent } from './components/detalle/detallereglascalidad/detallercalidad/detallercalidad.component';


import { DetalleDominiosComponent } from './components/companias/detalle-dominios/detalle-dominios/detalle-dominios.component';
import { CrearSubdominiosComponent } from './components/companias/detalle-dominios/crear-subdominios/crear-subdominios.component';
import { DetalleentidadBusquedaComponent } from './components/detalle/detallebusqueda/detalleentidad/detalleentidadBusqueda.component';
import { DetalleconcepentiComponent } from './components/detalle/detallebusqueda/detalleconcepenti/detalleconcepenti.component';
import { CrearTrazabilidadComponent } from './components/trazabilidad/crear-trazabilidad/crear-trazabilidad.component';
import { VerTrazabilidadComponent } from './components/trazabilidad/ver-trazabilidad/ver-trazabilidad.component';
import { DetalletrazabilidadComponent } from './components/detalle/detallebusqueda/detalletrazabilidad/detalletrazabilidad.component';
import { VertrazabilidadComponent } from './components/detalle/detallebusqueda/vertrazabilidad/vertrazabilidad.component';
import { DetallereglacalidadComponent } from './components/detalle/detallebusqueda/detallereglacalidad/detallereglacalidad.component';
import { VerreglacalidadComponent } from './components/detalle/detallebusqueda/verreglacalidad/verreglacalidad.component';
import { IdentificadorPipe } from './pipes/reglascalidad/identificador.pipe';
import { GenralrcPipe } from './pipes/reglascalidad/genralrc.pipe';
import { NombreentidadPipe } from './pipes/entidades/entida/nombreentidad.pipe';
import { GeneentidadPipe } from './pipes/entidades/entida/geneentidad.pipe';
import { GenereposPipe } from './pipes/respositorios/repositorio/generepos.pipe';
import { SubdominioidDetalleComponent } from './components/detalle/detallerepositorio/subdominioid/subdominioid.component';
import { DetalleTiporepositorioComponent } from './components/detalle/detallerepositorio/tiporepositorio/tiporepositorio.component';

import { GenetiporepoPipe } from './pipes/respositorios/detalletiporepo/genetiporepo.pipe';
import { NomrepotipoPipe } from './pipes/respositorios/detalletiporepo/nomrepotipo.pipe';

import { NomsubPipe } from './pipes/respositorios/detallesubdominio/nomsub.pipe';
import { GensubPipe } from './pipes/respositorios/detallesubdominio/gensub.pipe';
import { DetalletiporeposubdominiorepoComponent } from './components/detalle/detallerepositorio/detalletiporeposubdominiorepo/detalletiporeposubdominiorepo.component';
import { DetalletrazabilidadModuloComponent } from './components/detalle//detalletrazabilidad/detalletrazabilidadModulo.component';
import { DetalleentidadComponent } from './components/detalle/detalleentidad/detalleentidad.component';
import { AbiertoticketPipe } from './pipes/ticket/abiertoticket.pipe';
import { CerradoticketPipe } from './pipes/ticket/cerradoticket.pipe';
import { EstilosComponent } from './components/estilos/estilos/estilos.component';
import { EstiloComponent } from './components/estilos/estilo/estilo.component';
import { DetallrepositorioComponent } from './components/detalle/detallerepositorio/detallrepositorio/detallrepositorio.component';
import { DetalleestilosComponent } from './components/detalle/detalleestilos/detalleestilos.component';

@Directive({
  selector: "[DataBackgroundColor]"
})

export class DataBackgroundColorDirective implements OnChanges {
  @Input() DataBackgroundColor: string;
  private element: ElementRef;
  constructor(el: ElementRef) {
    this.element = el;
  }
  ngOnInit(el: ElementRef) {
    this.element.nativeElement.setAttribute('data-background-color', this.DataBackgroundColor);
  }
  
  ngOnChanges(changes: SimpleChanges){
    this.element.nativeElement.setAttribute('data-background-color', changes.DataBackgroundColor.currentValue);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PerfilComponent,
    RolesComponent,
    UsuariosComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    RolComponent,
    CrearCompaniaComponent,
    VercompaniasComponent,
    FilterPipe,
    FilterNomRolPipe,
    NombreRepoPipe,

    RutaRepoPipe,
    DetalleentidadComponent,
    ModulosComponent,
    ModuloComponent,
    SubmenusComponent,
    DetalleCompaniaComponent,
    AreasComponent,
    DominiosComponent,
    ConceptosComponent,
    ConceptoComponent,
    DetalleComponent,
    nombrePipe,
    SubmenuComponent,
    DetallerolComponent,
    TituloPipe,
    RutaPipe,
    TituloModuloPipe,
    DetallesubmenuComponent,
    DetallemoduloComponent,
    DetalleusuarioComponent,
    ConceptonegociosComponent,
    ConceptonegocioComponent,
    NombrePipe,
    DefinicionPipe,
    UsoPipe,
    CalculoPipe,
    GeneralPipe,
    DetallecnegocioComponent,
    ReportesComponent,
    ReporteComponent,
    DetallereporteComponent,
    IdentificadorRPipe,
    PropietarioPipe,
    GeneralePipe,
    GeneralareaPipe,
    NombreareaPipe,
    GeneraldomPipe,
    NombredomPipe,
    GeneralsubdomPipe,
    NombresubdomPipe,
    VerentidadDatoComponent,
    CrearEntidadDatoComponent,
    VerPrioridadComponent,
    CrearPrioridadComponent,
    VerPeriodicidadComponent,
    CrearPeriodicidadComponent,
    VerIndicadorComponent,
    CrearIndicadorComponent,
    CrearAplicativosComponent,
    VerAplicativosComponent,
    VerFuentesComponent,
    CrearFuentesComponent,
    CrearConsumidoresComponent,
    VerConsumidoresComponent,
    RepositoriosComponent,
    RepositorioComponent,
    TipoRepositorioComponent,
    TipoRepositoriosComponent,
    SubdominioComponent,
    SubdominiosComponent,
    GlobalRolesPipe,
    GeneralusuarioPipe,
    GeneralsubPipe,
    GeneralmodPipe,
    GeneralcpPipe,
    DetalletipoComponent,
    NombretipoPipe,
    NomtiPipe,
    NombrepriPipe,
    GeneralpriPipe,
    DetalleprioridadComponent,
    NomperPipe,
    GeneralperPipe,
    DetalleperiocidadComponent,
    DetalleaplicativoComponent,
    NomaplPipe,
    GeneralaplPipe,
    DetalleindicadorComponent,
    NomidenPipe,
    GeneralidenPipe,
    DetallefuentesComponent,
    NomfuenPipe,
    GenefuenPipe,
    DetalleconsumidoresComponent,
    NomconPipe,
    GeneralconPipe,
    EntidadComponent,
    EntidadesComponent,    
    PrincipiosComponent,
    PrincipioComponent,
    DetalleprincipioComponent,
    NompriPipe,
    DescripprinPipe,
    TiposdereglasComponent,
    TiporeglaComponent,
    DetalletiposdereglasComponent,
    NomtrPipe,
    GentrPipe,
    VerreglascalidadComponent,
    ReglacalidadComponent,
   VerEsquemasComponent,
    CrearEsquemasComponent,
    CrearTablasComponent,
    VerTablasComponent,
    VerTablacampoComponent,
    CrearTablacampoComponent,
    TicketsComponent,
   
    DetalleesquemaComponent,
    IndicadoresqPipe,
    NombreesqPipe,
    GeneralesqPipe,
    DetallertablaComponent,
    NomrtablaPipe,
    IdenttablaPipe,
    GentablaPipe,
    DetallertcampoComponent,
    NomrcampoPipe,
    GenrtcampoPipe,
    IdentifirtcampoPipe,
    DetallercalidadComponent,    
    DetalleDominiosComponent,
    CrearSubdominiosComponent,
    DetalleentidadBusquedaComponent,
    DetalleconcepentiComponent,
    CrearTrazabilidadComponent,
    VerTrazabilidadComponent,
    DetalletrazabilidadComponent,
    VertrazabilidadComponent,
    DetallereglacalidadComponent,
    VerreglacalidadComponent,
    IdentificadorPipe,
    GenralrcPipe,
    NombreentidadPipe,
    GeneentidadPipe,
    GenereposPipe,
    SubdominioidDetalleComponent,
    DetalleTiporepositorioComponent,
 
    GenetiporepoPipe,
 
    NomrepotipoPipe,
 

 
    NomsubPipe,
 
    GensubPipe,
 
    DetalletiporeposubdominiorepoComponent,
    DetalletrazabilidadModuloComponent,
    AbiertoticketPipe,
    CerradoticketPipe,
    EstilosComponent,
    EstiloComponent,
    DataBackgroundColorDirective,
    DetallrepositorioComponent,
    DetalleestilosComponent


  ],
  imports: [
    AngularFileUploaderModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
      
      
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
