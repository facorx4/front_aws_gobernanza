/*******************************************************************************************
creamos los imports de los modulos o componentes
*******************************************************************************************/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



/*******************************************************************************************
creamos los imports de los modulos o componentes
*******************************************************************************************/
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { PerfilComponent } from './components/usuarios/perfil/perfil.component';
import { RolComponent } from './components/Roles/rol/rol.component';
import { RolesComponent } from './components/Roles/roles/roles.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component';
import { VercompaniasComponent } from './components/companias/vercompanias/vercompanias.component';
import { AreasComponent } from './components/companias/areas/areas.component';
import { DominiosComponent } from './components/companias/dominios/dominios.component';
import { CrearCompaniaComponent } from './components/companias/crear-compania/crear-compania.component';
import { ModulosComponent } from './components/modulos/modulos/modulos.component';
import { ModuloComponent } from './components/modulos/modulo/modulo.component';
import { SubmenusComponent } from './components/submenus/submenus/submenus.component';
import { ConceptosComponent } from './components/conceptos/conceptos/conceptos.component';
import { ConceptoComponent } from './components/conceptos/concepto/concepto.component';
import { SubmenuComponent } from './components/submenus/submenu/submenu.component';
import { DetallerolComponent } from './components/detalle/detallerol/detallerol.component';
import { DetalleComponent } from './components/detalle/detalleconcepto/detalle.component';
import { DetallesubmenuComponent } from './components/detalle/detallesubmenu/detallesubmenu.component';
import { DetallemoduloComponent } from './components/detalle/detallemodulo/detallemodulo.component';
import { DetalleusuarioComponent } from './components/detalle/detalleusuario/detalleusuario.component';
import { ConceptonegociosComponent } from './components/conceptonegocios/conceptonegocios/conceptonegocios.component';
import { ConceptonegocioComponent } from './components/conceptonegocios/conceptonegocio/conceptonegocio.component';
import { DetallecnegocioComponent } from './components/detalle/detallecnegocio/detallecnegocio.component'
import { VerentidadDatoComponent } from './components/entidades/verentidad-dato/verentidad-dato.component';
import { VerPrioridadComponent } from './components/entidades/prioridad/ver-prioridad/ver-prioridad.component';
import { DetalletipoComponent } from './components/detalle/detalleentidades/detalletipo/detalletipo.component';
import { DetalleprioridadComponent } from './components/detalle/detalleentidades/detalleprioridad/detalleprioridad.component';
import { DetalleperiocidadComponent } from './components/detalle/detalleentidades/detalleperiocidad/detalleperiocidad.component';
import { DetalleaplicativoComponent } from './components/detalle/detalleentidades/detalleaplicativo/detalleaplicativo.component';
import { DetalleindicadorComponent } from './components/detalle/detalleentidades/detalleindicador/detalleindicador.component';
import { DetallefuentesComponent } from './components/detalle/detalleentidades/detallefuentes/detallefuentes.component';
import { DetalleconsumidoresComponent } from './components/detalle/detalleentidades/detalleconsumidores/detalleconsumidores.component';
import { DetalleprincipioComponent } from './components/detalle/detallereglascalidad/detalleprincipio/detalleprincipio.component';
import { DetalletiporeposubdominiorepoComponent } from './components/detalle/detallerepositorio/detalletiporeposubdominiorepo/detalletiporeposubdominiorepo.component';



/*******************************************************************************************
creamos el import que valida que el usuario a realizado un login correctamente
*******************************************************************************************/
import { AuthGuard } from './auth.guard';

import { DetalleCompaniaComponent } from './components/companias/detalle-compania/detalle-compania.component';
import { ReportesComponent } from './components/reportes/reportes/reportes.component';
import { ReporteComponent } from './components/reportes/reporte/reporte.component';
import { DetallereporteComponent } from './components/detalle/detallereporte/detallereporte.component';
import { CrearEntidadDatoComponent } from './components/entidades/crear-entidad-dato/crear-entidad-dato.component';
import { CrearPrioridadComponent } from './components/entidades/prioridad/crear-prioridad/crear-prioridad.component';

import { VerPeriodicidadComponent } from './components/entidades/periodicidad/ver-periodicidad/ver-periodicidad.component';
import { CrearPeriodicidadComponent } from './components/entidades/periodicidad/crear-periodicidad/crear-periodicidad.component';

import { VerIndicadorComponent } from './components/entidades/indicador/ver-indicador/ver-indicador.component';
import { CrearIndicadorComponent } from './components/entidades/indicador/crear-indicador/crear-indicador.component';
import { VerAplicativosComponent } from './components/entidades/aplicativos/ver-aplicativos/ver-aplicativos.component';
import { CrearAplicativosComponent } from './components/entidades/aplicativos/crear-aplicativos/crear-aplicativos.component';
import { VerFuentesComponent } from './components/entidades/fuentesoficiales/ver-fuentes/ver-fuentes.component';
import { CrearFuentesComponent } from './components/entidades/fuentesoficiales/crear-fuentes/crear-fuentes.component';
import { VerConsumidoresComponent } from './components/entidades/otrosconsumidores/ver-consumidores/ver-consumidores.component';
import { CrearConsumidoresComponent } from './components/entidades/otrosconsumidores/crear-consumidores/crear-consumidores.component';
import { VerEsquemasComponent } from './components/repositorioconsultas/esquemas/ver-esquemas/ver-esquemas.component';
import { CrearEsquemasComponent } from './components/repositorioconsultas/esquemas/crear-esquemas/crear-esquemas.component';
import { VerTablasComponent } from './components/repositorioconsultas/tablas/ver-tablas/ver-tablas.component';
import { CrearTablacampoComponent } from './components/repositorioconsultas/tablacampos/crear-tablacampo/crear-tablacampo.component';
import { CrearTablasComponent } from './components/repositorioconsultas/tablas/crear-tablas/crear-tablas.component';
import { VerTablacampoComponent } from './components/repositorioconsultas/tablacampos/ver-tablacampo/ver-tablacampo.component';
import { DetalleDominiosComponent } from './components/companias/detalle-dominios/detalle-dominios/detalle-dominios.component';
import { CrearSubdominiosComponent } from './components/companias/detalle-dominios/crear-subdominios/crear-subdominios.component';
import { PrincipiosComponent } from './components/reglascalidad/principiosR/principios/principios.component';
import { PrincipioComponent } from './components/reglascalidad/principiosR/principio/principio.component';
import { TiposdereglasComponent } from './components/reglascalidad/tiposdereglas/tiposdereglas/tiposdereglas.component';
import { TiporeglaComponent } from './components/reglascalidad/tiposdereglas/tiporegla/tiporegla.component';
import { DetalletiposdereglasComponent } from './components/detalle/detallereglascalidad/detalletiposdereglas/detalletiposdereglas.component';
import { VerreglascalidadComponent } from './components/reglascalidad/reglascalidad/verreglascalidad/verreglascalidad.component';
import { ReglacalidadComponent } from './components/reglascalidad/reglascalidad/reglacalidad/reglacalidad.component';
import { DetalleesquemaComponent } from './components/detalle/detallerconsultas/detalleesquema/detalleesquema.component';
import { DetallertablaComponent } from './components/detalle/detallerconsultas/detallertabla/detallertabla.component';
import { DetallertcampoComponent } from './components/detalle/detallerconsultas/detallertcampo/detallertcampo.component';
import { DetallercalidadComponent } from './components/detalle/detallereglascalidad/detallercalidad/detallercalidad.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { DetalleentidadBusquedaComponent } from './components/detalle/detallebusqueda/detalleentidad/detalleentidadBusqueda.component';
import { DetalletrazabilidadComponent } from './components/detalle/detallebusqueda/detalletrazabilidad/detalletrazabilidad.component';
import { DetalleconcepentiComponent } from './components/detalle/detallebusqueda/detalleconcepenti/detalleconcepenti.component';
import { VertrazabilidadComponent } from './components/detalle/detallebusqueda/vertrazabilidad/vertrazabilidad.component';
import { DetallereglacalidadComponent } from './components/detalle/detallebusqueda/detallereglacalidad/detallereglacalidad.component';
import { VerreglacalidadComponent } from './components/detalle/detallebusqueda/verreglacalidad/verreglacalidad.component';
import { CrearTrazabilidadComponent } from './components/trazabilidad/crear-trazabilidad/crear-trazabilidad.component';
import { DetalletrazabilidadModuloComponent } from './components/detalle/detalletrazabilidad/detalletrazabilidadModulo.component';
import { DetalleentidadComponent } from './components/detalle/detalleentidad/detalleentidad.component';
import { RepositoriosComponent } from './components/repositorios/repositorios/repositorios.component';
import { RepositorioComponent } from './components/repositorios/repositorio/repositorio.component';
import { TipoRepositorioComponent } from './components/repositorios/tipo-repositorio/tipo-repositorio.component';
import { TipoRepositoriosComponent } from './components/repositorios/tipo-repositorios/tipo-repositorios.component';
import { SubdominioidDetalleComponent } from './components/detalle/detallerepositorio/subdominioid/subdominioid.component';
import { DetalleTiporepositorioComponent } from './components/detalle/detallerepositorio/tiporepositorio/tiporepositorio.component';

import { SubdominioComponent } from './components/repositorios/subdominio/subdominio.component';
import { SubdominiosComponent } from './components/repositorios/subdominios/subdominios.component';
import { EntidadComponent } from './components/entidades/entidad/entidad.component';
import { EntidadesComponent } from './components/entidades/entidades/entidades.component';

import { VerTrazabilidadComponent } from './components/trazabilidad/ver-trazabilidad/ver-trazabilidad.component';
import { DetallrepositorioComponent } from './components/detalle/detallerepositorio/detallrepositorio/detallrepositorio.component';
import { EstilosComponent } from './components/estilos/estilos/estilos.component';
import { EstiloComponent } from './components/estilos/estilo/estilo.component';
import { DetalleestilosComponent } from './components/detalle/detalleestilos/detalleestilos.component';



const routes: Routes = [

  /***************Ruta Login***************************/

  { path: 'login', component: LoginComponent },

  /***************Ruta Dashboard***************************/

  { path: 'inicio/:termino', component: DashboardComponent, canActivate: [AuthGuard] },

  /***************Ruta Usuario***************************/

  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'usuario/lista', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'usuario/crear', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuario/editar/:id', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuario/detalle/:id', component: DetalleusuarioComponent, canActivate: [AuthGuard] },


  /***************Ruta Roles***************************/

  { path: 'rol/lista', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'rol/crear', component: RolComponent, canActivate: [AuthGuard] },
  { path: 'rol/editar/:id', component: RolComponent, canActivate: [AuthGuard] },
  { path: 'rol/detalle/:id', component: DetallerolComponent, canActivate: [AuthGuard] },


  /***************Ruta Repositorio***************************/

  { path: 'repositorio/lista', component: RepositoriosComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/crear', component: RepositorioComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/editar/:id/:nombre', component: RepositorioComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/detalle/:id', component: DetallrepositorioComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/tipo/lista', component: TipoRepositoriosComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/tipo/crear', component: TipoRepositorioComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/tipo/detalle/:id', component: DetalleTiporepositorioComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/tipo/editar/:id/:nombre', component: TipoRepositorioComponent, canActivate: [AuthGuard] }, 
  { path: 'repositorio/subdominio/lista', component: SubdominiosComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/subdominio/detalle/:id', component: SubdominioidDetalleComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/subdominio/crear', component: SubdominioComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/subdominio/editar/:id/:nombre', component: SubdominioComponent, canActivate: [AuthGuard] },
  { path: 'repositorio/subdominio/detalle/:id', component: DetalletiporeposubdominiorepoComponent, canActivate: [AuthGuard] },


  /***************Ruta Entidad***************************/

  { path: 'entidad/lista', component: EntidadesComponent, canActivate: [AuthGuard] },
  { path: 'entidad/crear', component: EntidadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/editar/:id/:nombre', component: EntidadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/detalle/:id', component: DetalleentidadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/tipoentidaddato/lista', component: VerentidadDatoComponent, canActivate: [AuthGuard] },
  { path: 'entidad/tipoentidaddato/crear', component: CrearEntidadDatoComponent, canActivate: [AuthGuard] },
  { path: 'entidad/tipoentidaddato/editar/:id', component: CrearEntidadDatoComponent, canActivate: [AuthGuard] },
  { path: 'entidad/tipoentidaddato/detalle/:id', component: DetalletipoComponent, canActivate: [AuthGuard] },
  { path: 'entidad/prioridad/lista', component: VerPrioridadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/prioridad/crear', component: CrearPrioridadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/prioridad/editar/:id', component: CrearPrioridadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/prioridad/detalle/:id', component: DetalleprioridadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/periodicidad/lista', component: VerPeriodicidadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/periodicidad/crear', component: CrearPeriodicidadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/periodicidad/editar/:id', component: CrearPeriodicidadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/periodicidad/detalle/:id', component: DetalleperiocidadComponent, canActivate: [AuthGuard] },
  { path: 'entidad/indicador/lista', component: VerIndicadorComponent, canActivate: [AuthGuard] },
  { path: 'entidad/indicador/crear', component: CrearIndicadorComponent, canActivate: [AuthGuard] },
  { path: 'entidad/indicador/editar/:id', component: CrearIndicadorComponent, canActivate: [AuthGuard] },
  { path: 'entidad/indicador/detalle/:id', component: DetalleindicadorComponent, canActivate: [AuthGuard] },
  { path: 'entidad/aplicativo/lista', component: VerAplicativosComponent, canActivate: [AuthGuard] },
  { path: 'entidad/aplicativo/crear', component: CrearAplicativosComponent, canActivate: [AuthGuard] },
  { path: 'entidad/aplicativo/editar/:id', component: CrearAplicativosComponent, canActivate: [AuthGuard] },
  { path: 'entidad/aplicativo/detalle/:id', component: DetalleaplicativoComponent, canActivate: [AuthGuard] },
  { path: 'entidad/fuenteoficial/lista', component: VerFuentesComponent, canActivate: [AuthGuard] },
  { path: 'entidad/fuenteoficial/crear', component: CrearFuentesComponent, canActivate: [AuthGuard] },
  { path: 'entidad/fuenteoficial/editar/:id', component: CrearFuentesComponent, canActivate: [AuthGuard] },
  { path: 'entidad/fuenteoficial/detalle/:id', component: DetallefuentesComponent, canActivate: [AuthGuard] },
  { path: 'entidad/otroconsumidor/lista', component: VerConsumidoresComponent, canActivate: [AuthGuard] },
  { path: 'entidad/otroconsumidor/crear', component: CrearConsumidoresComponent, canActivate: [AuthGuard] },
  { path: 'entidad/otroconsumidor/editar/:id', component: CrearConsumidoresComponent, canActivate: [AuthGuard] },
  { path: 'entidad/otroconsumidor/detalle/:id', component: DetalleconsumidoresComponent, canActivate: [AuthGuard] },


  /***************Ruta Trazabilidad***************************/

  { path: 'trazabilidad/lista', component: VerTrazabilidadComponent, canActivate: [AuthGuard] },
  { path: 'trazabilidad/crear', component: CrearTrazabilidadComponent, canActivate: [AuthGuard] },
  { path: 'trazabilidad/editar/:id', component: CrearTrazabilidadComponent, canActivate: [AuthGuard] },
  { path: 'trazabilidad/detalle/:id', component: DetalletrazabilidadModuloComponent, canActivate: [AuthGuard] },


  /***************Ruta Estilo***************************/

  { path: 'estilo/lista', component: EstilosComponent, canActivate: [AuthGuard] },
  { path: 'estilo/crear', component: EstiloComponent, canActivate: [AuthGuard] },
  { path: 'estilo/editar/:id', component: EstiloComponent, canActivate: [AuthGuard] },
  { path: 'estilo/detalle/:id', component: DetalleestilosComponent, canActivate: [AuthGuard] },

  /***************Ruta Concepto***************************/

  { path: 'concepto/lista', component: ConceptosComponent, canActivate: [AuthGuard] },
  { path: 'concepto/crear', component: ConceptoComponent, canActivate: [AuthGuard] },
  { path: 'concepto/editar/:id', component: ConceptoComponent, canActivate: [AuthGuard] },
  { path: 'concepto/detalle/:id', component: DetalleComponent, canActivate: [AuthGuard] },

  /***************Ruta Concepto Negocio***************************/

  { path: 'conceptonegocio/lista', component: ConceptonegociosComponent, canActivate: [AuthGuard] },
  { path: 'conceptonegocio/crear', component: ConceptonegocioComponent, canActivate: [AuthGuard] },
  { path: 'conceptonegocio/editar/:id', component: ConceptonegocioComponent, canActivate: [AuthGuard] },
  { path: 'conceptonegocio/detalle/:id', component: DetallecnegocioComponent, canActivate: [AuthGuard] },

  /***************Ruta Buscador***************************/

  { path: 'busqueda/entidad/detalle/:id', component: DetalleentidadBusquedaComponent, canActivate: [AuthGuard] },
  { path: 'busqueda/conceptotrazibilidad/detalle/:id', component: DetalletrazabilidadComponent, canActivate: [AuthGuard] },
  { path: 'busqueda/conceptoentidad/detalle/:id', component: DetalleconcepentiComponent, canActivate: [AuthGuard] },
  { path: 'busqueda/trazabilidad/detalle/:id', component: VertrazabilidadComponent, canActivate: [AuthGuard] },
  { path: 'busqueda/conceptoregla/detalle/:id', component: DetallereglacalidadComponent, canActivate: [AuthGuard] },
  { path: 'busqueda/reglacalidad/detalle/:id', component: VerreglacalidadComponent, canActivate: [AuthGuard] },

  /***************Ruta Modulos***************************/

  { path: 'modulo/lista', component: ModulosComponent, canActivate: [AuthGuard] },
  { path: 'modulo/crear', component: ModuloComponent, canActivate: [AuthGuard] },
  { path: 'modulo/editar/:id/:nombre', component: ModuloComponent, canActivate: [AuthGuard] },
  { path: 'modulo/detalle/:id', component: DetallemoduloComponent, canActivate: [AuthGuard] },

  /***************Ruta Submenu***************************/

  { path: 'submenu/lista', component: SubmenusComponent, canActivate: [AuthGuard] },
  { path: 'submenu/detalle/:id', component: DetallesubmenuComponent, canActivate: [AuthGuard] },
  { path: 'submenu/crear', component: SubmenuComponent, canActivate: [AuthGuard] },
  { path: 'submenu/editar/:id/:nombre', component: SubmenuComponent, canActivate: [AuthGuard] },

  /***************Ruta Compañia***************************/

  { path: 'compania/lista', component: VercompaniasComponent, canActivate: [AuthGuard] },
  { path: 'compania/crear', component: CrearCompaniaComponent, canActivate: [AuthGuard] },
  { path: 'compania/editar/:id', component: CrearCompaniaComponent, canActivate: [AuthGuard] },
  { path: 'compania/detalle/:id', component: DetalleCompaniaComponent, canActivate: [AuthGuard] },
  { path: 'area/crear/:ind/:id', component: AreasComponent, canActivate: [AuthGuard] },
  { path: 'area/editar/:ind/:id', component: AreasComponent, canActivate: [AuthGuard] },
  { path: 'dominio/crear/:ind/:id', component: DominiosComponent, canActivate: [AuthGuard] },
  { path: 'dominio/editar/:ind/:id', component: DominiosComponent, canActivate: [AuthGuard] },
  { path: 'dominio/detalle/:idCompania/:id', component: DetalleDominiosComponent, canActivate: [AuthGuard] },
  { path: 'subdominio/crear/:ind/:idCompania/:id', component: CrearSubdominiosComponent, canActivate: [AuthGuard] },
  { path: 'subdominio/editar/:ind/:id', component: CrearSubdominiosComponent, canActivate: [AuthGuard] },

  /***************Ruta Reporte***************************/

  { path: 'reporte/lista', component: ReportesComponent, canActivate: [AuthGuard] },
  { path: 'reporte/crear', component: ReporteComponent, canActivate: [AuthGuard] },
  { path: 'reporte/editar/:id', component: ReporteComponent, canActivate: [AuthGuard] },
  { path: 'reporte/detalle/:id', component: DetallereporteComponent, canActivate: [AuthGuard] },

  /***************Ruta Principios***************************/

  { path: 'principio/lista', component: PrincipiosComponent, canActivate: [AuthGuard] },
  { path: 'principio/crear', component: PrincipioComponent, canActivate: [AuthGuard] },
  { path: 'principio/editar/:id', component: PrincipioComponent, canActivate: [AuthGuard] },
  { path: 'principio/detalle/:id', component: DetalleprincipioComponent, canActivate: [AuthGuard] },

  /***************Ruta Reglas de calidad***************************/

  { path: 'tiporegla/lista', component: TiposdereglasComponent, canActivate: [AuthGuard] },
  { path: 'tiporegla/crear', component: TiporeglaComponent, canActivate: [AuthGuard] },
  { path: 'tiporegla/editar/:id', component: TiporeglaComponent, canActivate: [AuthGuard] },
  { path: 'tiporegla/detalle/:id', component: DetalletiposdereglasComponent, canActivate: [AuthGuard] },
  { path: 'reglacalidad/lista', component: VerreglascalidadComponent, canActivate: [AuthGuard] },
  { path: 'reglacalidad/crear', component: ReglacalidadComponent, canActivate: [AuthGuard] },
  { path: 'reglacalidad/editar/:id', component: ReglacalidadComponent, canActivate: [AuthGuard] },
  { path: 'reglacalidad/detalle/:id', component: DetallercalidadComponent, canActivate: [AuthGuard] },

  /***************Ruta Repositorio Consulta***************************/

  { path: 'repoconsulta/esquema/lista', component: VerEsquemasComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/esquema/crear', component: CrearEsquemasComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/esquema/editar/:id', component: CrearEsquemasComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/esquema/detalle/:id', component: DetalleesquemaComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tabla/lista', component: VerTablasComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tabla/crear', component: CrearTablasComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tabla/editar/:id', component: CrearTablasComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tabla/detalle/:id', component: DetallertablaComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tablacampo/lista', component: VerTablacampoComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tablacampo/crear', component: CrearTablacampoComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tablacampo/editar/:id', component: CrearTablacampoComponent, canActivate: [AuthGuard] },
  { path: 'repoconsulta/tablacampo/detalle/:id', component: DetallertcampoComponent, canActivate: [AuthGuard] },

  /***************Ruta Ticket***************************/

  { path: 'ticket', component: TicketsComponent, canActivate: [AuthGuard] },

  /***************Si no encuentra la ruta***************************/

  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio/0' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
