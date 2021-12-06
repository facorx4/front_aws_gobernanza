//angular//
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
//services(/
import { CompaniaService } from 'src/app//services/companias/companias.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { CompaniaAreaService } from 'src/app/services/companiaArea/companiaArea.service';
import { CompaniaDominioService } from 'src/app/services/companiaDominio/companiaDominio.service';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { BusquedasService } from '../../services/busquedas.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
//import modelos//
import { ConceptonegocioModel } from '../../models/conceptonegocio.model';
import { ReporteModel } from '../../models/reporte.model';
import { ReglascalidadModel } from '../../models/reglascalidad.model';
//jwt//
import jwt_decode from 'jwt-decode';
//chart.j//
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Extraer info token//
  token = localStorage.getItem('token');
  decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
  datosUsuario = this.decoded['usuario'];

  //buscador//
  public conceptosnegocios: ConceptonegocioModel[] = [];
  public reportes: ReporteModel[] = [];
  public reglascalidad: ReglascalidadModel[] = [];
  filterabiert = '';
  filtercerrado = '';
  tituloPage: string;
  public estiloBanner: string;
  public estiloBoton: string;
  public colorPaginador: string = "";

  //listar tickets//
  listaTick = [];
  cargando: boolean = false;
  pageActual: number = 1;

  //canvas total usuario//
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    [0, 0],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  //canvas total areas//
  public doughnutChartLabels1: Label[] = [];
  public doughnutChartData1: MultiDataSet = [
    [0, 0],
  ];
  public doughnutChartType1: ChartType = 'doughnut';
  //canvas total dominios//
  public doughnutChartLabels2: Label[] = [];
  public doughnutChartData2: MultiDataSet = [
    [0, 0],
  ];
  public doughnutChartType2: ChartType = 'doughnut';
  //object para traer total//
  public totalUsuarios: number = 0;
  public numberCom: number = 0;
  public totalReportes: number = 0;
  public totalAreas: number = 0;
  public totalDom: number = 0;
  public nombreC: string;
  listaCompan = [];

  constructor(private usuariosService: UsuariosService,
    private comserv: CompaniaService,
    private areasserv: CompaniaAreaService,
    private domserv: CompaniaDominioService,
    private reposerv: ReportesService,
    private tickService: TicketsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedasService,
    private estilosService: EstilosService
  ) { }

  ngOnInit(): void {
    this.Usuarios()
    this.listaCompania()
    this.Areas()
    this.Dominios()
    this.Reportes()
    this.listaTickets();
    this.cargarEstilos();
    this.activatedRoute.params
      .subscribe(({ termino }) => this.busquedaGlobal(termino));
  }

  cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
		  datos => {
			this.estiloBanner = datos.dasboard
			this.estiloBoton = datos.botonCrear
      this.colorPaginador = datos.paginador
		  })
	  }

  busquedaGlobal(termino: string) {
    this.busquedaService.buscarGlobal(termino).subscribe((resp: any) => {
      this.tituloPage = termino;
      this.conceptosnegocios = resp.conceptosnegocios;
      this.reportes = resp.reportes;
      this.reglascalidad = resp.reglascalidad;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.router.navigateByUrl(`/inicio/0`)
    }
    this.router.navigateByUrl(`/inicio/${termino}`)
  }

  //lista tickets//
  listaTickets() {
    this.cargando = true;
    this.tickService.getAll().subscribe(
      resp => {
        this.cargando = false;
        this.listaTick = resp['data'];
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      })
  }

  listaCompania() {
    this.comserv.getAll().subscribe(
      resp => {
        this.listaCompan = resp['data'];
      },
    )
  }
  /*total de reportes*/
  Reportes() {
    this.reposerv.getAll()
      .subscribe(
        ({ total }) => {
          this.totalReportes = total;
        },
      )
  }
  /*total de usuario*/
  Usuarios() {
    this.usuariosService.getAll()
      .subscribe(
        ({ total, data }) => {
          this.totalUsuarios = total;
          if (this.totalUsuarios < 10) {
            this.numberCom = 10;
            data = [[this.totalUsuarios, this.numberCom]]
            this.doughnutChartData = data
          }
          else if (this.totalUsuarios >= 10) {
            this.numberCom = 100;
            data = [[this.totalUsuarios, this.numberCom]]
            this.doughnutChartData = data
          }
        },
      )
  }
  /*total de areas*/
  Areas() {

    this.areasserv.getAllA()
      .subscribe(
        ({ total, data }) => {
          this.totalAreas = total;
          if (this.totalAreas < 10) {
            this.numberCom = 10;
            data = [[this.totalAreas, this.numberCom]]
            this.doughnutChartData1 = data
          }
          else if (this.totalAreas >= 10) {
            this.numberCom = 100;
            data = [[this.totalAreas, this.numberCom]]
            this.doughnutChartData1 = data
          }
        },
      )
  }
  /*total de dominios*/
  Dominios() {
    this.domserv.getAll()
      .subscribe(
        ({ total, data }) => {
          this.totalDom = total;
          if (this.totalDom < 10) {
            this.numberCom = 10;
            data = [[this.totalDom, this.numberCom]]
            this.doughnutChartData2 = data
          }
          else if (this.totalDom >= 10) {
            this.numberCom = 100;
            data = [[this.totalDom, this.numberCom]]
            this.doughnutChartData2 = data
          }
        },
      )
  }
}
