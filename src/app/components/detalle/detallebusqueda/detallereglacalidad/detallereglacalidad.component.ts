import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReglascalidadService } from 'src/app/services/reglascalidad/reglascalidad.service';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-detallereglacalidad',
  templateUrl: './detallereglacalidad.component.html',
 
  
})
export class DetallereglacalidadComponent implements OnInit {

  //Extraer info token//
	token = localStorage.getItem('token');
	decoded = jwt_decode(this.token);//decodificamos la informacion de usuario
	datosUsuario = this.decoded['usuario'];
	//Permisos Usuario//
	
	permisoConsultar = this.datosUsuario.permisos[2];
	
	//objetos estilos// 
	colorPaginador: string = "";
	estiloBotonoAccion: String;

  
  
  listReglaC = [];
  cargando: boolean = false;
  pageActual: number = 1;
  public idRc: string;


  constructor( private recserv: ReglascalidadService,   private routerParams: ActivatedRoute,
    private estilosService: EstilosService) { 


      this.idRc = this.routerParams.snapshot.paramMap.get('id');      
    }

  ngOnInit(): void {
    this.listaEntidades()
    this.cargarEstilos();
	}

	cargarEstilos() {
		this.estilosService.getOne(this.datosUsuario.estilo).subscribe(
			datos => {
				this.estiloBotonoAccion = datos.botonAcciones
		
				this.colorPaginador = datos.paginador
			})
	}


  listaEntidades() {
    this.cargando = true;
		this.recserv.getBusqueda(this.idRc)
		.subscribe(resp => {
      this.cargando = false;
			this.listReglaC = resp
    
      
		})
	}
}
