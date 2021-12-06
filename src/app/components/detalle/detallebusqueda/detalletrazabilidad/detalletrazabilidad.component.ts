import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrazabilidadService } from 'src/app/services/trazabilidad/trazabilidad.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-detalletrazabilidad',
  templateUrl: './detalletrazabilidad.component.html',
  
})
export class DetalletrazabilidadComponent implements OnInit {

  //Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//Permisos Usuario//
	
	permisoConsultar = this.datosUsuario.permisos[2];
	
	//objetos estilos// 
	colorPaginador: string = "";
	estiloBotonoAccion: String;
	estiloBotonNuevo: String;

  listTra = [];
  cargando: boolean = false;
  pageActual: number = 1;
  public idConceptoN: string;


  constructor( private TrazServ: TrazabilidadService,   private routerParams: ActivatedRoute,
    private estilosService: EstilosService,) { 


      this.idConceptoN = this.routerParams.snapshot.paramMap.get('id');      
    }

  ngOnInit(): void {
    this.listaEntidades()
  	this.cargarEstilos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonoAccion = datos.botonAcciones
				this.estiloBotonNuevo = datos.botonCrear
				this.colorPaginador = datos.paginador
			})
	}


  listaEntidades() {
    this.cargando = true;
		this.TrazServ.getBusqueda(this.idConceptoN)
		.subscribe(resp => {
      this.cargando = false;
			this.listTra = resp
    
      
		})
	}
}


